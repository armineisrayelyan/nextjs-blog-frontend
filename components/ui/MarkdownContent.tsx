import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { cn } from "@/lib/cn";

interface MarkdownContentProps {
  content: string;
  className?: string;
  /** Tighter spacing for cards and excerpts */
  compact?: boolean;
}

export function MarkdownContent({
  content,
  className,
  compact = false,
}: MarkdownContentProps) {
  return (
    <div
      className={cn(
        "markdown-content",
        compact && "markdown-content--compact",
        className,
      )}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
