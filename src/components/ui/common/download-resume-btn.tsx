import { HoverBorderGradient } from "@/components/ui/aceternity/hover-border-gradient";

const PDF_URL = "/api/resume";
const DOWNLOAD_FILENAME = "ElijahFarrell.pdf";

export default function ResumeButton() {
  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(PDF_URL);
      if (!res.ok) throw new Error("Failed to fetch");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = DOWNLOAD_FILENAME;
      a.rel = "noopener noreferrer";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      // Fallback: open in same tab (user can long-press to save)
      window.location.href = PDF_URL;
    }
  };

  return (
    <HoverBorderGradient
      containerClassName="rounded-2xl text-sm"
      as="a"
      href={PDF_URL}
      download={DOWNLOAD_FILENAME}
      onClick={handleDownload}
      aria-label="Download resume PDF"
      title="Download resume PDF"
      className="flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-[var(--text)] transition-[background-color,color] duration-0 hover:duration-300"
    >
      <span>Download Resume</span>
    </HoverBorderGradient>
  );
}



