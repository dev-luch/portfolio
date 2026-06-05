'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { AnimationContextType, AnimationPreferences } from './AnimationContext';

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

const defaultPreferences: AnimationPreferences = {
  enableFloatAndGlowAnimations: true,
  enableParticleAnimations: true,
};

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  const [preferences, setPreferences] = useState<AnimationPreferences>(defaultPreferences);

  useEffect(() => {
    const saved = localStorage.getItem('animation-preferences');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setPreferences({ ...defaultPreferences, ...parsed });
      } catch (error) {
        console.warn('Erro ao carregar preferências de animação:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('animation-preferences', JSON.stringify(preferences));
  }, [preferences]);

  const updatePreferences = (newPreferences: Partial<AnimationPreferences>) => {
    setPreferences(prev => ({ ...prev, ...newPreferences }));
  };

  const toggleFloatAndGlowAnimations = () => {
    setPreferences(prev => ({ ...prev, enableFloatAndGlowAnimations: !prev.enableFloatAndGlowAnimations }));
  };

  const toggleParticleAnimations = () => {
    setPreferences(prev => ({ ...prev, enableParticleAnimations: !prev.enableParticleAnimations }));
  };


  const resetToDefaults = () => {
    setPreferences(defaultPreferences);
  };

  const value: AnimationContextType = {
    preferences,
    updatePreferences,
    toggleFloatAndGlowAnimations,
    toggleParticleAnimations,
    resetToDefaults,
  };

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
}

export function useAnimation() {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error('useAnimation deve ser usado dentro de um AnimationProvider');
  }
  return context;
}
