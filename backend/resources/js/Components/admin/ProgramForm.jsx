// src/components/admin/ProgramForm.jsx
import { useState } from "react";
import { Form, Button, Row, Col, Spinner, Badge } from "react-bootstrap";
import { FaPlus, FaTimes, FaSave } from "react-icons/fa";
import ImageUploader from "./ImageUploader";
import { router } from "@inertiajs/react";

const EMPTY_FORM = {
    titleAr: "", titleEn: "",
    descriptionAr: "", descriptionEn: "",
    duration: "",
    price: "",
    discount: 0,
    locations: [],
    images: [],
};

const labels = {
    ar: {
        titleAr: "العنوان (عربي)", titleEn: "العنوان (إنجليزي)",
        descriptionAr: "الوصف (عربي)", descriptionEn: "الوصف (إنجليزي)",
        duration: "المدة (أيام)", price: "السعر (ج.م)", discount: "الخصم (%)",
        locations: "المواقع", addLocation: "إضافة موقع", locationPlaceholder: "اسم الموقع",
        images: "صور البرنامج", save: "حفظ البرنامج", saving: "جاري الحفظ...",
        cancel: "إلغاء",
    },
    en: {
        titleAr: "Title (Arabic)", titleEn: "Title (English)",
        descriptionAr: "Description (Arabic)", descriptionEn: "Description (English)",
        duration: "Duration (days)", price: "Price (EGP)", discount: "Discount (%)",
        locations: "Locations", addLocation: "Add Location", locationPlaceholder: "Location name",
        images: "Program Images", save: "Save Program", saving: "Saving...",
        cancel: "Cancel",
    },
};

