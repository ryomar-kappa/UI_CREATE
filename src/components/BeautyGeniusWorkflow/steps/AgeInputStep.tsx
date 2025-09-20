// Age input step component

import React from 'react';
import { motion } from 'framer-motion';
import { buttonVariants, fadeInVariants, staggerContainer, staggerItem } from '../../../constants/animations';
import { colors } from '../../../constants/designTokens';
import { AgeInputProps } from '../../../types/beautyGenius';

export const AgeInputStep: React.FC<AgeInputProps> = ({
  age,
  onAgeChange,
  onNext,
  onBack,
  onClose,
}) => {
  const handleDecrement = () => {
    if (age > 18) {
      onAgeChange(age - 1);
    }
  };

  const handleIncrement = () => {
    if (age < 100) {
      onAgeChange(age + 1);
    }
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="max-w-md mx-auto space-y-8 text-center"
    >
      {/* Header */}
      <motion.div variants={staggerItem} className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">
          あなたの年齢を教えてください
        </h2>
        <p className="text-gray-600">
          年齢を教えていただくことで、今のライフステージに合わせたより正確なスキンケア提案が可能になります。
        </p>
      </motion.div>

      {/* Age Selector */}
      <motion.div variants={staggerItem} className="space-y-6">
        <div className="flex items-center justify-center space-x-6">
          {/* Decrement Button */}
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={handleDecrement}
            disabled={age <= 18}
            className={`
              w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold
              transition-all duration-300 shadow-md
              ${age <= 18
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-300'
              }
            `}
            aria-label="年齢を下げる"
          >
            −
          </motion.button>

          {/* Age Display */}
          <motion.div
            key={age}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-center space-y-2"
          >
            <div className="text-6xl font-bold text-gray-900 min-w-[120px]">
              {age}
            </div>
            <div className="text-sm text-gray-500">
              歳
            </div>
          </motion.div>

          {/* Increment Button */}
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={handleIncrement}
            disabled={age >= 100}
            className={`
              w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold
              transition-all duration-300 shadow-md
              ${age >= 100
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-300'
              }
            `}
            aria-label="年齢を上げる"
          >
            +
          </motion.button>
        </div>

        {/* Slider Alternative */}
        <div className="px-4">
          <input
            type="range"
            min="18"
            max="100"
            value={age}
            onChange={(e) => onAgeChange(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, ${colors.accent.main} 0%, ${colors.accent.main} ${((age - 18) / (100 - 18)) * 100}%, #e5e7eb ${((age - 18) / (100 - 18)) * 100}%, #e5e7eb 100%)`
            }}
            aria-label="年齢を選択"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>18</span>
            <span>100</span>
          </div>
        </div>
      </motion.div>

      {/* Age Range Info */}
      <motion.div variants={staggerItem} className="bg-blue-50 rounded-lg p-4">
        <h3 className="font-medium text-blue-900 mb-2">
          💡 年齢をお伺いする理由
        </h3>
        <p className="text-sm text-blue-800">
          肌はライフステージごとに変化します。年齢を把握することで、20代の予防、30代の維持、40代以降のエイジングケアなど、年代特有の悩みに合った製品をご提案できます。
        </p>
      </motion.div>

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
          分析を続ける
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
              戻る
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
              閉じる
            </motion.button>
          )}
        </div>
      </motion.div>

      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: ${colors.accent.main};
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }

        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: ${colors.accent.main};
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </motion.div>
  );
};
