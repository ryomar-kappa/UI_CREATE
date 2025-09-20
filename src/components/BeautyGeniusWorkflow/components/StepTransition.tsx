// Step transition animation component

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { stepVariants } from '../../../constants/animations';
import { useReducedMotion } from '../../../utils/accessibility';

interface StepTransitionProps {
  children: React.ReactNode;
  stepKey: string;
  className?: string;
}

export const StepTransition: React.FC<StepTransitionProps> = ({
  children,
  stepKey,
  className = '',
}) => {
  const prefersReducedMotion = useReducedMotion();

  const variants = prefersReducedMotion
    ? {
        enter: { opacity: 0 },
        center: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : stepVariants;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={stepKey}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        className={`w-full ${className}`}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};