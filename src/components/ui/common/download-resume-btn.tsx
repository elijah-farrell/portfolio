import { HoverBorderGradient } from "@/components/ui/aceternity/hover-border-gradient";

export default function ResumeButton() {
  return (
    <HoverBorderGradient
      containerClassName="rounded-2xl text-sm"
      as="a"
      href="/api/resume"
      download="ElijahFarrell.pdf"
      rel="noopener noreferrer"
      aria-label="Download resume PDF"
      title="Download resume PDF"
      className="flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-[var(--text)] transition-[background-color,color] duration-0 hover:duration-300"
    >
      <span>Download Resume</span>
    </HoverBorderGradient>
  );
}



