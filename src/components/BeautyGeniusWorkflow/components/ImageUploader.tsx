// Image uploader component

import React, { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { buttonVariants, fadeInVariants } from '../../../constants/animations';
import { colors } from '../../../constants/designTokens';
import { AnalysisStatus } from '../../../types/beautyGenius';
import { isValidImageFile, isValidImageSize, getImagePreviewUrl } from '../../../utils/imageUtils';
import { announceToScreenReader } from '../../../utils/accessibility';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  uploadProgress: number;
  analysisStatus: AnalysisStatus;
  className?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageUpload,
  uploadProgress,
  analysisStatus,
  className = '',
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    setError(null);

    // Validate file
    if (!isValidImageFile(file)) {
      setError('Please upload a valid image file (JPEG, PNG, or WebP)');
      announceToScreenReader('Invalid file type. Please upload a JPEG, PNG, or WebP image.');
      return;
    }

    if (!isValidImageSize(file)) {
      setError('File size must be less than 5MB');
      announceToScreenReader('File too large. Please choose an image smaller than 5MB.');
      return;
    }

    // Set preview
    const previewUrl = getImagePreviewUrl(file);
    setPreview(previewUrl);

    // Upload file
    onImageUpload(file);
    announceToScreenReader('Image uploaded successfully. Starting analysis...');
  }, [onImageUpload]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  }, [handleFiles]);

  const isUploading = analysisStatus === 'uploading';
  const isAnalyzing = analysisStatus === 'analyzing';

  return (
    <div className={`w-full ${className}`}>
      {preview && !isUploading ? (
        <motion.div
          variants={fadeInVariants}
          initial="initial"
          animate="animate"
          className="mb-4"
        >
          <img
            src={preview}
            alt="Uploaded preview"
            className="w-full max-w-sm mx-auto rounded-lg shadow-md"
          />
        </motion.div>
      ) : (
        <motion.div
          className={`
            relative border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-300
            ${dragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
            ${isUploading ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
          `}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          whileHover={!isUploading ? { scale: 1.02 } : {}}
          whileTap={!isUploading ? { scale: 0.98 } : {}}
        >
          <input
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={isUploading}
            aria-label="Upload image file"
          />

          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-gray-100">
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {isUploading ? 'Uploading...' : 'Upload your photo'}
              </h3>
              <p className="text-sm text-gray-500">
                Drag and drop or click to select a photo
              </p>
              <p className="text-xs text-gray-400 mt-1">
                JPEG, PNG, or WebP (max 5MB)
              </p>
            </div>

            {isUploading && (
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: colors.accent.main }}
                  initial={{ width: 0 }}
                  animate={{ width: `${uploadProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            )}
          </div>
        </motion.div>
      )}

      {error && (
        <motion.div
          variants={fadeInVariants}
          initial="initial"
          animate="animate"
          className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md"
          role="alert"
          aria-live="polite"
        >
          <p className="text-sm text-red-600">{error}</p>
        </motion.div>
      )}

      {isAnalyzing && (
        <motion.div
          variants={fadeInVariants}
          initial="initial"
          animate="animate"
          className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md text-center"
        >
          <div className="animate-spin w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-2" />
          <p className="text-sm text-blue-600">Analyzing your photo...</p>
        </motion.div>
      )}
    </div>
  );
};