import React from 'react';

interface ContentRendererProps {
  content: string;
  className?: string;
}

export const ContentRenderer: React.FC<ContentRendererProps> = ({ content, className = "" }) => {
  const processContent = (text: string) => {
    if (!text) return '';
    
    // Échapper les caractères HTML dangereux avant le traitement
    let processed = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;');
    
    // Remplacer les sauts de ligne par des balises <br>
    processed = processed.replace(/\n/g, '<br>');
    
    // Remplacer les titres markdown par des balises HTML appropriées
    processed = processed.replace(/#{1,6}\s(.+)$/gm, '<h$1>$2</h$1>');
    
    // Remplacer le texte en gras (après échappement HTML)
    processed = processed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Remplacer le texte en italique
    processed = processed.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Remplacer les liens markdown
    processed = processed.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    
    return processed;
  };

  return (
    <div 
      className={className}
      dangerouslySetInnerHTML={{ __html: processContent(content) }}
    />
  );
};
