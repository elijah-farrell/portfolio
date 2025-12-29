import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { cn } from "@/lib/utils";
import { dismissToast } from "@/lib/toast";

export interface Toast {
  id: string;
  title: string;
  description?: string;
  variant?: "default" | "destructive";
  duration?: number | typeof Infinity;
  actionUrl?: string;
  actionLabel?: string;
}

interface ToastContainerProps {
  toasts: Toast[];
  onDismiss: (id: string) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 top-auto left-auto z-[9999] flex flex-col gap-3 max-w-md w-full pointer-events-none" style={{ position: 'fixed' }}>
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onDismiss={() => onDismiss(toast.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

interface ToastItemProps {
  toast: Toast;
  onDismiss: () => void;
}

const ToastItem = React.forwardRef<HTMLDivElement, ToastItemProps>(
  ({ toast: toastItem, onDismiss }, ref) => {
    useEffect(() => {
      if (toastItem.duration === Infinity) {
        return; // Never auto-dismiss
      }

      const duration = toastItem.duration || 5000; // Default 5 seconds
      const timeout = setTimeout(() => {
        // Wait for exit animation before calling onDismiss
        setTimeout(onDismiss, 300);
      }, duration);

      return () => clearTimeout(timeout);
    }, [toastItem.duration, onDismiss]);

    const isDestructive = toastItem.variant === "destructive";

    return (
      <motion.div
        ref={ref}
        layout
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ 
          opacity: 0, 
          x: 300,
          scale: 0.95,
          transition: {
            duration: 0.2,
            ease: "easeIn"
          }
        }}
        transition={{ 
          type: "spring",
          stiffness: 300,
          damping: 30,
          mass: 0.8
        }}
        className={cn(
          "pointer-events-auto rounded-lg shadow-lg border backdrop-blur-sm",
          "bg-white dark:bg-[#0a0a0a]",
          "border-neutral-200 dark:border-neutral-800",
          "text-neutral-900 dark:text-white",
          isDestructive && "border-red-200 dark:border-red-900/50"
        )}
        style={{
          backgroundColor: isDestructive
            ? undefined
            : "var(--background)",
          color: "var(--text)",
          position: "relative",
        }}
      >
       <div className="flex items-start gap-3 p-5">
         {/* Icon */}
         <div
           className={cn(
             "flex-shrink-0 mt-0.5",
             isDestructive
               ? "text-red-500 dark:text-red-400"
               : "text-emerald-500 dark:text-emerald-400"
           )}
         >
           {isDestructive ? (
             <FiAlertCircle className="w-6 h-6" />
           ) : (
             <FiCheckCircle className="w-6 h-6" />
           )}
         </div>

         {/* Content */}
         <div className="flex-1 min-w-0 flex flex-col gap-2 pr-2">
           <div
             className={cn(
               "font-medium text-base",
               "text-neutral-900 dark:text-white"
             )}
             style={{ color: "var(--text)" }}
           >
             {toastItem.title}
           </div>
           {toastItem.description && (
             <div
               className={cn(
                 "text-sm leading-relaxed",
                 "text-neutral-600 dark:text-neutral-400"
               )}
             >
               {toastItem.description}
             </div>
           )}
           {/* Action Button (if provided) */}
           {toastItem.actionUrl && toastItem.actionLabel && (
             <div className="mt-1">
               <a
                 href={toastItem.actionUrl}
                 target="_blank"
                 rel="noopener noreferrer"
                 onClick={() => {
                   // Dismiss toast after a short delay when action is clicked
                   setTimeout(() => {
                     setTimeout(onDismiss, 300);
                   }, 200);
                 }}
                 className={cn(
                   "inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md",
                   "bg-emerald-500 dark:bg-emerald-600 text-white",
                   "hover:bg-emerald-600 dark:hover:bg-emerald-500",
                   "transition-colors duration-150",
                   "focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2",
                   "dark:focus:ring-offset-neutral-900"
                 )}
               >
                 {toastItem.actionLabel}
               </a>
             </div>
           )}
         </div>

         {/* Close Button */}
         <button
           onClick={() => {
             setTimeout(onDismiss, 300);
           }}
           className={cn(
             "flex-shrink-0 -mt-1 p-1 rounded-md",
             "text-neutral-400 dark:text-neutral-500",
             "hover:text-neutral-600 dark:hover:text-neutral-300",
             "hover:bg-neutral-100 dark:hover:bg-neutral-800",
             "transition-colors duration-150"
           )}
           aria-label="Dismiss"
         >
           <FiX className="w-4 h-4" />
         </button>
       </div>

      {/* Progress bar for auto-dismiss */}
      {toastItem.duration !== Infinity && toastItem.duration && (
        <motion.div
          className={cn(
            "h-1 rounded-b-lg",
            isDestructive
              ? "bg-red-500 dark:bg-red-400"
              : "bg-emerald-500 dark:bg-emerald-400"
          )}
          initial={{ width: "100%" }}
          animate={{ width: "0%" }}
          transition={{
            duration: (toastItem.duration || 5000) / 1000,
            ease: "linear",
          }}
        />
      )}
      </motion.div>
    );
  }
);

ToastItem.displayName = "ToastItem";

