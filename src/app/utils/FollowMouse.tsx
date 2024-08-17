import React from 'react';

interface FollowMouseProps {
  areaRef: React.RefObject<HTMLDivElement | null>;
  affectedElements: string;
}

export const FollowMouse = ({ areaRef, affectedElements }: FollowMouseProps) => {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const area = areaRef.current;
    if (area) {
      const width = area.clientWidth;
      const height = area.clientHeight;

      const titles = document.querySelectorAll<HTMLElement>(affectedElements);

      titles.forEach(title => {
        const speed = title.getAttribute('data-speed');
        if (speed !== null) {
          const x = (e.nativeEvent.offsetX / width) * Number(speed);
          const y = (e.nativeEvent.offsetY / height) * Number(speed);
          title.style.transform = `translateX(${x}%) translateY(${y}%)`;
        }
      });
    }
  };

  const handleMouseLeave = () => {
    const titles = document.querySelectorAll<HTMLElement>(affectedElements);
    titles.forEach(title => {
      title.style.transform = 'translateX(0) translateY(0)';
    });
  };

  return { handleMouseMove, handleMouseLeave };
};