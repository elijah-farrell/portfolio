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

      // Check if ANY dropdown is open - if so, don't close modal
      const hasOpenDropdown = document.querySelector('[data-radix-popper-content-wrapper]') ||
                             document.querySelector('[data-radix-select-content]') ||
                             document.querySelector('[role="listbox"]') ||
                             document.querySelector('[data-radix-portal]');
      
      if (hasOpenDropdown) {
        return;
      }

      // Don't close modal if clicking on any Radix UI elements
      if (target.closest('[data-radix]') || 
          target.hasAttribute('data-radix') ||
          target.closest('[role="combobox"]') ||
          target.closest('[role="listbox"]') ||
          target.closest('[aria-expanded]') ||
          target.closest('[data-state]')) {
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
