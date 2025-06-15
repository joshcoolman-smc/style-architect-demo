import React from 'react';

export interface ColorStrategy {
  id: string;
  name: string;
  description: string;
}

export interface ComponentColorState {
  currentStrategy: number;
  isLocked: boolean;
  isInverted: boolean;
}

interface ColorStrategyState {
  testimonials: ComponentColorState;
  dataVisualization: ComponentColorState;
  forms: ComponentColorState;
  alerts: ComponentColorState;
  cards: ComponentColorState;
}

const initialState: ColorStrategyState = {
  testimonials: { currentStrategy: 0, isLocked: false, isInverted: false },
  dataVisualization: { currentStrategy: 0, isLocked: false, isInverted: false },
  forms: { currentStrategy: 0, isLocked: false, isInverted: false },
  alerts: { currentStrategy: 0, isLocked: false, isInverted: false },
  cards: { currentStrategy: 0, isLocked: false, isInverted: false }
};

export const useColorStrategy = () => {
  const [strategyState, setStrategyState] = React.useState<ColorStrategyState>(initialState);

  const refreshStrategy = React.useCallback((component: keyof ColorStrategyState, maxStrategies: number) => {
    setStrategyState(prev => {
      if (prev[component].isLocked) return prev;
      
      return {
        ...prev,
        [component]: {
          ...prev[component],
          currentStrategy: (prev[component].currentStrategy + 1) % maxStrategies
        }
      };
    });
  }, []);

  const toggleLock = React.useCallback((component: keyof ColorStrategyState) => {
    setStrategyState(prev => ({
      ...prev,
      [component]: {
        ...prev[component],
        isLocked: !prev[component].isLocked
      }
    }));
  }, []);

  const toggleInvert = React.useCallback((component: keyof ColorStrategyState) => {
    setStrategyState(prev => ({
      ...prev,
      [component]: {
        ...prev[component],
        isInverted: !prev[component].isInverted
      }
    }));
  }, []);

  const resetAll = React.useCallback(() => {
    setStrategyState(initialState);
  }, []);

  return {
    strategyState,
    refreshStrategy,
    toggleLock,
    toggleInvert,
    resetAll
  };
};