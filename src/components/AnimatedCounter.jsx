import { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';

export default function AnimatedCounter({ value, suffix = '', duration = 2 }) {
  const countRef = useRef(null);
  const inView = useInView(countRef, { once: true, margin: "-50px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString());

  useEffect(() => {
    if (inView) {
      const controls = animate(count, value, {
        duration: duration,
        ease: [0.16, 1, 0.3, 1] // Sleek, modern cubic easing curve
      });
      return controls.stop;
    }
  }, [inView, value, duration]);

  return (
    <span ref={countRef} className="inline-flex">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}
