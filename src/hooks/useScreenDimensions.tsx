
import { useState, useEffect } from 'react';

interface ScreenDimensions {
  width: number;
  height: number;
  isSmallScreen: boolean;
  isMediumScreen: boolean;
  isLargeScreen: boolean;
  isPortrait: boolean;
  isLandscape: boolean;
  safeAreaTop: number;
  safeAreaBottom: number;
}

export const useScreenDimensions = (): ScreenDimensions => {
  const [dimensions, setDimensions] = useState<ScreenDimensions>(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    return {
      width,
      height,
      isSmallScreen: width < 640,
      isMediumScreen: width >= 640 && width < 1024,
      isLargeScreen: width >= 1024,
      isPortrait: height > width,
      isLandscape: width > height,
      safeAreaTop: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--safe-area-inset-top') || '0'),
      safeAreaBottom: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--safe-area-inset-bottom') || '0')
    };
  });

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setDimensions({
        width,
        height,
        isSmallScreen: width < 640,
        isMediumScreen: width >= 640 && width < 1024,
        isLargeScreen: width >= 1024,
        isPortrait: height > width,
        isLandscape: width > height,
        safeAreaTop: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--safe-area-inset-top') || '0'),
        safeAreaBottom: parseInt(getComputedStyle(document.documentElement).getPropertyValue('--safe-area-inset-bottom') || '0')
      });
    };

    window.addEventListener('resize', updateDimensions);
    window.addEventListener('orientationchange', updateDimensions);

    // Initial call
    updateDimensions();

    return () => {
      window.removeEventListener('resize', updateDimensions);
      window.removeEventListener('orientationchange', updateDimensions);
    };
  }, []);

  return dimensions;
};
