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
  title = "Elijah Farrell",
  description = "Elijah Farrell's portfolio. Full Stack Developer, Computer Science graduate, and aspiring IT support professional pursuing CompTIA A+ certification. Showcasing interactive React projects, Minecraft mods, and modern web applications built with TypeScript, Next.js, and creative UI design.",
  keywords = "Elijah Farrell, Computer Science graduate, Full Stack Developer, Software Engineer, Web Development, Frontend, Backend, Algorithms, Data Structures, Databases, Systems, IT Support, Help Desk, Technical Support, CompTIA A+, Entry-level IT, React, TypeScript, JavaScript, Portfolio",
  image = "https://elijahfarrell.com/android-chrome-512x512.png",
  url = "https://elijahfarrell.com/",
  type = "website",
  author = "Elijah Farrell"
}) => {
  // Structured data for better SEO
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Elijah Farrell",
      "jobTitle": "Computer Scientist",
      "description": description,
      "url": "https://elijahfarrell.com",
      "image": image,
      "sameAs": [
        "https://github.com/elijah-farrell",
        "https://www.linkedin.com/in/elifarrell/"
      ],
      "knowsAbout": [
        "Computer Science",
        "Software Engineering",
        "Information Technology",
        "Data Structures and Algorithms",
        "System Design",
        "Operating Systems",
        "Computer Networks",
        "Database Management",
        "Cybersecurity",
        "Object-Oriented Programming",
        "Web Development",
        "API Development",
        "Version Control",
        "Software Testing",
        "Problem Solving",
        "Technical Troubleshooting",
        "IT Support",
        "System Administration"
      ],
      "alumniOf": {
        "@type": "CollegeOrUniversity",
        "name": "SUNY Polytechnic Institute"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Elijah Farrell Portfolio",
      "url": "https://elijahfarrell.com",
      "description": description,
      "author": {
        "@type": "Person",
        "name": "Elijah Farrell"
      }
    }
  ];

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
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
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:secure_url" content={image} />
      <meta property="og:image:width" content="512" />
      <meta property="og:image:height" content="512" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:alt" content={`${author} - Portfolio Logo`} />
      <meta property="og:site_name" content="Elijah Farrell Portfolio" />
      <meta property="og:locale" content="en_US" />
      {type === 'article' && author && (
        <meta property="article:author" content={author} />
      )}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={`${author} - Portfolio Logo`} />

      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
