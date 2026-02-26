import { useEffect } from "react";
import { useSiteSettings } from "@/contexts/SiteSettingsContext";

interface PageMetaProps {
  title: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
}

export function PageMeta({ title, description, image, noIndex = false }: PageMetaProps) {
  const { settings } = useSiteSettings();
  const siteName = settings.site_name || "Fernanden";
  const fullTitle = `${title} | ${siteName}`;
  const defaultDescription = String(settings.seo_description || settings.site_description || "Fernanden - Design 3-en-1");
  const metaDescription = description || defaultDescription;

  useEffect(() => {
    document.title = fullTitle;

    let metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", metaDescription);

    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", metaDescription);
    setMeta("property", "og:site_name", siteName);
    if (image) setMeta("property", "og:image", image);

    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", metaDescription);
    setMeta("name", "robots", noIndex ? "noindex, nofollow" : "index, follow");

    return () => {
      document.title = siteName;
    };
  }, [fullTitle, metaDescription, image, noIndex, siteName]);

  return null;
}

function setMeta(attr: "name" | "property", key: string, value: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

