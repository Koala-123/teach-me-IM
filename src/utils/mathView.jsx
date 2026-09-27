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
export function renderMarkdownAndMath(text = "", options = {}) {
  if (!text || typeof text !== 'string') return "";

  const trimmed = text.trim();

  // Fast path for isolated block math (e.g. formula cards: "$$formula$$")
  if (options.isRawFormula || (trimmed.startsWith("$$") && trimmed.endsWith("$$") && trimmed.indexOf("$$", 2) === trimmed.length - 2)) {
    const rawLatex = trimmed.replace(/^\$\$|\$\$$/g, "").trim();
    try {
      const html = katex.renderToString(rawLatex, { displayMode: true, throwOnError: false });
      return `<div class="katex-display-container my-3 overflow-x-auto text-center">${html}</div>`;
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
    // Surround with double newlines so marked treats it as an isolated block
    return `\n\n%%KATEX_BLOCK_TOKEN_${index}%%\n\n`;
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
      const replacement = `<div class="katex-display-container my-3 overflow-x-auto text-center">${item.html}</div>`;
      // Unwrap <p>%%KATEX_BLOCK_TOKEN_i%%</p> to prevent invalid nested block layout
      const pRegex = new RegExp(`<p>\\s*${blockToken}\\s*<\\/p>`, 'g');
      parsedHtml = parsedHtml.replace(pRegex, replacement);
      parsedHtml = parsedHtml.replaceAll(blockToken, replacement);
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
 * Defaults to block display so paragraphs and newlines format properly.
 */
export function MathView({ text = "", className = "", inline = false, block = true, isRawFormula = false }) {
  const isInline = inline || block === false;

  const html = useMemo(() => {
    let result = renderMarkdownAndMath(text, { isRawFormula });
    if (isInline && result) {
      // Strip outer <p> ... </p> for true inline usage (e.g. single-line labels)
      result = result.replace(/^<p>/, '').replace(/<\/p>\s*$/, '');
    }
    return result;
  }, [text, isInline, isRawFormula]);

  if (!html) return null;

  if (isInline) {
    return (
      <span
        className={`math-markdown-content inline ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <div
      className={`math-markdown-content leading-relaxed block ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
