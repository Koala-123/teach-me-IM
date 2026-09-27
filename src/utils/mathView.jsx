import React, { useMemo } from 'react';
import katex from 'katex';

/**
 * MathView Component
 * Safely parses and renders strings containing inline ($...$) and block ($$...$$) LaTeX expressions
 * using KaTeX. Non-math segments are rendered as regular text.
 */
export function MathView({ text = "", className = "", block = false }) {
  const renderedContent = useMemo(() => {
    if (!text || typeof text !== 'string') return null;

    // Fast path: if no '$', return plain text
    if (!text.includes('$')) {
      return text;
    }

    // Split text by $$ for block math and $ for inline math
    // Regex matches $$...$$ or $...$
    const parts = [];
    let currentIndex = 0;
    const mathRegex = /\$\$([\s\S]*?)\$\$|\$([^\$\n]+?)\$/g;
    let match;

    while ((match = mathRegex.exec(text)) !== null) {
      // Add text before match
      if (match.index > currentIndex) {
        parts.push({
          type: 'text',
          content: text.slice(currentIndex, match.index)
        });
      }

      const isBlock = match[1] !== undefined;
      const latex = isBlock ? match[1] : match[2];

      try {
        const html = katex.renderToString(latex.trim(), {
          displayMode: isBlock,
          throwOnError: false,
          output: 'htmlAndMathml'
        });
        parts.push({
          type: 'math',
          html,
          isBlock
        });
      } catch (err) {
        parts.push({
          type: 'text',
          content: match[0]
        });
      }

      currentIndex = mathRegex.lastIndex;
    }

    // Add trailing text
    if (currentIndex < text.length) {
      parts.push({
        type: 'text',
        content: text.slice(currentIndex)
      });
    }

    return parts;
  }, [text]);

  if (!renderedContent) return null;

  if (typeof renderedContent === 'string') {
    return <span className={className}>{renderedContent}</span>;
  }

  return (
    <span className={`math-view ${className} ${block ? 'block' : 'inline'}`}>
      {renderedContent.map((part, idx) => {
        if (part.type === 'text') {
          return <span key={idx}>{part.content}</span>;
        }
        return (
          <span
            key={idx}
            className={part.isBlock ? "block my-2 overflow-x-auto text-center" : "inline mx-0.5"}
            dangerouslySetInnerHTML={{ __html: part.html }}
          />
        );
      })}
    </span>
  );
}
