// Image upload step component

import React from 'react';
import { motion } from 'framer-motion';
import { buttonVariants, fadeInVariants, staggerContainer, staggerItem } from '../../../constants/animations';
import { colors } from '../../../constants/designTokens';
import { ImageUploadProps } from '../../../types/beautyGenius';
import { ImageUploader } from '../components/ImageUploader';

export const ImageUploadStep: React.FC<ImageUploadProps> = ({
  onImageUpload,
  uploadProgress,
  analysisStatus,
  onNext,
  onBack,
  onClose,
}) => {
  const canProceed = analysisStatus === 'complete';

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="max-w-lg mx-auto space-y-8"
    >
      {/* Header */}
      <motion.div variants={staggerItem} className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">
          Upload Your Photo
        </h2>
        <p className="text-gray-600">
          Take or upload a clear photo of your face for the most accurate analysis.
          Make sure you're in good lighting with no makeup for best results.
        </p>
      </motion.div>

      {/* Upload Tips */}
      <motion.div variants={staggerItem} className="bg-blue-50 rounded-lg p-4">
        <h3 className="font-medium text-blue-900 mb-3">📸 Photo Tips:</h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li className="flex items-start space-x-2">
            <span className="text-blue-600">•</span>
            <span>Face the camera directly with good lighting</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-blue-600">•</span>
            <span>Remove makeup, glasses, and accessories</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-blue-600">•</span>
            <span>Ensure your entire face is visible</span>
          </li>
          <li className="flex items-start space-x-2">
            <span className="text-blue-600">•</span>
            <span>Use natural lighting when possible</span>
          </li>
        </ul>
      </motion.div>

      {/* Image Uploader */}
      <motion.div variants={staggerItem}>
        <ImageUploader
          onImageUpload={onImageUpload}
          uploadProgress={uploadProgress}
          analysisStatus={analysisStatus}
        />
      </motion.div>

      {/* Analysis Status Messages */}
      {analysisStatus === 'analyzing' && (
        <motion.div
          variants={fadeInVariants}
          initial="initial"
          animate="animate"
          className="text-center space-y-4 p-6 bg-yellow-50 rounded-lg"
        >
          <div className="flex justify-center">
            <div className="animate-spin w-8 h-8 border-3 border-yellow-600 border-t-transparent rounded-full" />
          </div>
          <div className="space-y-2">
            <h3 className="font-medium text-yellow-900">Analyzing your photo...</h3>
            <p className="text-sm text-yellow-800">
              Our AI is comparing your image with over 25,000 samples to determine your skin type.
            </p>
          </div>
        </motion.div>
      )}

      {analysisStatus === 'complete' && (
        <motion.div
          variants={fadeInVariants}
          initial="initial"
          animate="animate"
          className="text-center space-y-4 p-6 bg-green-50 rounded-lg"
        >
          <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="space-y-2">
            <h3 className="font-medium text-green-900">Analysis Complete!</h3>
            <p className="text-sm text-green-800">
              Your photo has been successfully analyzed. Ready to continue?
            </p>
          </div>
        </motion.div>
      )}

      {/* Navigation Buttons */}
      <motion.div variants={staggerItem} className="flex flex-col space-y-3">
        {canProceed && (
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={onNext}
            className="w-full py-3 px-6 rounded-lg font-medium text-white shadow-md"
            style={{ backgroundColor: colors.accent.main }}
          >
            Continue to Next Step
          </motion.button>
        )}

        <div className="flex space-x-3">
          {onBack && (
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={onBack}
              className="flex-1 py-3 px-6 rounded-lg font-medium text-gray-600 border border-gray-300 hover:bg-gray-50"
            >
              Back
            </motion.button>
          )}

          {onClose && (
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={onClose}
              className="flex-1 py-3 px-6 rounded-lg font-medium text-gray-600 border border-gray-300 hover:bg-gray-50"
            >
              Close
            </motion.button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};