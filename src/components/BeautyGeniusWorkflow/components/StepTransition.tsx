// Step transition animation component

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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



  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={stepKey}
        initial={prefersReducedMotion ? { opacity: 0 } : { x: 50, opacity: 0 }}
        animate={prefersReducedMotion ? { opacity: 1 } : { x: 0, opacity: 1 }}
        exit={prefersReducedMotion ? { opacity: 0 } : { x: -50, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`w-full ${className}`}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};