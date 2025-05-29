
import { Helmet } from 'react-helmet-async';

interface MetaTagsProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

export const MetaTags = ({
  title = "ASTROM Command Center - Healthcare AI Platform",
  description = "Advanced healthcare management platform with AI-powered analytics, real-time monitoring, and intelligent automation for optimal patient care.",
  keywords = "healthcare, AI, analytics, patient management, command center, medical, automation",
  image = "/placeholder.svg",
  url = window.location.href,
  type = "website"
}: MetaTagsProps) => {
  const fullTitle = title.includes("ASTROM") ? title : `${title} | ASTROM Command Center`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="ASTROM Healthcare Solutions" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="ASTROM Command Center" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional SEO */}
      <meta name="theme-color" content="#0ea5e9" />
      <meta name="msapplication-TileColor" content="#0ea5e9" />
      <link rel="canonical" href={url} />
    </Helmet>
  );
};
