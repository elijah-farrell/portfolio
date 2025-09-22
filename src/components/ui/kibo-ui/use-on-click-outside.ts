import { useEffect, RefObject } from 'react';

export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: MouseEvent | TouchEvent) => void,
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref?.current;
      if (!el || el.contains((event?.target as Node) || null)) {
        return;
      }

      const target = event.target as HTMLElement;
      
      // Don't close modal if clicking on an iframe (like Cal.com widget)
      if (target.tagName === 'IFRAME' || target.closest('iframe')) {
        return;
      }

      // Don't close modal if clicking on any Radix UI elements
      if (target.closest('[data-radix]') || 
          target.hasAttribute('data-radix') ||
          target.closest('[role="combobox"]') ||
          target.closest('[role="listbox"]') ||
          target.closest('[aria-expanded]') ||
          target.closest('[data-state]') ||
          target.closest('[data-radix-select-content]') ||
          target.closest('[data-radix-popper-content-wrapper]')) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}
