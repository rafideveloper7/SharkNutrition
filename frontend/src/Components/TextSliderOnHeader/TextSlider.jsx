// components/TextSlider.jsx
import { useState, useEffect, useRef } from 'react';

const TextSlider = () => {
  const texts = [
    "DIVE INTO AUTHENTICITY",
    "15-DAY MONEY-BACK GUARANTEE",
    "COD ALL OVER PAKISTAN"
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const intervalRef = useRef(null);

  // Auto-slide with proper sequence
  useEffect(() => {
    const startAutoSlide = () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      
      intervalRef.current = setInterval(() => {
        setIsTransitioning(true);
        
        // Move to next slide
        setCurrentIndex(prev => {
          if (prev === texts.length - 1) {
            // When we reach the end, reset to 0 for infinite loop
            return 0;
          }
          return prev + 1;
        });
      }, 3000);
    };

    startAutoSlide();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [texts.length]);

  // Optional: Handle manual navigation to maintain sequence
  const goToNext = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsTransitioning(true);
    
    setCurrentIndex(prev => {
      if (prev === texts.length - 1) {
        return 0;
      }
      return prev + 1;
    });

    // Restart auto-slide
    setTimeout(() => {
      intervalRef.current = setInterval(() => {
        setIsTransitioning(true);
        setCurrentIndex(prev => {
          if (prev === texts.length - 1) {
            return 0;
          }
          return prev + 1;
        });
      }, 3000);
    }, 700);
  };

  // Add touch support for mobile swipe (only left to right swipe allowed)
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;
    
    // Only allow left swipe (next slide)
    if (distance > minSwipeDistance) {
      goToNext();
    } else {
      // Restart auto-slide if no valid swipe
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setIsTransitioning(true);
        setCurrentIndex(prev => {
          if (prev === texts.length - 1) {
            return 0;
          }
          return prev + 1;
        });
      }, 3000);
    }
  };

  // Prevent flicker when transitioning from last to first
  const handleTransitionEnd = () => {
    // Reset any special states if needed
    setIsTransitioning(false);
  };

  return (
    <div className="w-full bg-gradient-to-r from-blue-100 to-gray-500 h-12 h-[30px] overflow-hidden sticky top-0 z-[1001]">
      {/* Slider track */}
      <div 
        className="flex h-full"
        style={{ 
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: isTransitioning ? 'transform 700ms ease-in-out' : 'none'
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTransitionEnd={handleTransitionEnd}
      >
        {texts.map((text, index) => (
          <div 
            key={index}
            className="min-w-full flex items-center justify-center"
          >
            <h3 className="text-center text-sm md:text-base lg:text-lg font-bold text-black px-4 tracking-wide">
              {text}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TextSlider;