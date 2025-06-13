"use client";

import { motion, useScroll, useTransform } from "motion/react";
import {
  type ComponentPropsWithoutRef,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import { cn } from "../../lib/utils";

export interface AnimatedGridPatternProps
  extends ComponentPropsWithoutRef<"svg"> {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  strokeDasharray?: any;
  numSquares?: number;
  maxOpacity?: number;
  duration?: number;
  repeatDelay?: number;
  "class:list"?: string | string[];
}

export function AnimatedGridPattern({
  width = 50,
  height = 50,
  x = -1,
  y = -1,
  strokeDasharray = 0,
  numSquares = 50,
  className,
  maxOpacity = 0.1,
  duration = 4,
  repeatDelay = 0.5,
  ...props
}: AnimatedGridPatternProps) {
  const id = useId();
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [squares, setSquares] = useState(() => generateSquares(numSquares));
  const [isMobile, setIsMobile] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);

  // Scroll parallax setup with smooth transition
  const { scrollY } = useScroll();
  const yPos = useTransform(scrollY, [0, 600], [0, isMobile ? 0 : -150]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  function getPos() {
    return [
      Math.floor((Math.random() * dimensions.width) / width),
      Math.floor((Math.random() * dimensions.height) / height),
    ];
  }

  function generateSquares(count: number) {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      pos: getPos(),
    }));
  }

  const updateSquarePosition = (id: number) => {
    if (isMobile) return; // No actualizar posiciones en móvil
    setSquares((currentSquares) =>
      currentSquares.map((sq) =>
        sq.id === id
          ? {
              ...sq,
              pos: getPos(),
            }
          : sq,
      ),
    );
  };

  // Persist squares state between page transitions
  useEffect(() => {
    const savedSquares = squares;
    return () => {
      setSquares(savedSquares);
    };
  }, []);

  useEffect(() => {
    if (dimensions.width && dimensions.height && !hasInitialized) {
      setSquares(generateSquares(isMobile ? Math.floor(numSquares / 2) : numSquares));
      setHasInitialized(true);
    }
  }, [dimensions, numSquares, isMobile, hasInitialized]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, [containerRef]);

  return (
    <motion.div
      style={{ y: yPos }}
      className="w-full h-full"
      initial={false}
      transition={{ 
        y: {
          type: "spring",
          stiffness: isMobile ? 0 : 100,
          damping: isMobile ? 0 : 30,
          restDelta: 0.001
        }
      }}
    >
      <svg
        ref={containerRef}
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 h-full w-full fill-gray-400/10 stroke-gray-400/10",
          props["class:list"]
        )}
        {...props}
      >
        <defs>
          <pattern
            id={id}
            width={width}
            height={height}
            patternUnits="userSpaceOnUse"
            x={x}
            y={y}
          >
            <path
              d={`M.5 ${height}V.5H${width}`}
              fill="none"
              strokeDasharray={strokeDasharray}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(({ pos: [x, y], id }, index) => (
            <motion.rect
              initial={{ opacity: 0 }}
              animate={{ opacity: maxOpacity }}
              transition={{
                duration: isMobile ? duration * 2 : duration,
                repeat: isMobile ? 0 : 1,
                delay: index * (isMobile ? 0.05 : 0.1),
                repeatType: "reverse",
              }}
              onAnimationComplete={() => updateSquarePosition(id)}
              key={`${x}-${y}-${index}`}
              width={width - 1}
              height={height - 1}
              x={x * width + 1}
              y={y * height + 1}
              fill="#4F7CEC"
              strokeWidth="0"
            />
          ))}
        </svg>
      </svg>
    </motion.div>
  );
}