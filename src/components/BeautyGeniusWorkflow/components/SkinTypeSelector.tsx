// Skin type selector component

import React from 'react';
import { motion } from 'framer-motion';
import { buttonVariants, staggerContainer, staggerItem } from '../../../constants/animations';
import { colors } from '../../../constants/designTokens';
import { SkinType } from '../../../types/beautyGenius';

interface SkinTypeSelectorProps {
  selectedType: SkinType;
  onTypeSelect: (type: SkinType) => void;
  className?: string;
}

const skinTypes: { type: SkinType; label: string; description: string }[] = [
  {
    type: 'normal',
    label: 'Normal',
    description: 'Balanced, not too oily or dry',
  },
  {
    type: 'dry',
    label: 'Dry',
    description: 'Feels tight, may have flaky areas',
  },
  {
    type: 'oily',
    label: 'Oily',
    description: 'Shiny, enlarged pores, prone to breakouts',
  },
  {
    type: 'combination',
    label: 'Combination',
    description: 'Oily T-zone, dry cheeks',
  },
  {
    type: 'sensitive',
    label: 'Sensitive',
    description: 'Easily irritated, reactive to products',
  },
];

export const SkinTypeSelector: React.FC<SkinTypeSelectorProps> = ({
  selectedType,
  onTypeSelect,
  className = '',
}) => {
  return (
    <div className={`w-full ${className}`}>
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 sm:grid-cols-2 gap-3"
      >
        {skinTypes.map(({ type, label, description }) => {
          const isSelected = selectedType === type;

          return (
            <motion.button
              key={type}
              variants={staggerItem}
              whileHover="hover"
              whileTap="tap"
              onClick={() => onTypeSelect(type)}
              className={`
                p-4 rounded-lg border-2 text-left transition-all duration-300
                ${
                  isSelected
                    ? 'border-2 shadow-md'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                }
              `}
              style={{
                borderColor: isSelected ? colors.accent.main : undefined,
                backgroundColor: isSelected ? colors.accent.light + '10' : 'white',
              }}
              aria-pressed={isSelected}
              aria-describedby={`${type}-description`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-1">{label}</h3>
                  <p
                    id={`${type}-description`}
                    className="text-sm text-gray-600"
                  >
                    {description}
                  </p>
                </div>

                <div className="ml-3 flex-shrink-0">
                  <div
                    className={`
                      w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors duration-300
                      ${
                        isSelected
                          ? 'border-2'
                          : 'border-gray-300'
                      }
                    `}
                    style={{
                      borderColor: isSelected ? colors.accent.main : undefined,
                      backgroundColor: isSelected ? colors.accent.main : 'transparent',
                    }}
                  >
                    {isSelected && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
};