import { useState, useEffect } from 'react';

// the following method is used to to mobile screen rezing
const useResize = (
  smallMin = 320,
  smallMax = 480,
  tabletMin = 481,
  tabletMax = 767,
  minWidth = 768,
  maxWidth = 1024
) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isMediumScreen, setIsMediumScreen] = useState(false);
  const [isExtraSmallScreen, setIsExtraSmallScreen] = useState(false);
  const [isTabletScreen, setIsTabletScreen] = useState(false);

  // the following method is used window rezing and update state based on screen width
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= tabletMax);
      setIsMediumScreen(window.innerWidth >= minWidth && window.innerWidth <= maxWidth);
      setIsExtraSmallScreen(window.innerWidth >= smallMin && window.innerWidth <= smallMax);
      setIsTabletScreen(window.innerWidth >= tabletMin && window.innerWidth <= tabletMax);
    };
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [smallMin, smallMax, tabletMin, tabletMax, minWidth, maxWidth]);

  return { isSmallScreen, isMediumScreen, isExtraSmallScreen, isTabletScreen };
};
export { useResize };
