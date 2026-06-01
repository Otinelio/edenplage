import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Waves } from "lucide-react";

export function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if the splash screen has been shown in this session
    const hasSeenSplash = sessionStorage.getItem("eden_plage_splash_seen");
    
    if (hasSeenSplash) {
      setIsVisible(false);
      return;
    }

    const timer = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem("eden_plage_splash_seen", "true");
    }, 2800);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--ocean)] text-[var(--seafoam)]"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <motion.div
              animate={{ 
                y: [0, -12, 0],
              }}
              transition={{ 
                duration: 2.5, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="mb-8 relative"
            >
              <Waves size={72} strokeWidth={1.5} className="text-[var(--turquoise)]" />
              <motion.div 
                className="absolute inset-0 text-[var(--coral)] opacity-40 blur-sm"
                animate={{ 
                  y: [0, 8, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                <Waves size={72} strokeWidth={1.5} />
              </motion.div>
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-heading)] font-bold tracking-widest mb-4">
              EDEN PLAGE
            </h1>
            
            <div className="relative w-64 h-px mb-6 overflow-hidden">
              <motion.div 
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--coral)] to-transparent"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--sand)] to-transparent opacity-20" />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-xs md:text-sm uppercase tracking-[0.3em] text-[var(--sand)] font-[family-name:var(--font-body)] font-medium"
            >
              Le paradis au bord de la mer
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
