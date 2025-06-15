import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Lock, Unlock, Sun, Moon } from 'lucide-react';

interface SectionHeaderProps {
  title: string;
  description: string;
  isLocked: boolean;
  isInverted: boolean;
  onRefresh: () => void;
  onToggleLock: () => void;
  onToggleInvert: () => void;
}

const SectionHeader = ({ 
  title, 
  description, 
  isLocked,
  isInverted,
  onRefresh, 
  onToggleLock,
  onToggleInvert
}: SectionHeaderProps) => {
  return (
    <div className="flex items-start justify-between mb-6">
      <div className="flex-1">
        <h3 className="text-heading-3 font-structural text-foreground mb-2">
          {title}
        </h3>
        <p className="text-body font-content text-muted-foreground">
          {description}
        </p>
      </div>
      
      <div className="flex items-center gap-2 ml-4">
        <motion.button
          onClick={onToggleInvert}
          className={`p-2 rounded-lg transition-colors ${
            isInverted 
              ? 'bg-amber-100 hover:bg-amber-200 text-amber-700' 
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
          title={isInverted ? "Switch to dark mode" : "Switch to light mode"}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{ rotate: isInverted ? 360 : 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {isInverted ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </motion.div>
        </motion.button>

        <motion.button
          onClick={onRefresh}
          disabled={isLocked}
          className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title={isLocked ? "Locked - unlock to refresh" : "Refresh color strategy"}
          whileHover={!isLocked ? { scale: 1.05 } : {}}
          whileTap={!isLocked ? { scale: 0.95 } : {}}
        >
          <RefreshCw className={`w-4 h-4 text-muted-foreground ${isLocked ? 'opacity-50' : ''}`} />
        </motion.button>
        
        <motion.button
          onClick={onToggleLock}
          className={`p-2 rounded-lg transition-colors ${
            isLocked 
              ? 'bg-amber-100 hover:bg-amber-200 text-amber-700' 
              : 'bg-muted hover:bg-muted/80 text-muted-foreground'
          }`}
          title={isLocked ? "Unlock to allow changes" : "Lock current strategy"}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isLocked ? (
            <Lock className="w-4 h-4" />
          ) : (
            <Unlock className="w-4 h-4" />
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default SectionHeader;