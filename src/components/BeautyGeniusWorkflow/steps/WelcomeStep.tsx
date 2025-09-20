// Welcome step component

import React from 'react';
import { motion } from 'framer-motion';
import { buttonVariants, fadeInVariants, staggerContainer, staggerItem } from '../../../constants/animations';
import { colors, typography } from '../../../constants/designTokens';
import { StepComponentProps } from '../../../types/beautyGenius';

export const WelcomeStep: React.FC<StepComponentProps> = ({
  onNext,
  onClose,
}) => {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="text-center space-y-8 max-w-md mx-auto"
    >
      {/* Logo/Brand Section */}
      <motion.div variants={staggerItem} className="space-y-4">
        <div className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-lg">
          <span className="text-3xl font-bold text-white">L'O</span>
        </div>
        <h1
          className="text-3xl font-bold text-gray-900"
          style={{ fontFamily: typography.fontFamily.primary }}
        >
          Beauty Genius
        </h1>
      </motion.div>

      {/* Welcome Message */}
      <motion.div variants={staggerItem} className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Welcome to your personalized beauty journey
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Our AI-powered analysis will help you discover your unique skin type
          and find the perfect skincare routine tailored just for you.
        </p>
      </motion.div>

      {/* Features List */}
      <motion.div variants={staggerItem} className="space-y-3">
        <div className="flex items-center space-x-3 text-left">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: colors.accent.main }}
          >
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-gray-700">AI-powered skin analysis</span>
        </div>

        <div className="flex items-center space-x-3 text-left">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: colors.accent.main }}
          >
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-gray-700">Personalized product recommendations</span>
        </div>

        <div className="flex items-center space-x-3 text-left">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: colors.accent.main }}
          >
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-gray-700">Expert skincare guidance</span>
        </div>
      </motion.div>

      {/* Privacy Note */}
      <motion.div variants={staggerItem}>
        <p className="text-sm text-gray-500">
          🔒 Your data is secure and will only be used to provide personalized recommendations
        </p>
      </motion.div>

      {/* Action Buttons */}
      <motion.div variants={staggerItem} className="flex flex-col space-y-3 pt-4">
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={onNext}
          className="w-full py-3 px-6 rounded-lg font-medium text-white shadow-md transition-all duration-300"
          style={{ backgroundColor: colors.accent.main }}
        >
          Start Your Beauty Analysis
        </motion.button>

        {onClose && (
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={onClose}
            className="w-full py-3 px-6 rounded-lg font-medium text-gray-600 border border-gray-300 hover:bg-gray-50 transition-all duration-300"
          >
            Maybe Later
          </motion.button>
        )}
      </motion.div>
    </motion.div>
  );
};