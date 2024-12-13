import { useEffect, useRef, useState, TouchEvent } from 'react';

interface UseHorizontalScrollProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  totalSections: number;
}

const UseHorizontalScroll = ({ containerRef, totalSections }: UseHorizontalScrollProps) => {
  const [currentSection, setCurrentSection] = useState(0);
  const lastScrollTime = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const sectionElements = container.querySelectorAll(`.screen`);

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = Array.from(sectionElements).indexOf(entry.target as Element);
            setCurrentSection(index);
          }
        });
      },
      { threshold: 0.5 }
    );

    sectionElements.forEach(section => observer.observe(section));

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      const now = Date.now();
      if (now - lastScrollTime.current < 1000) return;

      let direction = 0;

      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        direction = e.deltaY > 0 ? 1 : -1;
      } else {
        direction = e.deltaX > 0 ? 1 : -1;
      }

      setCurrentSection(prev => {
        const next = prev + direction;
        if (next >= 0 && next < totalSections) {
          lastScrollTime.current = now;
          return next;
        }
        return prev;
      });
    };

    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].clientX;
      const touchDiff = touchStartX - touchEndX;

      const now = Date.now();
      if (now - lastScrollTime.current < 1000) return;

      if (Math.abs(touchDiff) > 50) { // Adjust this threshold as needed
        const direction = touchDiff > 0 ? 1 : -1;
        setCurrentSection(prev => {
          const next = prev + direction;
          if (next >= 0 && next < totalSections) {
            lastScrollTime.current = now;
            return next;
          }
          return prev;
        });
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouchStart as any);
    container.addEventListener('touchend', handleTouchEnd as any);

    return () => {
      sectionElements.forEach(section => observer.unobserve(section));
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart as any);
      container.removeEventListener('touchend', handleTouchEnd as any);
    };
  }, [containerRef, totalSections]);

  return currentSection;
};

export default UseHorizontalScroll;
