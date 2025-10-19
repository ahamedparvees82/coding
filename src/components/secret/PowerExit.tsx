import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
interface PowerExitProps {
  onExit?: () => void;
}
const PowerExit: React.FC<PowerExitProps> = ({
  onExit
}) => {
  const navigate = useNavigate();
  const [isTriggered, setIsTriggered] = useState(false);
  const [spacePressed, setSpacePressed] = useState(false);
  const [pressDuration, setPressDuration] = useState(0);
  useEffect(() => {
    let pressTimer: NodeJS.Timeout | null = null;
    let animationFrame: number | null = null;
    let startTime = 0;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !spacePressed) {
        e.preventDefault();
        setSpacePressed(true);
        startTime = Date.now();
        // Start a timer to track long press
        pressTimer = setTimeout(() => {
          setIsTriggered(true);
          setTimeout(() => handleExit(), 500);
        }, 800); // Trigger after 800ms of holding space
        // Update press duration for visual feedback
        const updatePressDuration = () => {
          const currentDuration = Date.now() - startTime;
          setPressDuration(Math.min(currentDuration / 800, 1)); // Normalize to 0-1
          if (spacePressed && currentDuration < 800) {
            animationFrame = requestAnimationFrame(updatePressDuration);
          }
        };
        animationFrame = requestAnimationFrame(updatePressDuration);
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        setSpacePressed(false);
        setPressDuration(0);
        if (pressTimer) {
          clearTimeout(pressTimer);
          pressTimer = null;
        }
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
          animationFrame = null;
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (pressTimer) clearTimeout(pressTimer);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [spacePressed]);
  const handleExit = () => {
    if (onExit) {
      onExit();
    } else {
      navigate('/settings');
    }
  };
  return <div className="relative">
      <motion.div className={`px-3 py-1.5 bg-gray-800 text-orange-500 rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-700 font-mono text-sm ${isTriggered ? 'bg-orange-500 text-black' : ''}`} whileHover={{
      scale: 1.05
    }} whileTap={{
      scale: 0.95
    }} animate={isTriggered ? {
      scale: [1, 1.2, 1]
    } : {}} onClick={handleExit}>
        &lt;&gt; &lt; Power Exit &gt;
      </motion.div>
      {spacePressed && <motion.div className="absolute bottom-0 left-0 h-1 bg-orange-500" initial={{
      width: 0
    }} animate={{
      width: `${pressDuration * 100}%`
    }} />}
    </div>;
};
export default PowerExit;