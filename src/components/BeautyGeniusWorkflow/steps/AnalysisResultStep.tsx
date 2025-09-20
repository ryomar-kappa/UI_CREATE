// Analysis result step component

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { buttonVariants, fadeInVariants, staggerContainer, staggerItem } from '../../../constants/animations';
import { colors } from '../../../constants/designTokens';
import { AnalysisResultProps, SkinType } from '../../../types/beautyGenius';

const analysisSteps = [
  { text: "写真をアップロードしていただき、ありがとうございます", delay: 0 },
  { text: "25,000枚の画像と比較しています", delay: 1500 },
  { text: "肌分析が完了しました", delay: 3000 },
  { text: "あなたの肌タイプを判定しています", delay: 4500 },
];

const skinTypeDescriptions: Record<SkinType, { title: string; description: string; icon: string; tips: string[] }> = {
  normal: {
    title: "Normal Skin",
    description: "Your skin is well-balanced with a smooth texture and healthy appearance.",
    icon: "✨",
    tips: [
      "Maintain with gentle daily cleansing",
      "Use a light moisturizer",
      "Apply SPF daily",
    ],
  },
  dry: {
    title: "Dry Skin",
    description: "Your skin may feel tight and could benefit from extra hydration.",
    icon: "💧",
    tips: [
      "Use a cream-based cleanser",
      "Apply rich moisturizer twice daily",
      "Consider a hydrating serum",
    ],
  },
  oily: {
    title: "Oily Skin",
    description: "Your skin produces more oil, which may lead to shine and enlarged pores.",
    icon: "🌟",
    tips: [
      "Use a gel-based cleanser",
      "Apply oil-free moisturizer",
      "Consider salicylic acid products",
    ],
  },
  combination: {
    title: "Combination Skin",
    description: "Your skin is oily in the T-zone but normal to dry on the cheeks.",
    icon: "🎭",
    tips: [
      "Use different products for different areas",
      "Gentle cleanser overall",
      "Light moisturizer on T-zone, richer on cheeks",
    ],
  },
  sensitive: {
    title: "Sensitive Skin",
    description: "Your skin is reactive and may be easily irritated by certain ingredients.",
    icon: "🌸",
    tips: [
      "Use fragrance-free products",
      "Patch test new products",
      "Choose gentle, hypoallergenic formulas",
    ],
  },
};

export const AnalysisResultStep: React.FC<AnalysisResultProps> = ({
  analysisResult,
  isAnalyzing,
  onNext,
  onBack,
  onClose,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (isAnalyzing) {
      // Reset state when analysis starts
      setCurrentStepIndex(0);
      setShowResult(false);

      // Progressive step display
      analysisSteps.forEach((step, index) => {
        setTimeout(() => {
          setCurrentStepIndex(index + 1);
        }, step.delay);
      });

      // Show final result after all steps
      setTimeout(() => {
        setShowResult(true);
      }, 6000);
    }
  }, [isAnalyzing]);

  if (isAnalyzing || !analysisResult) {
    return (
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="max-w-md mx-auto space-y-8 text-center"
      >
        <motion.div variants={staggerItem} className="space-y-4">
          <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
            <div className="animate-spin w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Analyzing Your Skin
          </h2>
        </motion.div>

        <div className="space-y-4">
          <AnimatePresence>
            {analysisSteps.slice(0, currentStepIndex).map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-4 bg-blue-50 rounded-lg"
              >
                <p className="text-blue-800">{step.text}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {showResult && (
          <motion.div
            variants={fadeInVariants}
            initial="initial"
            animate="animate"
            className="p-4 bg-green-50 rounded-lg"
          >
            <p className="text-green-800 font-medium">
              Analysis complete! Preparing your results...
            </p>
          </motion.div>
        )}
      </motion.div>
    );
  }

  const skinInfo = skinTypeDescriptions[analysisResult.skinType];

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="max-w-lg mx-auto space-y-8"
    >
      {/* Header */}
      <motion.div variants={staggerItem} className="text-center space-y-4">
        <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center">
          <span className="text-3xl">{skinInfo.icon}</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          Your Skin Analysis
        </h2>
      </motion.div>

      {/* Main Result */}
      <motion.div variants={staggerItem} className="bg-white rounded-xl shadow-lg p-6 space-y-4">
        <div className="text-center space-y-2">
          <h3 className="text-xl font-bold text-gray-900">
            {skinInfo.title}
          </h3>
          <p className="text-gray-600">
            {skinInfo.description}
          </p>
        </div>

        <div className="flex items-center justify-center space-x-6 py-4">
          <div className="text-center">
            <div className="text-2xl font-bold" style={{ color: colors.accent.main }}>
              {Math.round(analysisResult.confidenceScore * 100)}%
            </div>
            <div className="text-sm text-gray-500">Confidence</div>
          </div>

          {analysisResult.ageEstimate && (
            <div className="text-center">
              <div className="text-2xl font-bold" style={{ color: colors.accent.main }}>
                {analysisResult.ageEstimate}
              </div>
              <div className="text-sm text-gray-500">Estimated Age</div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Skincare Tips */}
      <motion.div variants={staggerItem} className="bg-blue-50 rounded-lg p-6 space-y-4">
        <h3 className="font-bold text-blue-900">
          💡 Recommended Care Tips
        </h3>
        <ul className="space-y-2">
          {skinInfo.tips.map((tip, index) => (
            <li key={index} className="flex items-start space-x-2 text-blue-800">
              <span className="text-blue-600 mt-1">•</span>
              <span className="text-sm">{tip}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Skin Concerns */}
      {analysisResult.skinConcerns.length > 0 && (
        <motion.div variants={staggerItem} className="bg-yellow-50 rounded-lg p-6 space-y-4">
          <h3 className="font-bold text-yellow-900">
            ⚠️ Areas to Focus On
          </h3>
          <ul className="space-y-2">
            {analysisResult.skinConcerns.map((concern, index) => (
              <li key={index} className="flex items-start space-x-2 text-yellow-800">
                <span className="text-yellow-600 mt-1">•</span>
                <span className="text-sm">{concern}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Navigation Buttons */}
      <motion.div variants={staggerItem} className="flex flex-col space-y-3">
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={onNext}
          className="w-full py-3 px-6 rounded-lg font-medium text-white shadow-md"
          style={{ backgroundColor: colors.accent.main }}
        >
          See Product Recommendations
        </motion.button>

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