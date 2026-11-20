// src/components/admin/ImageUploader.jsx
import { useState, useRef } from "react";
import { Button, ProgressBar, Alert, Badge } from "react-bootstrap";
import { FaCloudUploadAlt, FaTimes, FaImages, FaCheck } from "react-icons/fa";
import { uploadMultipleImages } from "../../services/imageService";

const ImageUploader = ({ programId = "temp", existingImages = [], onImagesChange, lang = "ar" }) => {
    const [previews, setPreviews] = useState([]); // { file, localUrl, progress, url, error }
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef();

    const labels = {
        ar: {
            drag: "اسحب الصور هنا أو اضغط للاختيار",
            hint: "PNG, JPG, WEBP — الحد الأقصى 5 ميغابايت لكل صورة",
            upload: "رفع الصور",
            uploading: "جاري الرفع...",
            remove: "حذف",
            existing: "الصور الحالية",
            new: "صور جديدة",
            uploaded: "تم الرفع",
            error: "فشل الرفع",
        },
        en: {
            drag: "Drag images here or click to select",
            hint: "PNG, JPG, WEBP — Max 5MB per image",
            upload: "Upload Images",
            uploading: "Uploading...",
            remove: "Remove",
            existing: "Existing Images",
            new: "New Images",
            uploaded: "Uploaded",
            error: "Upload failed",
        },
    };
    const lb = labels[lang] || labels.en;
    const isRTL = lang === "ar";

    const handleFiles = (files) => {
        const valid = Array.from(files).filter(
            (f) => f.type.startsWith("image/") && f.size <= 5 * 1024 * 1024
        );
        const newPreviews = valid.map((file) => ({
            file,
            localUrl: URL.createObjectURL(file),
            progress: 0,
            url: null,
            error: null,
            id: `${Date.now()}_${file.name}`,
        }));
        setPreviews((prev) => [...prev, ...newPreviews]);
    };

    const handleUploadAll = async () => {
        const toUpload = previews.filter((p) => !p.url && !p.error);
        if (toUpload.length === 0) return;

        const updatedPreviews = [...previews];

        await Promise.all(
            toUpload.map(async (preview, _) => {
                const idx = updatedPreviews.findIndex((p) => p.id === preview.id);
                try {
                    const url = await (await import("../../services/imageService")).uploadProgramImage(
                        preview.file,
                        programId,
                        (percent) => {
                            setPreviews((prev) =>
                                prev.map((p) => (p.id === preview.id ? { ...p, progress: percent } : p))
                            );
                        }
                    );
                    setPreviews((prev) =>
                        prev.map((p) => (p.id === preview.id ? { ...p, url, progress: 100 } : p))
                    );
                    if (idx !== -1) updatedPreviews[idx] = { ...updatedPreviews[idx], url, progress: 100 };
                } catch (err) {
                    setPreviews((prev) =>
                        prev.map((p) => (p.id === preview.id ? { ...p, error: lb.error } : p))
                    );
                }
            })
        );

        // Notify parent with all URLs (existing + newly uploaded)
        const newUrls = updatedPreviews.filter((p) => p.url).map((p) => p.url);
        if (onImagesChange) onImagesChange([...existingImages, ...newUrls]);
    };

    const removePreview = (id) => setPreviews((prev) => prev.filter((p) => p.id !== id));
    const removeExisting = (url) => {
        if (onImagesChange) onImagesChange(existingImages.filter((u) => u !== url));
    };

    return (
        <div dir={isRTL ? "rtl" : "ltr"}>
            {/* Existing Images */}
            {existingImages.length > 0 && (
                <div className="mb-3">
                    <small className="text-muted fw-semibold d-block mb-2">{lb.existing}</small>
                    <div className="d-flex flex-wrap gap-2">
                        {existingImages.map((url, i) => (
                            <div key={i} className="img-thumb-wrapper">
                                <img src={url} alt={`existing-${i}`} className="img-thumb" />
                                <button className="img-thumb-remove" onClick={() => removeExisting(url)} title={lb.remove}>
                                    <FaTimes size={10} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Drop zone */}
            <div
                className={`upload-dropzone ${isDragging ? "active" : ""}`}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleFiles(e.dataTransfer.files); }}
            >
                <FaCloudUploadAlt size={36} className="upload-dropzone-icon mb-2" />
                <p className="mb-1 fw-semibold">{lb.drag}</p>
                <small className="text-muted">{lb.hint}</small>
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    className="d-none"
                    onChange={(e) => handleFiles(e.target.files)}
                />
            </div>

            {/* Previews */}
            {previews.length > 0 && (
                <div className="mt-3">
                    <small className="text-muted fw-semibold d-block mb-2">{lb.new}</small>
                    <div className="d-flex flex-wrap gap-2 mb-3">
                        {previews.map((p) => (
                            <div key={p.id} className="img-thumb-wrapper">
                                <img src={p.localUrl} alt="preview" className="img-thumb" />
                                {p.url && (
                                    <div className="img-thumb-check"><FaCheck size={10} /></div>
                                )}
                                {!p.url && (
                                    <button className="img-thumb-remove" onClick={() => removePreview(p.id)}>
                                        <FaTimes size={10} />
                                    </button>
                                )}
                                {p.progress > 0 && p.progress < 100 && (
                                    <div className="img-thumb-progress">
                                        <ProgressBar now={p.progress} style={{ height: 3 }} />
                                    </div>
                                )}
                                {p.error && <div className="img-thumb-error"><FaTimes size={8} /></div>}
                            </div>
                        ))}
                    </div>

                    {previews.some((p) => !p.url && !p.error) && (
                        <Button className="book-btn px-4 py-2" onClick={handleUploadAll}>
                            <FaCloudUploadAlt className="me-2" />
                            {lb.upload} ({previews.filter((p) => !p.url && !p.error).length})
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
};

export default ImageUploader;
