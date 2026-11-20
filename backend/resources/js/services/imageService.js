import axios from "axios";

/**
 * Upload a single image to the Laravel backend.
 * Returns the public URL of the uploaded image.
 */
export const uploadProgramImage = async (file, _programId, onProgress) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
        const response = await axios.post('/admin/upload-image', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: (progressEvent) => {
                if (onProgress) {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    onProgress(percentCompleted);
                }
            }
        });
        
        // Return the public URL path
        return response.data.url;
    } catch (error) {
        console.error("Image upload failed", error);
        throw error;
    }
};

/**
 * Simulate uploading multiple images concurrently.
 * Returns an array of local blob URLs.
 */
export const uploadMultipleImages = async (files, programId, onProgress) => {
    const uploads = Array.from(files).map((file, index) =>
        uploadProgramImage(file, programId, (percent) => {
            if (onProgress) onProgress(index, percent);
        })
    );
    return Promise.all(uploads);
};

/**
 * No-op for deleting — blob URLs are automatically revoked when the page unloads.
 */
export const deleteImageByUrl = async (_url) => {
    // no-op
};
