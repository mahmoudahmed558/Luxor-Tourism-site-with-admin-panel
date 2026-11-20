// src/services/imageService.js
// Frontend-only mock — no Firebase Storage.
// Uses URL.createObjectURL to generate local blob preview URLs.

/**
 * Simulate uploading a single image.
 * Returns a local blob URL via createObjectURL, with simulated progress.
 */
export const uploadProgramImage = (file, _programId, onProgress) => {
    return new Promise((resolve) => {
        let progress = 0;
        const interval = setInterval(() => {
            progress += 20;
            if (onProgress) onProgress(Math.min(progress, 100));
            if (progress >= 100) {
                clearInterval(interval);
                const localUrl = URL.createObjectURL(file);
                resolve(localUrl);
            }
        }, 100);
    });
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
    // no-op in frontend-only mode
};
