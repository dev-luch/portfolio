"use client";

import { useState, useEffect, useRef, useCallback } from 'react';

interface UseScrollRenderOptions {
  /**
   * Threshold para considerar o elemento visível (0-1)
   * 0 = elemento completamente fora da tela
   * 1 = elemento completamente visível
   */
  threshold?: number;
  /**
   * Margem adicional para renderizar antes do elemento ficar visível
   * Útil para pré-carregar conteúdo
   */
  rootMargin?: string;
  /**
   * Delay em ms antes de desmontar o componente quando sair da viewport
   * Evita flickering durante scroll rápido
   */
  unmountDelay?: number;
  /**
   * Se deve manter a altura do container mesmo quando desmontado
   */
  preserveHeight?: boolean;
  /**
   * Altura mínima do container quando desmontado
   */
  minHeight?: string;
}

interface UseScrollRenderReturn {
  ref: React.RefObject<HTMLElement | null>;
  isVisible: boolean;
  shouldRender: boolean;
  containerStyle: React.CSSProperties;
}

export const useScrollRender = (options: UseScrollRenderOptions = {}): UseScrollRenderReturn => {
  const {
    threshold = 0.1,
    rootMargin = '50px',
    unmountDelay = 300,
    preserveHeight = true,
    minHeight = '200px'
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [containerHeight, setContainerHeight] = useState<string>('100dvh');
  const [hasMeasured, setHasMeasured] = useState(false);

  const ref = useRef<HTMLElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const observerRef = useRef<IntersectionObserver | undefined>(undefined);

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    const entry = entries[0];

    if (entry.isIntersecting) {
      setIsVisible(true);
      setShouldRender(true);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = undefined;
      }
    } else {
      setIsVisible(false);

      if (unmountDelay > 0) {
        timeoutRef.current = setTimeout(() => {
          setShouldRender(false);
          setHasMeasured(false);
        }, unmountDelay);
      } else {
        setShouldRender(false);
        setHasMeasured(false);
      }
    }
  }, [unmountDelay]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (shouldRender && !hasMeasured && preserveHeight) {
      const measureHeight = () => {
        const rect = element.getBoundingClientRect();
        if (rect.height > 0) {
          setContainerHeight(`${rect.height}px`);
          setHasMeasured(true);
        }
      };

      const timeoutId = setTimeout(measureHeight, 100);

      return () => clearTimeout(timeoutId);
    }

    observerRef.current = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin
    });

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [handleIntersection, threshold, rootMargin, preserveHeight, shouldRender, hasMeasured]);

  const containerStyle: React.CSSProperties = {
    minHeight: preserveHeight && !shouldRender && hasMeasured ? containerHeight : minHeight,
    height: shouldRender ? 'auto' : (preserveHeight && hasMeasured ? containerHeight : minHeight),
    overflow: 'hidden',
    transition: 'height 0.3s ease-in-out'
  };

  return {
    ref,
    isVisible,
    shouldRender,
    containerStyle
  };
};
