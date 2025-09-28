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

  // Structured data for better SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Elijah Farrell",
    "jobTitle": "Full-Stack Developer",
    "description": description,
    "url": "https://elijahfarrell.com",
    "image": image,
    "sameAs": [
      "https://github.com/elijahfarrell",
      "https://linkedin.com/in/elijahfarrell"
    ],
    "knowsAbout": [
      "React",
      "TypeScript", 
      "Python",
      "Machine Learning",
      "Distributed Systems",
      "Full-Stack Development"
    ],
    "alumniOf": {
      "@type": "CollegeOrUniversity",
      "name": "SUNY Polytechnic Institute"
    }
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="global" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="512" />
      <meta property="og:image:height" content="512" />
      <meta property="og:site_name" content="Elijah Farrell Portfolio" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta property="twitter:creator" content="@elijahfarrell" />
      
      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#10b981" />
      <meta name="msapplication-TileColor" content="#10b981" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="Elijah Farrell" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Favicon */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};
