// Skin analysis step component

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  buttonVariants,
  fadeInVariants,
  staggerContainer,
  staggerItem,
} from '../../../constants/animations';
import { colors } from '../../../constants/designTokens';
import { SkinAnalysisProps } from '../../../types/beautyGenius';
import { analysisSteps } from './AnalysisResultStep';

const FINAL_CHECK_DELAY = 1000;
const POLL_INTERVAL = 500;

export const SkinAnalysisStep: React.FC<SkinAnalysisProps> = ({
  analysisStatus,
  onNext,
  onBack,
  onClose,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const hasNavigatedRef = useRef(false);
  const latestStatusRef = useRef(analysisStatus);

  useEffect(() => {
    latestStatusRef.current = analysisStatus;
  }, [analysisStatus]);

  useEffect(() => {
    setCurrentStepIndex(0);
    hasNavigatedRef.current = false;

    const timeouts: number[] = [];
    analysisSteps.forEach((step, index) => {
      const timeoutId = window.setTimeout(() => {
        setCurrentStepIndex(index + 1);
      }, step.delay);
      timeouts.push(timeoutId);
    });

    return () => {
      timeouts.forEach((timeoutId) => window.clearTimeout(timeoutId));
    };
  }, []);

  const finalStepReached = currentStepIndex >= analysisSteps.length;

  useEffect(() => {
    if (!finalStepReached) {
      return;
    }

    if (hasNavigatedRef.current) {
      return;
    }

    if (latestStatusRef.current === 'error') {
      return;
    }

    let followUpTimeout: number | null = null;
    const initialTimeout = window.setTimeout(() => {
      const evaluate = () => {
        if (hasNavigatedRef.current) {
          return;
        }

        if (latestStatusRef.current === 'complete') {
          hasNavigatedRef.current = true;
          onNext();
        } else if (latestStatusRef.current === 'error') {
          // stop polling on error
        } else {
          followUpTimeout = window.setTimeout(evaluate, POLL_INTERVAL);
        }
      };

      evaluate();
    }, FINAL_CHECK_DELAY);

    return () => {
      window.clearTimeout(initialTimeout);
      if (followUpTimeout !== null) {
        window.clearTimeout(followUpTimeout);
      }
    };
  }, [finalStepReached, onNext]);

  const renderErrorState = () => (
    <motion.div
      variants={fadeInVariants}
      initial="initial"
      animate="animate"
      className="space-y-4 p-6 bg-red-50 rounded-lg"
    >
      <h3 className="font-semibold text-red-900">分析中に問題が発生しました</h3>
      <p className="text-sm text-red-800">
        ネットワーク状況などを確認して、再度お試しください。写真を撮り直すことでも改善する場合があります。
      </p>
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
            className="flex-1 py-3 px-6 rounded-lg font-medium text-white"
            style={{ backgroundColor: colors.accent.main }}
          >
            閉じる
          </motion.button>
        )}
      </div>
    </motion.div>
  );

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
          肌を解析しています
        </h2>
      </motion.div>

      <div className="space-y-4">
        <AnimatePresence>
          {analysisSteps.slice(0, currentStepIndex).map((step, index) => (
            <motion.div
              key={`${step.text}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.2 }}
              className="p-4 bg-blue-50 rounded-lg"
            >
              <p className="text-blue-800">{step.text}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {analysisStatus === 'error'
        ? renderErrorState()
        : finalStepReached && (
            <motion.div
              variants={fadeInVariants}
              initial="initial"
              animate="animate"
              className="p-4 bg-green-50 rounded-lg"
            >
              <p className="text-green-800 font-medium">
                分析が完了しました。結果を準備しています...
              </p>
            </motion.div>
          )}
    </motion.div>
  );
};
