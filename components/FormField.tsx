import React, { useRef } from 'react';

interface FormFieldProps {
  label: string;
  // FIX: Explicitly type `children` to be a React element that accepts a `className` prop.
  // This resolves TypeScript errors when trying to clone the element and access its className.
  children: React.ReactElement<{ className?: string }>;
}

const FormField: React.FC<FormFieldProps> = ({ label, children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const handleHover = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    // Create and animate multiple particles
    for (let i = 0; i < 3; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute rounded-full pointer-events-none';
        
        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = `hsl(${Math.random() * 60 + 170}, 100%, 70%)`; // Shades of cyan/teal

        // Position at the cursor relative to the container
        const rect = container.getBoundingClientRect();
        particle.style.left = `${e.clientX - rect.left}px`;
        particle.style.top = `${e.clientY - rect.top}px`;
        
        particle.style.animation = `particle-ripple ${Math.random() * 300 + 400}ms ease-out forwards`;
        
        container.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 700);
    }
  };

  const childWithProps = React.cloneElement(children, {
    className: `${children.props.className || ''} w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all`
  });

  return (
    <div 
        ref={containerRef}
        className="relative space-y-2"
        onMouseEnter={handleHover}
    >
      <label className="text-sm font-semibold text-gray-300">{label}</label>
      {childWithProps}
    </div>
  );
};

export default FormField;
