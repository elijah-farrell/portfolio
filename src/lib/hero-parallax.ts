export const HERO_PARALLAX = {
  desktopMinWidth: 1024,
  shortHeight: 500,
  desktopFactor: 0.14,
  desktopMax: 130,
  mobileFactor: 0.26,
  mobileMax: 400,
  shortFactor: 0.06,
  shortMax: 60,
} as const;

export function heroParallaxOffset(
  scrollY: number,
  innerWidth: number,
  innerHeight: number,
  el: HTMLElement | null,
  currentOffset: number
): number {
  const desktop = innerWidth >= HERO_PARALLAX.desktopMinWidth;
  const short = innerHeight <= HERO_PARALLAX.shortHeight;
  const factor = desktop
    ? HERO_PARALLAX.desktopFactor
    : short
      ? HERO_PARALLAX.shortFactor
      : HERO_PARALLAX.mobileFactor;
  const maxOffset = desktop
    ? HERO_PARALLAX.desktopMax
    : short
      ? HERO_PARALLAX.shortMax
      : HERO_PARALLAX.mobileMax;

  let targetOffset = Math.max(0, Math.min(maxOffset, scrollY * factor));

  if (!desktop && el) {
    const about = document.getElementById("about");
    if (about) {
      const aboutRect = about.getBoundingClientRect();
      const imageRect = el.getBoundingClientRect();
      const maxAllowed = aboutRect.top - 16 - (imageRect.bottom - currentOffset);
      targetOffset = Math.min(targetOffset, Math.max(0, maxAllowed));
    }
  }

  return targetOffset;
}

export function applyHeroParallaxTransform(el: HTMLElement, offset: number): void {
  el.style.transform = `translate3d(0,${offset}px,0)`;
}
