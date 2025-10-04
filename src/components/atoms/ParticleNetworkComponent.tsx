'use client';

import { useEffect, useRef } from 'react';

interface ParticleNetworkProps {
  className?: string;
  particleColor?: string;
  background?: string;
  interactive?: boolean;
  speed?: 'slow' | 'medium' | 'fast' | 'none';
  density?: 'low' | 'medium' | 'high' | number;
}

interface ParticleOptions {
  particleColor: string;
  background: string;
  interactive: boolean;
  velocity: number;
  density: number;
}

class Particle {
  canvas: HTMLCanvasElement;
  g: CanvasRenderingContext2D;
  particleColor: string;
  x: number;
  y: number;
  velocity: { x: number; y: number };
  constructor(network: ParticleNetwork) {
    this.canvas = network.canvas;
    this.g = network.g;
    this.particleColor = network.options.particleColor;
    this.x = Math.random() * this.canvas.width;
    this.y = Math.random() * this.canvas.height;
    this.velocity = {
      x: (Math.random() - 0.5) * network.options.velocity,
      y: (Math.random() - 0.5) * network.options.velocity,
    };
  }

  update() {
    if (this.x > this.canvas.width + 20 || this.x < -20) {
      this.velocity.x = -this.velocity.x;
    }
    if (this.y > this.canvas.height + 20 || this.y < -20) {
      this.velocity.y = -this.velocity.y;
    }
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }

  draw() {
    this.g.beginPath();
    this.g.fillStyle = this.particleColor;
    this.g.globalAlpha = 0.7;
    this.g.arc(this.x, this.y, 1.5, 0, 2 * Math.PI);
    this.g.fill();
  }
}

class ParticleNetwork {
  container: HTMLElement;
  canvas: HTMLCanvasElement;
  g: CanvasRenderingContext2D;
  options: ParticleOptions;
  particles: Particle[] = [];
  interactiveParticle?: Particle;
  animationId?: number;
  resizeTimeout?: NodeJS.Timeout;

  constructor(container: HTMLElement, options: Partial<ParticleOptions> = {}) {
    this.container = container;
    this.options = {
      particleColor: options.particleColor || '#fff',
      background: options.background || '#1a252f',
      interactive: options.interactive !== false,
      velocity: this.setVelocity(options.velocity),
      density: this.setDensity(options.density),
    };

    this.canvas = document.createElement('canvas');
    this.g = this.canvas.getContext('2d')!;

    this.init();
  }

  private setVelocity(speed?: number): number {
    if (speed === 1) return 1; // fast
    if (speed === 0.33) return 0.33; // slow
    if (speed === 0) return 0; // none
    return 0.66; // medium
  }

  private setDensity(density?: number): number {
    if (density === 5000) return 5000; // high
    if (density === 20000) return 20000; // low
    if (typeof density === 'number') return density;
    return 10000; // medium
  }

  private setStyles(element: HTMLElement, styles: Record<string, string>) {
    Object.assign(element.style, styles);
  }

