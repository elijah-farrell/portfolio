import { HoverBorderGradient } from "@/components/ui/aceternity/hover-border-gradient";
import { FiDownload } from "react-icons/fi";

interface ResumeButtonProps {
  className?: string;
}

export default function ResumeButton({ className }: ResumeButtonProps) {
  const pdfUrl = "/ElijahFarrell.pdf";
  
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'ElijahFarrell_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <HoverBorderGradient
      containerClassName="rounded-2xl text-sm"
      as="button"
      className={`dark:bg-black bg-white text-black dark:text-white flex items-center px-3 py-2 xs:px-4 xs:py-2.5 xl:px-4 xl:py-2.5 ${className}`}
      onClick={handleDownload}
    >
      <FiDownload size={14} className="mr-2 xs:w-5 xs:h-5 xl:w-4 xl:h-4" />
      <span>Resume</span>
    </HoverBorderGradient>
  );
}
