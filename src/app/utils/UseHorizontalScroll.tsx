import { useEffect, useRef, useState } from 'react';

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
      { threshold: 1.0 }
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

    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      sectionElements.forEach(section => observer.unobserve(section));
      container.removeEventListener('wheel', handleWheel);
    };
  }, [containerRef, totalSections]);

  return currentSection;
};

export default UseHorizontalScroll;