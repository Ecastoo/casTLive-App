
import React from 'react';

// FIX: Extend standard button attributes to allow props like 'type', 'disabled', etc.
interface NeonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color: 'cyan' | 'pink' | 'purple' | 'green' | 'yellow' | 'indigo' | 'orange' | 'red';
  // Note: onClick, className, and children are already part of ButtonHTMLAttributes
}

const NeonButton: React.FC<NeonButtonProps> = ({ color, onClick, className = '', children, ...props }) => {
  const colorClasses = {
    cyan: 'border-cyan-400 text-cyan-300 hover:bg-cyan-400/20 shadow-[0_0_15px_2px_theme(colors.cyan.400/0.5)] hover:shadow-[0_0_25px_5px_theme(colors.cyan.400/0.7)]',
    pink: 'border-pink-400 text-pink-300 hover:bg-pink-400/20 shadow-[0_0_15px_2px_theme(colors.pink.400/0.5)] hover:shadow-[0_0_25px_5px_theme(colors.pink.400/0.7)]',
    purple: 'border-purple-400 text-purple-300 hover:bg-purple-400/20 shadow-[0_0_15px_2px_theme(colors.purple.400/0.5)] hover:shadow-[0_0_25px_5px_theme(colors.purple.400/0.7)]',
    green: 'border-green-400 text-green-300 hover:bg-green-400/20 shadow-[0_0_15px_2px_theme(colors.green.400/0.5)] hover:shadow-[0_0_25px_5px_theme(colors.green.400/0.7)]',
    yellow: 'border-yellow-400 text-yellow-300 hover:bg-yellow-400/20 shadow-[0_0_15px_2px_theme(colors.yellow.400/0.5)] hover:shadow-[0_0_25px_5px_theme(colors.yellow.400/0.7)]',
    indigo: 'border-indigo-400 text-indigo-300 hover:bg-indigo-400/20 shadow-[0_0_15px_2px_theme(colors.indigo.400/0.5)] hover:shadow-[0_0_25px_5px_theme(colors.indigo.400/0.7)]',
    orange: 'border-orange-400 text-orange-300 hover:bg-orange-400/20 shadow-[0_0_15px_2px_theme(colors.orange.400/0.5)] hover:shadow-[0_0_25px_5px_theme(colors.orange.400/0.7)]',
    red: 'border-red-500 text-red-400 hover:bg-red-500/20 shadow-[0_0_15px_2px_theme(colors.red.500/0.5)] hover:shadow-[0_0_25px_5px_theme(colors.red.500/0.7)]',
  };

  const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
    circle.classList.add("ripple");

    const ripple = button.getElementsByClassName("ripple")[0];
    if (ripple) {
      ripple.remove();
    }
    button.appendChild(circle);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    createRipple(e);
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`relative overflow-hidden group font-semibold border-2 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 ${colorClasses[color]} ${className}`}
      // FIX: Spread remaining props to the button element.
      {...props}
    >
      <span className="relative z-10">{children}</span>
       <style dangerouslySetInnerHTML={{ __html: `
            .ripple {
                position: absolute;
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 600ms linear;
                background-color: currentColor;
                opacity: 0.3;
            }

            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `}} />
    </button>
  );
};

export default NeonButton;
