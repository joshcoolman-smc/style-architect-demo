
import React from 'react';
import { motion } from 'framer-motion';
import GradientContainer from '../../../components/GradientContainer';

const SampleTextComponent = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <GradientContainer className="p-12">
      <motion.div 
        className="space-y-6 max-w-prose"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          className="text-heading-1 text-white font-structural"
          variants={itemVariants}
        >
          Typography creates hierarchy
        </motion.h1>
        <motion.h2 
          className="text-heading-2 text-white/80 font-subheader"
          variants={itemVariants}
        >
          Visual contrast guides the reader's eye through information
        </motion.h2>
        <motion.p 
          className="text-body text-white font-content"
          variants={itemVariants}
        >
          Effective typography establishes clear information hierarchy through strategic use of size, weight, and spacing. By varying these elements systematically, designers create a visual roadmap that leads readers through content naturally.
        </motion.p>
        <motion.p 
          className="text-caption text-white/90 font-content"
          variants={itemVariants}
        >
          The smallest text provides additional context and details. Caption text is perfect for metadata, annotations, and supplementary information that supports the main content without competing for attention.
        </motion.p>
      </motion.div>
    </GradientContainer>
  );
};

export default SampleTextComponent;
