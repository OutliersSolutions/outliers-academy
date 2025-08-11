import { useRef, useEffect, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export interface MouseParallaxProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export const MouseParallax = ({ children, className = "", strength = 0.01 }: MouseParallaxProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 25, damping: 20 });
  const springY = useSpring(y, { stiffness: 25, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const offsetX = (e.clientX - centerX) * strength;
      const offsetY = (e.clientY - centerY) * strength;

      x.set(offsetX);
      y.set(offsetY);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength, x, y]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        x: springX,
        y: springY,
        willChange: "transform",
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </motion.div>
  );
};
