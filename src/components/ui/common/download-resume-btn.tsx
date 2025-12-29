import { HoverBorderGradient } from "@/components/ui/aceternity/hover-border-gradient";

export default function ResumeButton() {
  const pdfUrl = "/api/resume";
  return (
    <HoverBorderGradient
      containerClassName="rounded-2xl text-sm"
      as="a"
      href={pdfUrl}
      download
      aria-label="Download resume PDF"
      title="Download resume PDF"
      className="flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-[var(--text)] transition-[background-color,color] duration-0 hover:duration-300"
    >
      <span>Download Resume</span>
    </HoverBorderGradient>
  );
}



