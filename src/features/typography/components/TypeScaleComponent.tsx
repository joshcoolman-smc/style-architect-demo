
import React from 'react';
import { motion } from 'framer-motion';
import { Separator } from '../../../components/ui/separator';
import GradientContainer from '../../../components/GradientContainer';

const TypeScaleComponent = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <GradientContainer className="p-12">
      <motion.div 
        className="space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="relative" variants={itemVariants}>
          <h1 className="text-heading-1 text-white">Quick brown fox</h1>
          <span className="ds-text-technical-light text-muted-foreground absolute -bottom-4 left-0">h-1</span>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Separator className="bg-white/20" />
        </motion.div>
        <motion.div className="relative -translate-y-1" variants={itemVariants}>
          <h2 className="text-heading-2 text-white">Quick brown fox</h2>
          <span className="ds-text-technical-light text-muted-foreground absolute -bottom-4 left-0">h-2</span>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Separator className="bg-white/20" />
        </motion.div>
        <motion.div className="relative -translate-y-1" variants={itemVariants}>
          <h3 className="text-heading-3 text-white">Quick brown fox</h3>
          <span className="ds-text-technical-light text-muted-foreground absolute -bottom-4 left-0">h-3</span>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Separator className="bg-white/20" />
        </motion.div>
        <motion.div className="relative -translate-y-1" variants={itemVariants}>
          <p className="text-body text-white">Quick brown fox jumps over the lazy dog</p>
          <span className="ds-text-technical-light text-muted-foreground absolute -bottom-4 left-0">body</span>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Separator className="bg-white/20" />
        </motion.div>
        <motion.div className="relative -translate-y-1" variants={itemVariants}>
          <p className="text-caption text-white">Quick brown fox jumps over the lazy dog</p>
          <span className="ds-text-technical-light text-muted-foreground absolute -bottom-4 left-0">caption</span>
        </motion.div>
      </motion.div>
    </GradientContainer>
  );
};

export default TypeScaleComponent;
