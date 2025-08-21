import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  author?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title = "Elijah Farrell - Computer Science Graduate & Full-Stack Developer",
  description = "Elijah Farrell - Computer Science Graduate & Full-Stack Developer. Expert in React, TypeScript, AI/ML, and distributed systems. View my projects and experience.",
  keywords = "Elijah Farrell, Computer Science, Full-Stack Developer, React, TypeScript, AI/ML, Distributed Systems, Portfolio, Software Engineer",
  image = "https://elijahfarrell.com/android-chrome-512x512.png",
  url = "https://elijahfarrell.com/",
  type = "website",
  author = "Elijah Farrell"
}) => {
  const fullTitle = title === "Elijah Farrell - Computer Science Graduate & Full-Stack Developer" 
    ? title 
    : `${title} | Elijah Farrell`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Elijah Farrell Portfolio" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
};
