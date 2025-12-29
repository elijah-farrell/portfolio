import * as React from "react";
import { cn } from "@/lib/utils";

interface SelectContextValue {
  value: string;
  onValueChange?: (value: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  selectId: string;
}

const SelectContext = React.createContext<SelectContextValue | null>(null);

// Global state to track which select is open (only one at a time)
let openSelectId: string | null = null;
const selectListeners: Array<(id: string | null) => void> = [];

function setOpenSelect(id: string | null) {
  openSelectId = id;
  selectListeners.forEach((listener) => listener(id));
}

function subscribeToOpenSelect(listener: (id: string | null) => void) {
  selectListeners.push(listener);
  return () => {
    const index = selectListeners.indexOf(listener);
    if (index > -1) {
      selectListeners.splice(index, 1);
    }
  };
}

interface SelectProps {
  value: string;
  name?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}

export function Select({ value, onValueChange, children }: SelectProps) {
  const selectId = React.useId();
  const [open, setOpenLocal] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const unsubscribe = subscribeToOpenSelect((openId) => {
      setOpenLocal(openId === selectId);
    });

    // Set initial state
    setOpenLocal(openSelectId === selectId);

    return unsubscribe;
  }, [selectId]);

  // Close on outside click
  React.useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpenSelect(null);
      }
    };

    // Use setTimeout to avoid immediate closure when opening
    const timeout = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(timeout);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const setOpen = React.useCallback(
    (isOpen: boolean) => {
      if (isOpen) {
        // Close all other selects
        setOpenSelect(selectId);
      } else {
        setOpenSelect(null);
      }
    },
    [selectId]
  );

  return (
    <SelectContext.Provider
      value={{ value, onValueChange, open, setOpen, selectId }}
    >
      <div className="relative" ref={containerRef}>
        {children}
      </div>
    </SelectContext.Provider>
  );
}

type SelectTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const SelectTrigger = React.forwardRef<
  HTMLButtonElement,
  SelectTriggerProps
>(({ className, children, ...props }, ref) => {
  const ctx = React.useContext(SelectContext);
  if (!ctx) throw new Error("SelectTrigger must be used within Select");

  return (
    <button
      type="button"
      ref={ref}
      onClick={() => ctx.setOpen(!ctx.open)}
      className={cn(
        "flex w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm text-left",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2",
        "hover:border-emerald-400 dark:hover:border-emerald-600 transition-colors",
        className
      )}
      {...props}
    >
      <span className="flex-1 text-left min-w-0">{children}</span>
      <svg
        className={cn(
          "h-4 w-4 text-gray-500 dark:text-neutral-400 transition-transform duration-200 flex-shrink-0 ml-2",
          ctx.open && "rotate-180"
        )}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>
  );
});

SelectTrigger.displayName = "SelectTrigger";

interface SelectValueProps {
  placeholder?: string;
}

export function SelectValue({ placeholder }: SelectValueProps) {
  const ctx = React.useContext(SelectContext);
  if (!ctx) throw new Error("SelectValue must be used within Select");

  return (
    <span className={cn(
      "text-left",
      !ctx.value && "text-gray-400 dark:text-neutral-500"
    )}>
      {ctx.value || placeholder}
    </span>
  );
}

interface SelectContentProps {
  children: React.ReactNode;
  className?: string;
}

export function SelectContent({ children, className }: SelectContentProps) {
  const ctx = React.useContext(SelectContext);
  if (!ctx) throw new Error("SelectContent must be used within Select");

  if (!ctx.open) return null;

  return (
    <div
      className={cn(
        "absolute z-50 mt-1 w-full rounded-md border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-lg",
        "max-h-64 overflow-auto py-1",
        className
      )}
    >
      {children}
    </div>
  );
}

type SelectItemProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  value: string;
};

export const SelectItem = React.forwardRef<HTMLButtonElement, SelectItemProps>(
  ({ value, className, children, ...props }, ref) => {
    const ctx = React.useContext(SelectContext);
    if (!ctx) throw new Error("SelectItem must be used within Select");

    const handleClick = () => {
      ctx.onValueChange?.(value);
      ctx.setOpen(false);
    };

    const isSelected = ctx.value === value;

    return (
      <button
        type="button"
        ref={ref}
        onClick={handleClick}
        className={cn(
          "w-full text-left px-3 py-2 text-sm text-gray-900 dark:text-white",
          "hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-600 dark:hover:text-emerald-400",
          "cursor-pointer transition-colors duration-150",
          isSelected && "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 font-medium",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

SelectItem.displayName = "SelectItem";