const ProgramForm = ({ existing = null, onSaved, onCancel, lang = "ar" }) => {
    const lb = labels[lang] || labels.en;
    const isRTL = lang === "ar";

    const [form, setForm] = useState(() => {
        if (!existing) return EMPTY_FORM;
        return {
            titleAr: existing.title?.ar || existing.title || "",
            titleEn: existing.title?.en || "",
            descriptionAr: existing.description?.ar || existing.description || "",
            descriptionEn: existing.description?.en || "",
            duration: existing.duration || "",
            price: existing.price || "",
            discount: existing.discount || 0,
            locations: existing.locations || [],
            images: existing.images || [],
        };
    });

    const [locationInput, setLocationInput] = useState("");
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

    const addLocation = () => {
        const v = locationInput.trim();
        if (v && !form.locations.includes(v)) {
            set("locations", [...form.locations, v]);
            setLocationInput("");
        }
    };

    const removeLocation = (loc) => set("locations", form.locations.filter((l) => l !== loc));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!form.titleAr && !form.titleEn) {
            setError(lang === "ar" ? "العنوان مطلوب" : "Title is required");
            return;
        }
        if (!form.price || isNaN(Number(form.price))) {
            setError(lang === "ar" ? "السعر غير صحيح" : "Invalid price");
            return;
        }

        setSaving(true);
        try {
            const payload = {
                title: { ar: form.titleAr, en: form.titleEn },
                description: { ar: form.descriptionAr, en: form.descriptionEn },
                duration: Number(form.duration) || 0,
                price: Number(form.price),
                discount: Number(form.discount) || 0,
                locations: form.locations,
                images: form.images,
            };

            if (existing?.id) {
                router.put(`/admin/programs/${existing.id}`, payload, {
                    onSuccess: () => {
                        if (onSaved) onSaved();
                        setSaving(false);
                    },
                    onError: (errors) => {
                        console.error(errors);
                        setError(lang === "ar" ? "حدث خطأ أثناء الحفظ" : "Error saving program");
                        setSaving(false);
                    }
                });
            } else {
                router.post('/admin/programs', payload, {
                    onSuccess: () => {
                        if (onSaved) onSaved();
                        setSaving(false);
                    },
                    onError: (errors) => {
                        console.error(errors);
                        setError(lang === "ar" ? "حدث خطأ أثناء الإنشاء" : "Error creating program");
                        setSaving(false);
                    }
                });
            }
        } catch (err) {
            setError(err.message);
            setSaving(false);
        }
    };

    return (
        <Form onSubmit={handleSubmit} dir={isRTL ? "rtl" : "ltr"}>
            {error && <div className="alert alert-danger py-2 small">{error}</div>}

            <Row className="g-3 mb-3">
                <Col md={6}>
                    <Form.Group>
                        <Form.Label className="fw-semibold small">{lb.titleAr}</Form.Label>
                        <Form.Control value={form.titleAr} onChange={(e) => set("titleAr", e.target.value)} className="rounded-3" />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group>
                        <Form.Label className="fw-semibold small">{lb.titleEn}</Form.Label>
                        <Form.Control value={form.titleEn} onChange={(e) => set("titleEn", e.target.value)} className="rounded-3" />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group>
                        <Form.Label className="fw-semibold small">{lb.descriptionAr}</Form.Label>
                        <Form.Control as="textarea" rows={3} value={form.descriptionAr} onChange={(e) => set("descriptionAr", e.target.value)} className="rounded-3" />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group>
                        <Form.Label className="fw-semibold small">{lb.descriptionEn}</Form.Label>
                        <Form.Control as="textarea" rows={3} value={form.descriptionEn} onChange={(e) => set("descriptionEn", e.target.value)} className="rounded-3" />
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group>
                        <Form.Label className="fw-semibold small">{lb.duration}</Form.Label>
                        <Form.Control type="number" min={1} value={form.duration} onChange={(e) => set("duration", e.target.value)} className="rounded-3" />
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group>
                        <Form.Label className="fw-semibold small">{lb.price}</Form.Label>
                        <Form.Control type="number" min={0} value={form.price} onChange={(e) => set("price", e.target.value)} className="rounded-3" required />
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group>
                        <Form.Label className="fw-semibold small">{lb.discount}</Form.Label>
                        <Form.Control type="number" min={0} max={100} value={form.discount} onChange={(e) => set("discount", e.target.value)} className="rounded-3" />
                    </Form.Group>
                </Col>
            </Row>

            {/* Locations */}
            <Form.Label className="fw-semibold small d-block mb-2">{lb.locations}</Form.Label>
            <div className="d-flex gap-2 mb-2">
                <Form.Control
                    value={locationInput}
                    onChange={(e) => setLocationInput(e.target.value)}
                    placeholder={lb.locationPlaceholder}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addLocation())}
                    className="rounded-3"
                />
                <Button type="button" variant="outline-primary" className="rounded-3 px-3" onClick={addLocation}>
                    <FaPlus />
                </Button>
            </div>
            <div className="d-flex flex-wrap gap-2 mb-4">
                {form.locations.map((loc, i) => (
                    <Badge key={i} className="location-badge d-flex align-items-center gap-1 px-2 py-1">
                        {loc}
                        <FaTimes size={10} role="button" onClick={() => removeLocation(loc)} />
                    </Badge>
                ))}
            </div>

            {/* Image Uploader */}
            <Form.Label className="fw-semibold small d-block mb-2">{lb.images}</Form.Label>
            <ImageUploader
                programId={existing?.id || "temp"}
                existingImages={form.images}
                onImagesChange={(urls) => set("images", urls)}
                lang={lang}
            />

            <div className={`d-flex gap-3 mt-4 ${isRTL ? "flex-row-reverse" : ""} justify-content-end`}>
                {onCancel && (
                    <Button type="button" variant="light" className="rounded-pill px-4" onClick={onCancel}>
                        {lb.cancel}
                    </Button>
                )}
                <Button type="submit" className="book-btn rounded-pill px-4" disabled={saving}>
                    {saving ? <><Spinner as="span" size="sm" className="me-2" />{lb.saving}</> : <><FaSave className="me-2" />{lb.save}</>}
                </Button>
            </div>
        </Form>
    );
};

export default ProgramForm;
