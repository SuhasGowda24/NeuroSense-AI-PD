import * as React from "react";
import { ChevronDown } from "lucide-react";

const Select = ({ children, value, onValueChange }) => {
  const [open, setOpen] = React.useState(false);

  // Wrap trigger and content together for correct positioning
  return (
    <div className="relative w-full">
      {React.Children.map(children, (child) => {
        if (child.type.displayName === "SelectTrigger") {
          return React.cloneElement(child, { value, setOpen, open });
        }
        if (child.type.displayName === "SelectContent" && open) {
          return React.cloneElement(child, { onValueChange, setOpen });
        }
        return null;
      })}
    </div>
  );
};

const SelectTrigger = React.forwardRef(
  ({ className, children, setOpen, open, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={`flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 ${className || ""}`}
      onClick={() => setOpen(!open)}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 opacity-50 ml-2" />
    </button>
  )
);
SelectTrigger.displayName = "SelectTrigger";

const SelectValue = ({ placeholder, children }) => (
  <span>{children || placeholder}</span>
);

const SelectContent = ({ children, onValueChange, setOpen }) => (
  <div className="absolute left-0 right-0 mt-1 rounded-md border border-gray-200 bg-white shadow-lg z-50">
    {React.Children.map(children, (child) => {
      if (child.type.displayName === "SelectItem") {
        return React.cloneElement(child, { onValueChange, setOpen });
      }
      return child;
    })}
  </div>
);
SelectContent.displayName = "SelectContent";

const SelectItem = ({ value, children, onValueChange, setOpen }) => (
  <div
    className="cursor-pointer px-3 py-2 text-sm text-gray-700 hover:bg-teal-50 rounded-md"
    onClick={() => {
      onValueChange?.(value);
      setOpen(false);
    }}
  >
    {children}
  </div>
);
SelectItem.displayName = "SelectItem";

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };
