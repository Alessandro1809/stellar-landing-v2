"use client";

import { cn } from "@/lib/utils";
import React, {
  type ComponentPropsWithoutRef,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { useMotionValue, animate as motionAnimate, motion } from "motion/react";

interface MousePosition {
  x: number;
  y: number;
}

function MousePosition(): MousePosition {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return mousePosition;
}

interface ParticlesProps extends ComponentPropsWithoutRef<"div"> {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  size?: number;
  refresh?: boolean;
  color?: string;
  vx?: number;
  vy?: number;
}

function hexToRgb(hex: string): number[] {
  hex = hex.replace("#", "");

  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  const hexInt = parseInt(hex, 16);
  const red = (hexInt >> 16) & 255;
  const green = (hexInt >> 8) & 255;
  const blue = hexInt & 255;
  return [red, green, blue];
}

interface Circle {
  x: number;
  y: number;
  translateX: number;
  translateY: number;
  size: number;
  alpha: number;
  targetAlpha: number;
  dx: number;
  dy: number;
  magnetism: number;
}

export const Particles: React.FC<ParticlesProps> = ({
  className = "",
  quantity = 50,
  staticity = 50,
  ease = 50,
  size = 0.4,
  refresh = false,
  color = "#ffffff",
  vx = 0,
  vy = 0,
  ...props
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const circles = useRef<Circle[]>([]);
  const mousePosition = MousePosition();
  const mouseMotionValue = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };
  const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;
  const rafID = useRef<number | null>(null);
  const resizeTimeout = useRef<NodeJS.Timeout | null>(null);

  const checkMobile = useCallback(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [checkMobile]);

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isMobile) return; // No actualizar en móvil
      
      const x = e.clientX;
      const y = e.clientY;
      
      motionAnimate(mouseMotionValue.x, x, {
        type: "spring",
        stiffness: ease,
        damping: 30,
        mass: 0.5,
      });
      motionAnimate(mouseMotionValue.y, y, {
        type: "spring",
        stiffness: ease,
        damping: 30,
        mass: 0.5,
      });
    },
    [ease, isMobile]
  );

  const createCircles = useCallback(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const centerX = screenWidth / 2;
    const centerY = screenHeight / 2;

    circles.current = [...Array(isMobile ? Math.floor(quantity / 2) : quantity)].map(() => {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * Math.min(screenWidth, screenHeight) * 0.5;
      return {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
        translateX: 0,
        translateY: 0,
        size: Math.random() * 2,
        alpha: 0,
        targetAlpha: parseFloat((Math.random() * 0.6 + 0.1).toFixed(1)),
        dx: (Math.random() - 0.5) * 0.1,
        dy: (Math.random() - 0.5) * 0.1,
        magnetism: 0.1 + Math.random() * 4,
      };
    });
  }, [quantity, isMobile]);

  const drawCircles = useCallback(() => {
    if (!context.current || !canvasRef.current) return;

    context.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    context.current.globalAlpha = 1;

    circles.current.forEach((circle: Circle) => {
      const { x, y, translateX, translateY, size, alpha } = circle;
      context.current!.translate(translateX, translateY);
      context.current!.beginPath();
      context.current!.arc(x, y, size, 0, 2 * Math.PI);
      context.current!.fillStyle = color;
      context.current!.globalAlpha = alpha;
      context.current!.fill();
      context.current!.setTransform(1, 0, 0, 1, 0, 0);
    });
  }, [color]);

  const animateParticles = useCallback(() => {
    circles.current.forEach((circle: Circle) => {
      if (!isMobile) {
        const dx = mousePosition.x - circle.x;
        const dy = mousePosition.y - circle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const minDistance = Math.min(200, window.innerWidth * 0.3);

        if (distance < minDistance) {
          const angle = Math.atan2(dy, dx);
          const force = (minDistance - distance) / minDistance;
          const translateX = Math.cos(angle) * force * staticity;
          const translateY = Math.sin(angle) * force * staticity;

          circle.translateX += translateX;
          circle.translateY += translateY;

          circle.translateX *= 0.95;
          circle.translateY *= 0.95;
        }
      }

      circle.alpha += (circle.targetAlpha - circle.alpha) * 0.1;
      circle.x += circle.dx + vx;
      circle.y += circle.dy + vy;
    });

    drawCircles();
    requestAnimationFrame(animateParticles);
  }, [drawCircles, isMobile, staticity, vx, vy]);

  useEffect(() => {
    if (!canvasRef.current || hasInitialized) return;
    context.current = canvasRef.current.getContext("2d");

    const handleResize = () => {
      if (!canvasRef.current) return;
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
    };

    const setup = () => {
      handleResize();
      window.addEventListener("resize", handleResize);
      window.addEventListener("mousemove", onMouseMove);
      createCircles();
      animateParticles();
      setHasInitialized(true);
    };

    setup();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [animateParticles, createCircles, onMouseMove, hasInitialized]);

  useEffect(() => {
    if (!refresh || !hasInitialized) return;
    createCircles();
  }, [refresh, createCircles, hasInitialized]);

  return (
    <div
      className={cn("pointer-events-none", className)}
      ref={canvasContainerRef}
      aria-hidden="true"
      {...props}
    >
      <canvas ref={canvasRef} className="size-full" />
    </div>
  );
};
