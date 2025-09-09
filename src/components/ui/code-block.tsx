import React from "react";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {IconCheck, IconCopy} from "@tabler/icons-react";

type CodeBlockProps = {
  language: string;
  filename: string;
  highlightLines?: number[];
} & (
  | {
      code: string;
      tabs?: never;
    }
  | {
      code?: never;
      tabs: Array<{
        name: string;
        code: string;
        language?: string;
        highlightLines?: number[];
      }>;
    }
);

export const CodeBlock = ({
  language,
  filename,
  code,
  highlightLines = [],
  tabs = [],
}: CodeBlockProps) => {
  const [copied, setCopied] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState(0);

  const tabsExist = tabs.length > 0;

  const copyToClipboard = async () => {
    const textToCopy = tabsExist ? tabs[activeTab].code : code;
    if (textToCopy) {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const activeCode = tabsExist ? tabs[activeTab].code : code;
  const activeLanguage = tabsExist
    ? tabs[activeTab].language || language
    : language;
  const activeHighlightLines = tabsExist
    ? tabs[activeTab].highlightLines || []
    : highlightLines;

  return (
    <div className="code-block-container relative w-full rounded-lg border border-black dark:border-neutral-700 hover:border-emerald-200 dark:hover:border-emerald-700 transition-colors duration-300 p-4 font-mono text-sm">
      <style dangerouslySetInnerHTML={{
        __html: `
          /* IntelliJ IDEA Darcula Theme */
          .code-block-container {
            background-color: #2B2B2B !important;
            color: #A9B7C6 !important;
          }
          .code-block-container .token.comment {
            color: #808080 !important;
          }
          .code-block-container .token.keyword {
            color: #CC7832 !important;
          }
          .code-block-container .token.string {
            color: #6A8759 !important;
          }
          .code-block-container .token.class-name {
            color: #A9B7C6 !important;
          }
          .code-block-container .token.function {
            color: #FFC66D !important;
          }
          .code-block-container .token.number {
            color: #6897BB !important;
          }
          .code-block-container .token.boolean {
            color: #6897BB !important;
          }
          .code-block-container .token.operator {
            color: #A9B7C6 !important;
          }
          .code-block-container .token.punctuation {
            color: #A9B7C6 !important;
          }
          .code-block-container .token.variable {
            color: #9876AA !important;
          }
          .code-block-container .token.constant {
            color: #9876AA !important;
          }
          .code-block-container .token.annotation {
            color: #BBB529 !important;
          }
          .line-numbers-rows {
            color: #808080 !important;
          }
          .dark .line-numbers-rows {
            color: #808080 !important;
          }
          .dark .code-block-container {
            color: #A9B7C6 !important;
          }
        `
      }} />
      <div className="flex flex-col gap-2">
        {tabsExist && (
          <div className="flex  overflow-x-auto">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-3 !py-2 text-xs transition-colors font-sans ${
                  activeTab === index
                    ? "text-white"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        )}
        {!tabsExist && filename && (
          <div className="flex justify-between items-center py-2">
            <div className="text-xs text-zinc-400">{filename}</div>
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-200 transition-colors font-sans"
            >
              {copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
            </button>
          </div>
        )}
      </div>
      <SyntaxHighlighter
        language={activeLanguage}
        style={{}}
        customStyle={{
          margin: 0,
          padding: 0,
          background: "transparent",
          fontSize: "0.875rem", // text-sm equivalent
          color: "#A9B7C6", // IntelliJ Darcula text color
        }}
        wrapLines={true}
        showLineNumbers={true}
        lineNumberStyle={{
          color: "#808080", // IntelliJ Darcula line number color
        }}
        lineProps={(lineNumber) => ({
          style: {
            backgroundColor: activeHighlightLines.includes(lineNumber)
              ? "rgba(255,255,255,0.1)"
              : "transparent",
            display: "block",
            width: "100%",
          },
        })}
        PreTag="div"
      >
        {String(activeCode)}
      </SyntaxHighlighter>
    </div>
  );
};
