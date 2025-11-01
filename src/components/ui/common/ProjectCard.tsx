import { useState } from "react";
import { SiGithub, SiGoogleplay } from "react-icons/si";
import { Badge } from "@/components/ui/common/badge";
import { Button } from "@/components/ui/common/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/common/card";
import { GoLinkExternal } from "react-icons/go";
import { CardContainer, CardBody, CardItem } from "@/components/ui/aceternity/3d-card";

interface ProjectCardProps {
  title: string;
  description: string;
  techStack: string[];
  imageUrl: string;
  github?: string;
  liveUrl?: string;
  playstore?: string;
  live?: boolean;
  duration?: string;
}

export default function ProjectCard(props: ProjectCardProps) {
  const {
    title,
    description,
    techStack,
    imageUrl,
    live,
    github,
    liveUrl,
    playstore,
    duration,
  } = props;

  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleCardClick = () => {
    // Prioritize liveUrl, then github, then playstore
    const url = liveUrl || github || playstore;
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const cardContent = (
    <CardContainer className="inter-var h-full">
      <CardBody className="w-auto h-full">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white h-full"
        >
          <Card 
                className="project-card max-w-sm md:max-w-md lg:max-w-sm w-full h-full shadow-lg hover:shadow-2xl transition-transform duration-300 ease-out relative group/card dark:hover:shadow-emerald-500/20 dark:border-white/[0.2] border-black/[0.1] flex flex-col mx-auto cursor-pointer"
                onClick={handleCardClick}
                role="button"
                tabIndex={0}
                aria-label={`View ${title} project${liveUrl ? ` - Visit live site` : github ? ` - View on GitHub` : ''}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardClick();
                  }
                }}
          >
            <CardHeader className="flex-shrink-0">
              <CardItem
                translateZ="60"
                className="w-full h-48 rounded-2xl mb-2 overflow-hidden relative"
              >
                {/* Skeleton placeholder while loading */}
                {!isImageLoaded && (
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 via-emerald-50 to-blue-100 dark:from-emerald-900/20 dark:via-emerald-800/10 dark:to-blue-900/20 animate-pulse" />
                )}
                
                {/* Image with fade-in - lazy load images below the fold */}
                <img
                  src={imageUrl}
                  alt={title}
                  width={597}
                  height={336}
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 24rem"
                  className={`w-full h-48 object-cover rounded-2xl transition-opacity duration-500 ${
                    isImageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => setIsImageLoaded(true)}
                />
              </CardItem>
              <div className="text-xs text-muted-foreground mb-1">{duration}</div>
              <CardTitle className="flex items-center gap-2">
                {title}
                {live && (
                  <span className="inline-block h-2 w-2 rounded-2xl bg-emerald-500 -translate-y-0.5"></span>
                )}
              </CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-shrink-0">
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="font-normal rounded-2xl"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between mt-auto">
              {github && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="transition-colors duration-0"
                  asChild
                  onClick={(e) => e.stopPropagation()}
                >
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${title} on GitHub`}
                    title="GitHub"
                  >
                    <SiGithub />
                    GitHub
                  </a>
                </Button>
              )}
              {playstore && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="transition-colors duration-0"
                  asChild
                  onClick={(e) => e.stopPropagation()}
                >
                  <a
                    href={playstore}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${title} on the app store`}
                    title="App"
                  >
                    <SiGoogleplay />
                    App
                  </a>
                </Button>
              )}
              {liveUrl && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-emerald-500 transition-colors duration-0"
                  asChild
                  onClick={(e) => e.stopPropagation()}
                >
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open live site for ${title}`}
                    title={`Open ${title}`}
                  >
                    <GoLinkExternal />
                    <span className="sr-only">Live Site</span>
                  </a>
                </Button>
              )}
            </CardFooter>
          </Card>
        </CardItem>
      </CardBody>
    </CardContainer>
  );

  return cardContent;
}