import { cn } from "@/lib/utils";
import { useState } from "react";

interface BrandedPlaceholderProps {
  width?: number;
  height?: number;
  text?: string;
  subtext?: string;
  universe?: "fernanden" | "dense" | "she" | "cafee";
  className?: string;
  aspectRatio?: "square" | "portrait" | "landscape" | "video" | "banner";
}

const universeColors = {
  fernanden: {
    bg: "from-terracotta/20 to-primary/20",
    accent: "bg-terracotta",
    text: "text-terracotta",
    border: "border-terracotta/30",
  },
  dense: {
    bg: "from-densen-gold/20 to-primary/20",
    accent: "bg-densen-gold",
    text: "text-densen-gold",
    border: "border-densen-gold/30",
  },
  she: {
    bg: "from-she-saffron/20 to-secondary/20",
    accent: "bg-she-saffron",
    text: "text-she-saffron",
    border: "border-she-saffron/30",
  },
  cafee: {
    bg: "from-cafee-mint/20 to-primary/20",
    accent: "bg-cafee-mint",
    text: "text-cafee-mint",
    border: "border-cafee-mint/30",
  },
};

const aspectRatioClasses = {
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[16/9]",
  video: "aspect-video",
  banner: "aspect-[21/9]",
};

export function BrandedPlaceholder({
  width = 400,
  height = 300,
  text,
  subtext,
  universe = "fernanden",
  className,
  aspectRatio,
}: BrandedPlaceholderProps) {
  const [imageError, setImageError] = useState(false);
  const colors = universeColors[universe];

  // Generate a consistent SVG placeholder based on text
  const generateSvgPlaceholder = () => {
    const displayText = text || "Image";
    const initial = displayText.charAt(0).toUpperCase();
    
    const svgContent = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#c4a574;stop-opacity:0.3" />
            <stop offset="100%" style="stop-color:#8b7355;stop-opacity:0.2" />
          </linearGradient>
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch"/>
            <feColorMatrix type="saturate" values="0"/>
            <feBlend in="SourceGraphic" mode="overlay"/>
          </filter>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad)"/>
        <rect width="100%" height="100%" fill="#1a1a1a" opacity="0.8"/>
        <circle cx="50%" cy="40%" r="60" fill="#c4a574" opacity="0.15"/>
        <circle cx="50%" cy="40%" r="45" fill="none" stroke="#c4a574" stroke-width="2" opacity="0.3"/>
        <text x="50%" y="40%" font-family="serif" font-size="48" font-weight="bold" fill="#c4a574" text-anchor="middle" dominant-baseline="middle" opacity="0.6">${initial}</text>
        <text x="50%" y="65%" font-family="sans-serif" font-size="14" fill="#a0a0a0" text-anchor="middle" dominant-baseline="middle">${displayText}</text>
        ${subtext ? `<text x="50%" y="75%" font-family="sans-serif" font-size="11" fill="#707070" text-anchor="middle" dominant-baseline="middle">${subtext}</text>` : ''}
        <line x1="20%" y1="85%" x2="80%" y2="85%" stroke="#c4a574" stroke-width="1" opacity="0.2"/>
      </svg>
    `;
    
    return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgContent)))}`;
  };

  const handleError = () => {
    setImageError(true);
  };

  if (imageError) {
    return (
      <div
        className={cn(
          "relative overflow-hidden bg-gradient-to-br flex items-center justify-center",
          colors.bg,
          aspectRatio ? aspectRatioClasses[aspectRatio] : "",
          className
        )}
        style={!aspectRatio ? { width, height } : undefined}
      >
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />
        <div className="relative z-10 text-center p-4">
          <div className={cn("w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center border-2", colors.border, colors.bg)}>
            <span className={cn("text-2xl font-serif font-bold", colors.text)}>
              {(text || "Image").charAt(0).toUpperCase()}
            </span>
          </div>
          <p className="text-white/80 font-medium text-sm">{text || "Image"}</p>
          {subtext && <p className="text-white/50 text-xs mt-1">{subtext}</p>}
        </div>
      </div>
    );
  }

  return (
    <img
      src={generateSvgPlaceholder()}
      alt={text || "Placeholder"}
      width={width}
      height={height}
      className={cn(
        "object-cover",
        aspectRatio ? aspectRatioClasses[aspectRatio] : "",
        className
      )}
      onError={handleError}
    />
  );
}

