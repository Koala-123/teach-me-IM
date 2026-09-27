import React, { useMemo } from 'react';
import katex from 'katex';
import { marked } from 'marked';

// Configure marked for clean GFM parsing with breaks
marked.setOptions({
  gfm: true,
  breaks: true
});

/**
 * Parses a combined string of Markdown and LaTeX ($...$ and $$...$$)
 * Ensures math is extracted before markdown parsing so that underscores (_),
 * asterisks (*), and other LaTeX tokens are never mangled by Markdown.
 */
export function renderMarkdownAndMath(text = "", isBlockOnly = false) {
  if (!text || typeof text !== 'string') return "";

  // Fast path for isolated block math (e.g. formula cards: "$$formula$$")
  if (isBlockOnly || (text.startsWith("$$") && text.endsWith("$$") && text.indexOf("$$", 2) === text.length - 2)) {
    const rawLatex = text.replace(/^\$\$|\$\$$/g, "").trim();
    try {
      return katex.renderToString(rawLatex, { displayMode: true, throwOnError: false });
    } catch {
      return `<pre class="text-rose-400 font-mono text-xs">${rawLatex}</pre>`;
    }
  }

  const mathPlaceholders = [];

  // 1. Extract and replace block math $$...$$
  let tokenized = text.replace(/\$\$([\s\S]*?)\$\$/g, (match, latex) => {
    const index = mathPlaceholders.length;
    let html = "";
    try {
      html = katex.renderToString(latex.trim(), { displayMode: true, throwOnError: false });
    } catch (e) {
      html = match;
    }
    mathPlaceholders.push({ html, isBlock: true });
    return `%%KATEX_BLOCK_TOKEN_${index}%%`;
  });

  // 2. Extract and replace inline math $...$
  tokenized = tokenized.replace(/\$([^\$\n]+?)\$/g, (match, latex) => {
    const index = mathPlaceholders.length;
    let html = "";
    try {
      html = katex.renderToString(latex.trim(), { displayMode: false, throwOnError: false });
    } catch (e) {
      html = match;
    }
    mathPlaceholders.push({ html, isBlock: false });
    return `%%KATEX_INLINE_TOKEN_${index}%%`;
  });

  // 3. Parse Markdown
  let parsedHtml = marked.parse(tokenized);

  // 4. Re-inject KaTeX rendered HTML into placeholders
  mathPlaceholders.forEach((item, index) => {
    if (item.isBlock) {
      const blockToken = `%%KATEX_BLOCK_TOKEN_${index}%%`;
      // Unwrap <p>%%KATEX_BLOCK_TOKEN_i%%</p> to prevent invalid nested block layout
      const pRegex = new RegExp(`<p>\\s*${blockToken}\\s*<\\/p>`, 'g');
      const replacement = `<div class="katex-display-container my-3 overflow-x-auto text-center">${item.html}</div>`;
      if (pRegex.test(parsedHtml)) {
        parsedHtml = parsedHtml.replace(pRegex, replacement);
      } else {
        parsedHtml = parsedHtml.replaceAll(blockToken, replacement);
      }
    } else {
      const inlineToken = `%%KATEX_INLINE_TOKEN_${index}%%`;
      const replacement = `<span class="katex-inline-container inline-block align-baseline mx-0.5">${item.html}</span>`;
      parsedHtml = parsedHtml.replaceAll(inlineToken, replacement);
    }
  });

  return parsedHtml;
}

/**
 * MathView Component
 * Renders rich Markdown and KaTeX math seamlessly.
 */
export function MathView({ text = "", className = "", block = false }) {
  const html = useMemo(() => {
    return renderMarkdownAndMath(text, block);
  }, [text, block]);

  if (!html) return null;

  return (
    <div
      className={`math-markdown-content leading-relaxed ${className} ${block ? 'block' : 'inline'}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
