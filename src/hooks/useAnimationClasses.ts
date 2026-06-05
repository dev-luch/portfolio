import { useAnimation } from './useAnimation';

export function useAnimationClasses() {
  const { preferences } = useAnimation();

  const classes = [];

  if (!preferences.enableFloatAndGlowAnimations) {
    classes.push('no-floating-and-glow-animations');
  }

  if (!preferences.enableParticleAnimations) {
    classes.push('no-particle-animations');
  }

  return {
    animationClasses: classes.join(' '),
    preferences
  };
}
