export interface AnimationPreferences {
  enableFloatAndGlowAnimations: boolean;
  enableParticleAnimations: boolean;
}

export interface AnimationContextType {
  preferences: AnimationPreferences;
  updatePreferences: (preferences: Partial<AnimationPreferences>) => void;
  toggleFloatAndGlowAnimations: () => void;
  toggleParticleAnimations: () => void;
  resetToDefaults: () => void;
}
