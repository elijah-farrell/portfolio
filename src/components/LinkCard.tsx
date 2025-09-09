import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

interface Link {
  title: string;
  url: string;
  icon?: React.ReactNode;
  customText?: string;
}

const LinkCard: React.FC<Link> = (ele) => {
  return (
    <a
      href={ele.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ele.title}
      title={ele.title}
    >
      <Button variant="outline" className="rounded-2xl bg-white dark:bg-[hsl(0_0%_3.9%)] border-gray-200 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-[hsl(0_0%_14.9%)] hover:border-emerald-200 dark:hover:border-emerald-700 transition-colors duration-300" asChild>
        <div>
          {/* Icon and accessible text for SEO */}
          {ele.icon && <span aria-hidden="true">{ele.icon}</span>}
          {ele.customText && <span className="ml-2 text-sm">{ele.customText}</span>}
          <span className="sr-only">{ele.title}</span>
        </div>
      </Button>
    </a>
  );
};

export default LinkCard;
