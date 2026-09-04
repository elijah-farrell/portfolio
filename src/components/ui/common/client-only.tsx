import { useEffect, useState, type ReactNode } from "react";

/** Renders children only after mount so SSR HTML and the first client paint match. */
export function ClientOnly({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <>{children}</>;
}
