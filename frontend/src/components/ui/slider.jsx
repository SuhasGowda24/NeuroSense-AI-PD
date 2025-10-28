import * as React from "react"
import { cn } from "../../utils/cn"

const Slider = React.forwardRef(({ 
  className, 
  value = [0], 
  onValueChange,
  max = 100,
  min = 0,
  step = 1,
  disabled = false,
  ...props 
}, ref) => {
  const [localValue, setLocalValue] = React.useState(value[0] || 0);
  const sliderRef = React.useRef(null);

  React.useEffect(() => {
    if (value && value[0] !== undefined) {
      setLocalValue(value[0]);
    }
  }, [value]);

  const handleMouseDown = (e) => {
    if (disabled) return;
    const updateValue = (clientX) => {
      const slider = sliderRef.current;
      if (!slider) return;

      const rect = slider.getBoundingClientRect();
      const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const rawValue = min + percentage * (max - min);
      const steppedValue = Math.round(rawValue / step) * step;
      const clampedValue = Math.max(min, Math.min(max, steppedValue));

      setLocalValue(clampedValue);
      if (onValueChange) {
        onValueChange([clampedValue]);
      }
    };

    const handleMouseMove = (e) => updateValue(e.clientX);
    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    updateValue(e.clientX);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const percentage = ((localValue - min) / (max - min)) * 100;

  return (
    <div
      ref={sliderRef}
      className={cn(
        "relative flex w-full touch-none select-none items-center cursor-pointer",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      onMouseDown={handleMouseDown}
      {...props}
    >
      <div className="relative h-2 w-full grow overflow-hidden rounded-full bg-gray-200">
        <div
          className="absolute h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-150"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div
        className="absolute block h-5 w-5 rounded-full border-2 border-blue-600 bg-white shadow-lg transition-all duration-150"
        style={{ left: `calc(${percentage}% - 10px)` }}
      />
    </div>
  );
});

Slider.displayName = "Slider"

export { Slider }