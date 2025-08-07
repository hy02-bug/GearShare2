import React, { useState } from 'react';
import { useForm, Head } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';

export default function ProductRentalForm({ user }) {
    const [previewImages, setPreviewImages] = useState([]);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        sports: '',
        size: '',
        condition: '',
        location: '',
        description: '',
        rentalPrice: '',
        dateAvailability: '',
        pictures: [],
    });

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
                id: Date.now() + index,
                file: file,
                url: URL.createObjectURL(file),
                name: file.name,
                size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
                isPrimary: index === 0
            });
        });

        if (validFiles.length === 0) return;

        setData('pictures', validFiles);
        setPreviewImages(previews);
    };

    const removeImage = (indexToRemove) => {
        // Clean up object URL
        URL.revokeObjectURL(previewImages[indexToRemove].url);

        const newFiles = data.pictures.filter((_, index) => index !== indexToRemove);
        const newPreviews = previewImages.filter((_, index) => index !== indexToRemove);

        // Update primary image
        if (newPreviews.length > 0) {
            newPreviews[0].isPrimary = true;
        }

        setData('pictures', newFiles);
        setPreviewImages(newPreviews);
    };

    const moveImageUp = (index) => {
        if (index === 0) return;

        const newFiles = [...data.pictures];
        const newPreviews = [...previewImages];

        // Swap files and previews
        [newFiles[index], newFiles[index - 1]] = [newFiles[index - 1], newFiles[index]];
        [newPreviews[index], newPreviews[index - 1]] = [newPreviews[index - 1], newPreviews[index]];

        // Update primary status
        newPreviews.forEach((preview, i) => {
            preview.isPrimary = i === 0;
        });

        setData('pictures', newFiles);
        setPreviewImages(newPreviews);
    };

    const clearAllImages = () => {
        previewImages.forEach(preview => {
            URL.revokeObjectURL(preview.url);
        });
        setPreviewImages([]);
        setData('pictures', []);
    };

    function submit(e) {
        e.preventDefault();

        post("/equipment", {
            forceFormData: true, // Important for file uploads
            onSuccess: () => {
                // Clean up object URLs
                previewImages.forEach(preview => {
                    URL.revokeObjectURL(preview.url);
                });
                reset();
                setPreviewImages([]);
            },
            onError: (errors) => {
                console.log('Upload errors:', errors);
            }
        });
    }

    return (
        <Layout header="Product Rental Form">
            <Head title="Product Rental Form" />

            <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
                <h1 className="text-2xl font-bold mb-6">List Your Equipment</h1>

                <form onSubmit={submit} className="space-y-6">
                    {/* Item Details Section */}
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Item Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium mb-1">Equipment Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    placeholder="e.g., Mountain Bike, Surfboard"
                                    required
                                />
                                {errors.name && <div className="text-red-600 text-sm mt-1">{errors.name}</div>}
                            </div>

                            <div>
                                <label htmlFor="sports" className="block text-sm font-medium mb-1">Sport Category</label>
                                <select
                                    id="sports"
                                    value={data.sports}
                                    onChange={e => setData('sports', e.target.value)}
                                    className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    required
                                >
                                    <option value="">Select a sport</option>
                                    <option value="cycling">Cycling</option>
                                    <option value="surfing">Surfing</option>
                                    <option value="skiing">Skiing</option>
                                    <option value="camping">Camping</option>
                                    <option value="fitness">Fitness</option>
                                    <option value="water-sports">Water Sports</option>
                                    <option value="winter-sports">Winter Sports</option>
                                    <option value="other">Other</option>
                                </select>
                                {errors.sports && <div className="text-red-600 text-sm mt-1">{errors.sports}</div>}
                            </div>

                            <div>
                                <label htmlFor="size" className="block text-sm font-medium mb-1">Size</label>
                                <input
                                    id="size"
                                    type="text"
                                    value={data.size}
                                    onChange={e => setData('size', e.target.value)}
                                    className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    placeholder="e.g., Large, Medium, XL"
                                    required
                                />
                                {errors.size && <div className="text-red-600 text-sm mt-1">{errors.size}</div>}
                            </div>

                            <div>
                                <label htmlFor="condition" className="block text-sm font-medium mb-1">Condition</label>
                                <select
                                    id="condition"
                                    value={data.condition}
                                    onChange={e => setData('condition', e.target.value)}
                                    className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    required
                                >
                                    <option value="">Select condition</option>
                                    <option value="excellent">Like-New</option>
                                    <option value="very-good">Rarely-Used</option>
                                    <option value="good">Well-Used</option>
                                    <option value="fair">Worn out</option>
                                </select>
                                {errors.condition && <div className="text-red-600 text-sm mt-1">{errors.condition}</div>}
                            </div>

                            <div className="md:col-span-2">
                                <label htmlFor="location" className="block text-sm font-medium mb-1">Location (City)</label>
                                <input
                                    id="location"
                                    type="text"
                                    value={data.location}
                                    onChange={e => setData('location', e.target.value)}
                                    className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    placeholder="e.g., Los Angeles, CA"
                                    required
                                />
                                {errors.location && <div className="text-red-600 text-sm mt-1">{errors.location}</div>}
                            </div>
                        </div>
                    </div>

                    <hr className="my-6" />

                    {/* Description Section */}
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Description & Photos</h2>

                        <div className="mb-6">
                            <label htmlFor="description" className="block text-sm font-medium mb-1">Description (Optional)</label>
                            <textarea
                                id="description"
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                rows="4"
                                placeholder="Describe your equipment's features, condition, and any special instructions..."
                            />
                            {errors.description && <div className="text-red-600 text-sm mt-1">{errors.description}</div>}
                        </div>

                        {/* Picture Upload Section with Preview */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Pictures <span className="text-red-500">*</span> (Required - Maximum 10 pictures)
                            </label>

                            {/* Upload Area */}
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-500 hover:bg-green-50 transition-all duration-200">
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
                                        <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                        </svg>
                                        <span className="text-lg font-medium text-gray-700">📷 Upload Pictures</span>
                                        <span className="text-sm text-gray-500 mt-1">Click to browse or drag and drop images</span>
                                        <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full mt-2">
                                            JPEG, PNG, GIF up to 5MB each
                                        </span>
                                    </div>
                                </label>
                            </div>

                            {errors.pictures && <div className="text-red-600 text-sm mt-2">{errors.pictures}</div>}

                            {/* Image Previews */}
                            {previewImages.length > 0 && (
                                <div className="mt-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-sm font-medium">Selected Images ({previewImages.length}/10)</h3>
                                        <button
                                            type="button"
                                            onClick={clearAllImages}
                                            className="text-xs text-red-600 hover:text-red-800 border border-red-300 px-2 py-1 rounded hover:bg-red-50 transition-colors"
                                        >
                                            Clear All
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {previewImages.map((preview, index) => (
                                            <div key={preview.id} className="group relative">
                                                {/* Image Container */}
                                                <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200 hover:border-green-500 transition-colors">
                                                    <img
                                                        src={preview.url}
                                                        alt={`Preview ${index + 1}`}
                                                        className="w-full h-full object-cover"
                                                    />

                                                    {/* Primary Badge */}
                                                    {preview.isPrimary && (
                                                        <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded font-medium shadow-lg">
                                                            ⭐ Main Photo
                                                        </div>
                                                    )}

                                                    {/* Image Number */}
                                                    <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-full">
                                                        {index + 1}
                                                    </div>

                                                    {/* Action Buttons */}
                                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                                        <div className="flex space-x-2">
                                                            {/* Move Up Button */}
                                                            {index > 0 && (
                                                                <button
                                                                    type="button"
                                                                    onClick={() => moveImageUp(index)}
                                                                    className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition-colors shadow-lg"
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
                                                                className="bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors shadow-lg"
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
                                                <div className="mt-2 text-center">
                                                    <p className="text-xs font-medium text-gray-800 truncate" title={preview.name}>
                                                        {preview.name}
                                                    </p>
                                                    <p className="text-xs text-gray-500">{preview.size}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Upload Tips */}
                                    <div className="mt-4 bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-4">
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
                                </div>
                            )}

                            {/* Empty State */}
                            {previewImages.length === 0 && (
                                <div className="text-center py-4 text-gray-500">
                                    <p className="text-sm">No images selected yet</p>
                                    <p className="text-xs text-gray-400 mt-1">Upload at least one photo to continue</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <hr className="my-6" />

                    {/* Pricing and Availability Section */}
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Pricing & Availability</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="rentalPrice" className="block text-sm font-medium mb-1">
                                    Rental Price (per day) <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-2 text-gray-500">$</span>
                                    <input
                                        id="rentalPrice"
                                        type="number"
                                        value={data.rentalPrice}
                                        onChange={e => setData('rentalPrice', e.target.value)}
                                        className="w-full border rounded px-3 py-2 pl-8 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                        placeholder="0.00"
                                        required
                                        min="0"
                                        step="0.01"
                                    />
                                </div>
                                {errors.rentalPrice && <div className="text-red-600 text-sm mt-1">{errors.rentalPrice}</div>}
                            </div>

                            <div>
                                <label htmlFor="dateAvailability" className="block text-sm font-medium mb-1">
                                    Available From <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="dateAvailability"
                                    type="date"
                                    value={data.dateAvailability}
                                    onChange={e => setData('dateAvailability', e.target.value)}
                                    className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    required
                                    min={new Date().toISOString().split('T')[0]}
                                />
                                {errors.dateAvailability && <div className="text-red-600 text-sm mt-1">{errors.dateAvailability}</div>}
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-6">
                        <button
                            type="submit"
                            disabled={processing || previewImages.length === 0}
                            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
                        >
                            {processing ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Uploading...
                                </>
                            ) : (
                                `List My Equipment${previewImages.length > 0 ? ` (${previewImages.length} photos)` : ''}`
                            )}
                        </button>

                        {previewImages.length === 0 && (
                            <p className="text-sm text-gray-500 text-center mt-2">
                                📷 Please add at least one photo to continue
                            </p>
                        )}
                    </div>
                </form>
            </div>
        </Layout>
    );
}
