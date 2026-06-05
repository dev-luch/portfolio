'use client';

import React, { useEffect, useRef } from 'react';
import { useAnimationClasses } from '../../hooks/useAnimationClasses';
import styles from './styles.module.css';

export const ParticleSystem: React.FC = () => {
  const { animationClasses } = useAnimationClasses();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
    opacity: number;
    life: number;
    maxLife: number;
  }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        const rect = container.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    const createParticle = () => {
      const colors = ['#00F0FF', '#8B5CF6', '#F59E0B', '#10B981', '#EF4444'];
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.8 + 0.2,
        life: 0,
        maxLife: Math.random() * 200 + 100
      };
    };

    const updateParticles = () => {
      particlesRef.current = particlesRef.current
        .map(particle => {
          let newX = particle.x + particle.vx;
          let newY = particle.y + particle.vy;
          
          // Boundary checking - keep particles within canvas bounds
          if (newX < 0 || newX > canvas.width) {
            particle.vx = -particle.vx;
            newX = Math.max(0, Math.min(canvas.width, newX));
          }
          if (newY < 0 || newY > canvas.height) {
            particle.vy = -particle.vy;
            newY = Math.max(0, Math.min(canvas.height, newY));
          }
          
          return {
            ...particle,
            x: newX,
            y: newY,
            life: particle.life + 1,
            opacity: particle.opacity * (1 - particle.life / particle.maxLife)
          };
        })
        .filter(particle => particle.life < particle.maxLife);

      if (Math.random() < 0.1) {
        particlesRef.current.push(createParticle());
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach(particle => {
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = particle.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = particle.color;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
    };

    const animate = () => {
      updateParticles();
      drawParticles();
      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`${styles.particleSystem} ${animationClasses}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1
      }}
    />
  );
};

export default ParticleSystem;
