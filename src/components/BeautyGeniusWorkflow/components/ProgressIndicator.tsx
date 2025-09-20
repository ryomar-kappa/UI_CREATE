// Progress indicator component

import React from 'react';
import { motion } from 'framer-motion';
import { progressVariants } from '../../../constants/animations';
import { colors } from '../../../constants/designTokens';
import { WorkflowStep } from '../../../types/beautyGenius';

interface ProgressIndicatorProps {
  currentStep: WorkflowStep;
  totalSteps?: number;
  className?: string;
}

const stepOrder: WorkflowStep[] = [
  WorkflowStep.WELCOME,
  WorkflowStep.IMAGE_UPLOAD,
  WorkflowStep.AGE_INPUT,
  WorkflowStep.ANALYSIS_RESULT,
  WorkflowStep.SKINCARE_RECOMMENDATION,
];

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  totalSteps = stepOrder.length,
  className = '',
}) => {
  const currentIndex = stepOrder.indexOf(currentStep);
  const progress = ((currentIndex + 1) / totalSteps) * 100;

  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">
          Step {currentIndex + 1} of {totalSteps}
        </span>
        <span className="text-sm font-medium text-gray-700">
          {Math.round(progress)}%
        </span>
      </div>

      <div
        className="w-full bg-gray-200 rounded-full h-2 overflow-hidden"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Progress: ${Math.round(progress)}% complete`}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: colors.accent.main }}
          variants={progressVariants}
          initial="initial"
          animate="animate"
          custom={progress}
        />
      </div>

      <div className="flex justify-between mt-2">
        {stepOrder.map((step, index) => (
          <div
            key={step}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              index <= currentIndex
                ? 'bg-opacity-100'
                : 'bg-opacity-30'
            }`}
            style={{
              backgroundColor: index <= currentIndex
                ? colors.accent.main
                : colors.neutral[400]
            }}
            aria-label={`Step ${index + 1}: ${step.replace('_', ' ')}`}
          />
        ))}
      </div>
    </div>
  );
};