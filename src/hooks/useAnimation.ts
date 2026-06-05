import { useAnimation as useAnimationContext } from '../context/AnimationContext/AnimationProvider';

export function useAnimation() {
  return useAnimationContext();
}
