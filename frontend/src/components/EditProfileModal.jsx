import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { updateUserProfile } from '../redux/features/userSlice';
import './EditProfileModal.css';

const EditProfileModal = ({ isOpen, onClose, user }) => {
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        avatar: user?.avatar || ''
    });
    const [previewImage, setPreviewImage] = useState(user?.avatar || '');
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [uploadError, setUploadError] = useState('');

    // Reset form when modal opens/closes or user changes
    React.useEffect(() => {
        if (isOpen && user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                avatar: user.avatar || ''
            });
            setPreviewImage(user.avatar || '');
            setErrors({});
            setUploadError('');
        }
    }, [isOpen, user]);

    const validateForm = () => {
        const newErrors = {};

        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters long';
        } else if (formData.name.trim().length > 50) {
            newErrors.name = 'Name must be less than 50 characters';
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email.trim())) {
            newErrors.email = 'Please enter a valid email address';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setUploadError('');

        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                setUploadError('Please select an image file (JPEG, PNG, GIF, etc.)');
                return;
            }

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setUploadError('Image size should be less than 5MB');
                return;
            }

            // Validate image dimensions
            const img = new Image();
            img.onload = () => {
                if (img.width < 100 || img.height < 100) {
                    setUploadError('Image should be at least 100x100 pixels');
                    return;
                }
                if (img.width > 2000 || img.height > 2000) {
                    setUploadError('Image should be less than 2000x2000 pixels');
                    return;
                }

                // If all validations pass, process the image
                const reader = new FileReader();
                reader.onload = (event) => {
                    setPreviewImage(event.target.result);
                    setFormData(prev => ({
                        ...prev,
                        avatar: event.target.result
                    }));
                };
                reader.onerror = () => {
                    setUploadError('Failed to read image file. Please try again.');
                };
                reader.readAsDataURL(file);
            };
            img.onerror = () => {
                setUploadError('Invalid image file. Please select a valid image.');
            };
            img.src = URL.createObjectURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        setErrors({});

        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Validate that we have a user before updating
            if (!user) {
                throw new Error('No user data available');
            }

            dispatch(updateUserProfile(formData));
            onClose();
        } catch (error) {
            console.error('Error updating profile:', error);
            setErrors({
                general: 'Failed to update profile. Please try again.'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const removeImage = () => {
        setPreviewImage('');
        setFormData(prev => ({
            ...prev,
            avatar: ''
        }));
        setUploadError('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Edit Profile</h2>
                    <button className="close-button" onClick={onClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="edit-form">
                    {/* General Error Message */}
                    {errors.general && (
                        <div className="error-message general-error">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="15" y1="9" x2="9" y2="15"></line>
                                <line x1="9" y1="9" x2="15" y2="15"></line>
                            </svg>
                            {errors.general}
                        </div>
                    )}

                    {/* Profile Image Upload */}
                    <div className="image-upload-section">
                        <div className="image-preview" onClick={triggerFileInput}>
                            <img src={previewImage || 'https://via.placeholder.com/120x120/6B7280/FFFFFF?text=?'} alt="Profile preview" />
                            <div className="upload-overlay">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                    <polyline points="7,10 12,15 17,10"></polyline>
                                    <line x1="12" y1="15" x2="12" y2="3"></line>
                                </svg>
                                <span>Change Photo</span>
                            </div>
                        </div>
                        
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            style={{ display: 'none' }}
                        />
                        
                        <div className="image-actions">
                            <button type="button" className="upload-btn" onClick={triggerFileInput}>
                                Upload New Photo
                            </button>
                            {previewImage && previewImage !== user?.avatar && (
                                <button type="button" className="remove-btn" onClick={removeImage}>
                                    Remove
                                </button>
                            )}
                        </div>

                        {uploadError && (
                            <div className="error-message upload-error">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="15" y1="9" x2="9" y2="15"></line>
                                    <line x1="9" y1="9" x2="15" y2="15"></line>
                                </svg>
                                {uploadError}
                            </div>
                        )}
                        
                        <p className="upload-hint">Click to upload a new profile picture (max 5MB, min 100x100px)</p>
                    </div>

                    {/* Form Fields */}
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className={errors.name ? 'error' : ''}
                            placeholder="Enter your name"
                        />
                        {errors.name && (
                            <div className="error-message field-error">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="15" y1="9" x2="9" y2="15"></line>
                                    <line x1="9" y1="9" x2="15" y2="15"></line>
                                </svg>
                                {errors.name}
                            </div>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={errors.email ? 'error' : ''}
                            placeholder="Enter your email"
                        />
                        {errors.email && (
                            <div className="error-message field-error">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="15" y1="9" x2="9" y2="15"></line>
                                    <line x1="9" y1="9" x2="15" y2="15"></line>
                                </svg>
                                {errors.email}
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="form-actions">
                        <button type="button" className="cancel-button" onClick={onClose} disabled={isLoading}>
                            Cancel
                        </button>
                        <button type="submit" className="save-button" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <svg className="loading-spinner" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 12a9 9 0 11-6.219-8.56"/>
                                    </svg>
                                    Saving...
                                </>
                            ) : (
                                'Save Changes'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfileModal; 