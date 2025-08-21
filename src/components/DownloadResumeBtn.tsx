import { HoverBorderGradient } from "./ui/hover-border-gradient";
import { FiDownload } from "react-icons/fi";

export default function ResumeButton() {
  const pdfUrl = "/resume.html";
  return (
    <a href={pdfUrl} target="_blank" rel="noopener noreferrer" title="Elijah Farrell - Resume">
      {/* <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-emerald-900 focus:ring-offset-2 focus:ring-offset-slate-50">
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#A7F3D0_0%,#10B981_50%,#A7F3D0_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                    Download Resume
                </span>
            </button> */}
      <HoverBorderGradient
        containerClassName="rounded-2xl text-sm"
        as="button"
        className="dark:bg-black bg-white text-black dark:text-white flex items-center"
      >
        <FiDownload size={16} className="mr-2" />
        <span>View Resume</span>
      </HoverBorderGradient>
    </a>
  );
}
