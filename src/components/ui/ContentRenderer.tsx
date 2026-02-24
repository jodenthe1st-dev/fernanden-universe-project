import React from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

interface ContentRendererProps {
  content: string;
  className?: string;
}

// Configure marked for safe rendering
marked.setOptions({
  breaks: true,
  gfm: true,
});

export const ContentRenderer: React.FC<ContentRendererProps> = ({ content, className = "" }) => {
  const processContent = (text: string): string => {
    if (!text) return '';
    
    try {
      // Parse markdown to HTML
      const html = marked.parse(text);
      // Sanitize HTML to prevent XSS attacks
      return DOMPurify.sanitize(html, {
        ALLOWED_TAGS: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'br', 'strong', 'em', 'a', 'ul', 'ol', 'li', 'blockquote', 'code', 'pre'],
        ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
        ALLOW_DATA_ATTR: false,
      });
    } catch (error) {
      console.error('Error processing markdown content:', error);
      return DOMPurify.sanitize(text);
    }
  };

  return (
    <div 
      className={`prose prose-sm max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: processContent(content) }}
    />
  );
};
