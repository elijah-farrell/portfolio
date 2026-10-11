"use client";

import { ComponentPropsWithoutRef, FC, ReactNode, useRef } from "react";
import { cn } from "@/lib/utils";
import { useIsoLayoutEffect } from "@/lib/ssr";

export interface TextRevealProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
}

export const TextReveal: FC<TextRevealProps> = ({ children, className }) => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  useIsoLayoutEffect(() => {
    const el = targetRef.current;
    if (!el) return;

    const measure = () => {
      const start = window.scrollY + el.getBoundingClientRect().top;
      const distance = el.offsetHeight - window.innerHeight;
      const progress =
        distance <= 0 ? 1 : Math.min(1, Math.max(0, (window.scrollY - start) / distance));
      const words = el.querySelectorAll<HTMLElement>("[data-reveal-word]");
      const count = words.length || 1;
      words.forEach((word, i) => {
        const from = i / count;
        const to = from + 1 / count;
        const local = (progress - from) / (to - from);
        word.style.opacity = String(Math.min(1, Math.max(0, local)));
      });
    };

    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Function to extract text content and preserve structure
  const processChildren = (node: ReactNode): (string | ReactNode)[] => {
    if (typeof node === "string") {
      return node.split(/\s+/).filter(Boolean);
    }

    if (typeof node === "number") {
      return [node.toString()];
    }

    if (Array.isArray(node)) {
      return node.flatMap(processChildren);
    }

    // For React elements or other nodes, return as-is
    return [node];
  };

  const elements = processChildren(children);

  return (
    <div ref={targetRef} className={cn("relative z-0 h-[200lvh]", className)} data-text-reveal>
      <div
        className={
          "sticky top-0 mx-auto flex h-[50%] max-w-4xl items-center bg-transparent px-[1rem] py-[5rem]"
        }
        data-text-reveal-content
      >
        <span
          className={
            "flex flex-wrap p-5 text-2xl font-bold text-black/20 dark:text-white/20 md:p-8 md:text-3xl lg:p-10 lg:text-4xl xl:text-5xl"
          }
        >
          {elements.map((element, i) => (
            <Word key={i}>{element}</Word>
          ))}
        </span>
      </div>
    </div>
  );
};

const Word: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <span className="relative mx-1 inline-grid lg:mx-1.5">
      <span aria-hidden="true" className="col-start-1 row-start-1 select-none opacity-30">
        {children}
      </span>
      <span
        data-reveal-word
        className="col-start-1 row-start-1 text-black opacity-0 dark:text-white"
      >
        {children}
      </span>
    </span>
  );
};