  init() {
    // Setup container background
    if (/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(this.options.background)) {
      this.setStyles(this.container, {
        background: this.options.background,
        position: 'relative',
      });
    } else if (/\.(gif|jpg|jpeg|tiff|png)$/i.test(this.options.background)) {
      this.setStyles(this.container, {
        background: `url("${this.options.background}") no-repeat center`,
        backgroundSize: 'cover',
        position: 'relative',
      });
    } else {
      this.setStyles(this.container, {
        position: 'relative',
      });
    }

    // Setup canvas
    this.canvas.width = this.container.offsetWidth || window.innerWidth;
    this.canvas.height = this.container.offsetHeight || window.innerHeight;

    this.setStyles(this.canvas, {
      position: 'absolute',
      top: '0',
      left: '0',
      zIndex: '20',
    });

    this.container.appendChild(this.canvas);

    // Create particles
    const particleCount = Math.floor(
      (this.canvas.width * this.canvas.height) / this.options.density
    );

    for (let i = 0; i < particleCount; i++) {
      this.particles.push(new Particle(this));
    }

    // Setup interactive particle
    if (this.options.interactive) {
      this.interactiveParticle = new Particle(this);
      this.interactiveParticle.velocity = { x: 0, y: 0 };
      this.particles.push(this.interactiveParticle);

      this.canvas.addEventListener('mousemove', e => {
        if (this.interactiveParticle) {
          const rect = this.canvas.getBoundingClientRect();
          this.interactiveParticle.x = e.clientX - rect.left;
          this.interactiveParticle.y = e.clientY - rect.top;
        }
      });

      this.canvas.addEventListener('mouseup', () => {
        if (this.interactiveParticle) {
          this.interactiveParticle.velocity = {
            x: (Math.random() - 0.5) * this.options.velocity,
            y: (Math.random() - 0.5) * this.options.velocity,
          };
          this.interactiveParticle = new Particle(this);
          this.interactiveParticle.velocity = { x: 0, y: 0 };
          this.particles.push(this.interactiveParticle);
        }
      });
    }

    // Setup resize handler
    const handleResize = () => {
      if (
        this.container.offsetWidth === this.canvas.width &&
        this.container.offsetHeight === this.canvas.height
      ) {
        return;
      }

      this.canvas.width = this.container.offsetWidth || window.innerWidth;
      this.canvas.height = this.container.offsetHeight || window.innerHeight;

      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => {
        this.particles = [];
        const particleCount = Math.floor(
          (this.canvas.width * this.canvas.height) / this.options.density
        );

        for (let i = 0; i < particleCount; i++) {
          this.particles.push(new Particle(this));
        }

        if (this.options.interactive && this.interactiveParticle) {
          this.particles.push(this.interactiveParticle);
        }

        if (this.options.velocity !== 0) {
          this.animate();
        }
      }, 500);
    };

    window.addEventListener('resize', handleResize);

    // Start animation
    if (this.options.velocity !== 0) {
      this.animate();
    }
  }

  animate = () => {
    this.g.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.g.globalAlpha = 1;

    // Update and draw particles
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].update();
      this.particles[i].draw();

      // Draw connections between particles
      for (let j = this.particles.length - 1; j > i; j--) {
        const distance = Math.sqrt(
          Math.pow(this.particles[i].x - this.particles[j].x, 2) +
            Math.pow(this.particles[i].y - this.particles[j].y, 2)
        );

        if (distance <= 120) {
          this.g.beginPath();
          this.g.strokeStyle = this.options.particleColor;
          this.g.globalAlpha = (120 - distance) / 120;
          this.g.lineWidth = 0.7;
          this.g.moveTo(this.particles[i].x, this.particles[i].y);
          this.g.lineTo(this.particles[j].x, this.particles[j].y);
          this.g.stroke();
        }
      }
    }

    if (this.options.velocity !== 0) {
      this.animationId = requestAnimationFrame(this.animate);
    }
  };

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
    window.removeEventListener('resize', () => {});
    if (this.canvas && this.container.contains(this.canvas)) {
      this.container.removeChild(this.canvas);
    }
  }
}

export default function ParticleNetworkComponent({
  className = '',
  particleColor = '#888',
  background = 'transparent',
  interactive = true,
  speed = 'medium',
  density = 'high',
}: ParticleNetworkProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const networkRef = useRef<ParticleNetwork | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const velocityMap = {
      slow: 0.33,
      medium: 0.66,
      fast: 1,
      none: 0,
    };

    const densityMap = {
      low: 20000,
      medium: 10000,
      high: 5000,
    };

    networkRef.current = new ParticleNetwork(containerRef.current, {
      particleColor,
      background: background === 'transparent' ? 'transparent' : background,
      interactive,
      velocity: velocityMap[speed],
      density: typeof density === 'number' ? density : densityMap[density],
    });

    return () => {
      if (networkRef.current) {
        networkRef.current.destroy();
      }
    };
  }, [particleColor, background, interactive, speed, density]);

  return (
    <div
      ref={containerRef}
      className={`h-full w-full ${className}`}
      style={{
        minHeight: '100vh',
      }}
    />
  );
}
