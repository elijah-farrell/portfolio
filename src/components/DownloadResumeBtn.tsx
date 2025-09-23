import { HoverBorderGradient } from "./ui/hover-border-gradient";
import { FiDownload } from "react-icons/fi";

export default function ResumeButton() {
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
      className="dark:bg-black bg-white text-black dark:text-white flex items-center"
      onClick={handleDownload}
    >
      <FiDownload size={16} className="mr-2" />
      <span>Resume</span>
    </HoverBorderGradient>
  );
}
