
import React from 'react';

const useCometTrail = () => {
  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const trail = document.createElement('div');
      trail.className = 'comet-trail';
      
      const size = Math.random() * 8 + 2;
      trail.style.width = `${size}px`;
      trail.style.height = `${size}px`;
      
      trail.style.left = `${e.pageX}px`;
      trail.style.top = `${e.pageY}px`;
      
      document.body.appendChild(trail);
      
      setTimeout(() => {
        trail.remove();
      }, 500);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
};

export default useCometTrail;