// Utility function to generate branded placeholder URLs
export function getBrandedPlaceholderUrl(
  text: string,
  universe: "fernanden" | "dense" | "she" | "cafee" = "fernanden",
  width: number = 400,
  height: number = 300
): string {
  const colors = {
    fernanden: { primary: "#c4a574", secondary: "#8b7355" },
    dense: { primary: "#d4af37", secondary: "#b8941f" },
    she: { primary: "#f4a460", secondary: "#cd853f" },
    cafee: { primary: "#90EE90", secondary: "#7FCD7F" },
  };

  const color = colors[universe];
  const initial = text.charAt(0).toUpperCase();

  const svgContent = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${color.primary};stop-opacity:0.25" />
          <stop offset="100%" style="stop-color:${color.secondary};stop-opacity:0.15" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)"/>
      <rect width="100%" height="100%" fill="#1a1a1a" opacity="0.85"/>
      <circle cx="50%" cy="42%" r="55" fill="${color.primary}" opacity="0.12"/>
      <circle cx="50%" cy="42%" r="40" fill="none" stroke="${color.primary}" stroke-width="1.5" opacity="0.25"/>
      <text x="50%" y="42%" font-family="Georgia, serif" font-size="44" font-weight="bold" fill="${color.primary}" text-anchor="middle" dominant-baseline="middle" opacity="0.5">${initial}</text>
      <text x="50%" y="68%" font-family="system-ui, sans-serif" font-size="13" fill="#909090" text-anchor="middle" dominant-baseline="middle">${text}</text>
      <line x1="25%" y1="82%" x2="75%" y2="82%" stroke="${color.primary}" stroke-width="1" opacity="0.15"/>
    </svg>
  `;

  return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgContent)))}`;
}

// Pre-defined placeholder URLs for common use cases
export const placeholderImages = {
  // Hero backgrounds
  hero: {
    fernanden: getBrandedPlaceholderUrl("Fernanden Universe", "fernanden", 1920, 1080),
    dense: getBrandedPlaceholderUrl("DENSE Fashion", "dense", 1920, 1080),
    she: getBrandedPlaceholderUrl("SHE Spaces", "she", 1920, 1080),
    cafee: getBrandedPlaceholderUrl("CaFEE Education", "cafee", 1920, 1080),
  },
  // Product images
  product: {
    fernanden: getBrandedPlaceholderUrl("Produit", "fernanden", 600, 800),
    dense: getBrandedPlaceholderUrl("Mode", "dense", 600, 800),
    she: getBrandedPlaceholderUrl("Décoration", "she", 600, 800),
    cafee: getBrandedPlaceholderUrl("Service", "cafee", 600, 800),
  },
  // Blog/Article images
  blog: {
    fernanden: getBrandedPlaceholderUrl("Article", "fernanden", 800, 450),
    dense: getBrandedPlaceholderUrl("Fashion", "dense", 800, 450),
    she: getBrandedPlaceholderUrl("Design", "she", 800, 450),
    cafee: getBrandedPlaceholderUrl("Éducation", "cafee", 800, 450),
  },
  // Avatar/Profile
  avatar: {
    fernanden: getBrandedPlaceholderUrl("Avatar", "fernanden", 150, 150),
    dense: getBrandedPlaceholderUrl("Client", "dense", 150, 150),
    she: getBrandedPlaceholderUrl("Client", "she", 150, 150),
    cafee: getBrandedPlaceholderUrl("Client", "cafee", 150, 150),
  },
  // Collection/Portfolio
  collection: {
    fernanden: getBrandedPlaceholderUrl("Collection", "fernanden", 1200, 800),
    dense: getBrandedPlaceholderUrl("Collection", "dense", 1200, 800),
    she: getBrandedPlaceholderUrl("Projet", "she", 1200, 800),
    cafee: getBrandedPlaceholderUrl("Portfolio", "cafee", 1200, 800),
  },
};

export default BrandedPlaceholder;
