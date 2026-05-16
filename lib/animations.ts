export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6, 
      ease: [0.16, 1, 0.3, 1] as any
    } 
  },
};

export const stagger = {
  visible: { 
    transition: { 
      staggerChildren: 0.08 
    } 
  },
};

export const slideIn = {
  hidden: { opacity: 0, x: -24 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { 
      duration: 0.5, 
      ease: [0.16, 1, 0.3, 1] as any
    } 
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { 
      duration: 0.4, 
      ease: [0.16, 1, 0.3, 1] as any
    } 
  },
};

export const pageTransition = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
  transition: { duration: 0.35, ease: "easeInOut" },
};
