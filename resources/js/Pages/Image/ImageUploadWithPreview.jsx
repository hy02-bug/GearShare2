import React, { useState } from 'react';

export default function ImageUploadWithPreview() {
    const [previewImages, setPreviewImages] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);

        // Validate file count
        if (files.length > 10) {
            alert('Maximum 10 images allowed');
            return;
        }

        // Validate each file
        const validFiles = [];
        const previews = [];

        files.forEach((file, index) => {
            // Check file type
            if (!file.type.startsWith('image/')) {
                alert(`${file.name} is not a valid image file`);
                return;
            }

            // Check file size (5MB = 5 * 1024 * 1024 bytes)
            if (file.size > 5 * 1024 * 1024) {
                alert(`${file.name} is too large. Maximum size is 5MB`);
                return;
            }

            validFiles.push(file);

            // Create preview object
            previews.push({
                id: Date.now() + index, // Unique ID for React key
                file: file,
                url: URL.createObjectURL(file),
                name: file.name,
                size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
                isPrimary: index === 0 // First image is primary
            });
        });

        if (validFiles.length === 0) {
            return;
        }

        // Update state
        setSelectedFiles(validFiles);
        setPreviewImages(previews);
    };

    const removeImage = (indexToRemove) => {
        // Clean up object URL to prevent memory leaks
        URL.revokeObjectURL(previewImages[indexToRemove].url);

        // Remove from arrays
        const newFiles = selectedFiles.filter((_, index) => index !== indexToRemove);
        const newPreviews = previewImages.filter((_, index) => index !== indexToRemove);

        // Update primary image if needed
        if (newPreviews.length > 0) {
            newPreviews[0].isPrimary = true;
        }

        setSelectedFiles(newFiles);
        setPreviewImages(newPreviews);
    };

    const moveImageUp = (index) => {
        if (index === 0) return; // Already at top

        const newFiles = [...selectedFiles];
        const newPreviews = [...previewImages];

        // Swap files
        [newFiles[index], newFiles[index - 1]] = [newFiles[index - 1], newFiles[index]];
        [newPreviews[index], newPreviews[index - 1]] = [newPreviews[index - 1], newPreviews[index]];

        // Update primary status
        newPreviews.forEach((preview, i) => {
            preview.isPrimary = i === 0;
        });

        setSelectedFiles(newFiles);
        setPreviewImages(newPreviews);
    };

    const clearAllImages = () => {
        // Clean up object URLs
        previewImages.forEach(preview => {
            URL.revokeObjectURL(preview.url);
        });
        setSelectedFiles([]);
        setPreviewImages([]);
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Equipment Photo Upload</h2>

            {/* Upload Section */}
            <div className="mb-8">
                <label className="block text-sm font-medium mb-3 text-gray-700">
                    Photos <span className="text-red-500">*</span> (Required - Maximum 10 photos)
                </label>

                {/* Upload Area */}
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-green-500 hover:bg-green-50 transition-all duration-200 cursor-pointer">
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        id="pictures"
                    />
                    <label htmlFor="pictures" className="cursor-pointer">
                        <div className="flex flex-col items-center">
                            <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                            </svg>
                            <span className="text-xl font-semibold text-gray-700 mb-2">📷 Upload Photos</span>
                            <span className="text-sm text-gray-500 mb-2">
                                Click to browse or drag and drop images
                            </span>
                            <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                                JPEG, PNG, GIF up to 5MB each
                            </span>
                        </div>
                    </label>
                </div>
            </div>

            {/* Image Previews */}
            {previewImages.length > 0 && (
                <div className="space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">
                                Selected Images ({previewImages.length}/10)
                            </h3>
                            <p className="text-sm text-gray-600">First image will be the main photo</p>
                        </div>
                        <button
                            type="button"
                            onClick={clearAllImages}
                            className="px-4 py-2 text-sm text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
                        >
                            Clear All
                        </button>
                    </div>

                    {/* Image Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {previewImages.map((preview, index) => (
                            <div key={preview.id} className="group relative">
                                {/* Image Container */}
                                <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden border-2 border-gray-200 shadow-md hover:shadow-lg transition-shadow">
                                    <img
                                        src={preview.url}
                                        alt={`Preview ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />

                                    {/* Primary Badge */}
                                    {preview.isPrimary && (
                                        <div className="absolute top-3 left-3 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg">
                                            ⭐ Main Photo
                                        </div>
                                    )}

                                    {/* Image Number */}
                                    <div className="absolute top-3 right-3 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-full">
                                        {index + 1}
                                    </div>

                                    {/* Action Buttons Overlay */}
                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                        <div className="flex space-x-3">
                                            {/* Move Up Button */}
                                            {index > 0 && (
                                                <button
                                                    type="button"
                                                    onClick={() => moveImageUp(index)}
                                                    className="bg-blue-500 text-white rounded-full p-3 hover:bg-blue-600 transition-colors shadow-lg"
                                                    title="Move to front"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                                                    </svg>
                                                </button>
                                            )}

                                            {/* Remove Button */}
                                            <button
                                                type="button"
                                                onClick={() => removeImage(index)}
                                                className="bg-red-500 text-white rounded-full p-3 hover:bg-red-600 transition-colors shadow-lg"
                                                title="Remove image"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* File Info */}
                                <div className="mt-3 text-center">
                                    <p className="text-sm font-medium text-gray-800 truncate" title={preview.name}>
                                        {preview.name}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">{preview.size}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Upload Tips */}
                    <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-xl p-4">
                        <div className="flex items-start space-x-3">
                            <div className="text-blue-500 mt-1">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <div>
                                <h4 className="text-sm font-semibold text-blue-800 mb-1">Photo Tips</h4>
                                <ul className="text-sm text-blue-700 space-y-1">
                                    <li>• The first image will be your main photo shown in search results</li>
                                    <li>• Use the ↑ button to move important images to the front</li>
                                    <li>• Include multiple angles to attract more renters</li>
                                    <li>• Good lighting and clear photos get more bookings!</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Upload Status */}
                    <div className="text-center">
                        <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            <span className="text-sm font-medium">
                                Ready to upload {previewImages.length} image{previewImages.length !== 1 ? 's' : ''}
                            </span>
                        </div>
                    </div>
                </div>
            )}

            {/* Empty State */}
            {previewImages.length === 0 && (
                <div className="text-center py-8">
                    <div className="text-gray-400 mb-4">
                        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                    </div>
                    <p className="text-gray-500 text-lg">No images selected yet</p>
                    <p className="text-gray-400 text-sm mt-1">Upload at least one photo to continue</p>
                </div>
            )}
        </div>
    );
}
