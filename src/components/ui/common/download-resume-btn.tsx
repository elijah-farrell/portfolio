import { HoverBorderGradient } from "@/components/ui/aceternity/hover-border-gradient";
import { FiDownload } from "react-icons/fi";

export default function ResumeButton() {
  const pdfUrl = "/api/resume";
  return (
    <HoverBorderGradient
      containerClassName="rounded-2xl text-sm"
      as="a"
      href={pdfUrl}
      download
      className="dark:bg-[#0a0a0a] bg-white text-black dark:text-white flex items-center"
    >
      <span className="hidden sm:inline">Download Resume</span>
      <div className="sm:hidden flex items-center gap-1">
        <FiDownload size={16} />
        <span>Resume</span>
      </div>
    </HoverBorderGradient>
  );
}



