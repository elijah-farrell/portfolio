import React from "react";
import LinkCard from "./LinkCard";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { Card } from "@/components/ui/card";
import { CardBody } from "@/components/ui/3d-card";
import {
  SiGithub,
  SiLinkedin,
  SiDiscord,
} from "react-icons/si";
import { FiMapPin, FiMail, FiCalendar } from "react-icons/fi";

export default function Contact(): JSX.Element {
  const links = [
    {
      title: "LinkedIn",
      url: "https://www.linkedin.com/in/elijah-farrell-915047349/",
      icon: <SiLinkedin />,
    },
    {
      title: "GitHub",
      url: "https://github.com/elijah-farrell",
      icon: <SiGithub />,
    },
    {
      title: "Discord",
      url: "https://discord.gg/h9QSQZzn",
      icon: <SiDiscord />,
    },
  ];

  const contactInfo = [
    {
      icon: <FiMapPin />,
      title: "Location",
      value: "New York",
      link: "https://maps.google.com/?q=Watertown,NY",
      external: true
    },
    {
      icon: <FiMail />,
      title: "Email",
      value: "farrellelijah\n@outlook.com",
      link: "mailto:farrellelijah@outlook.com"
    },
    {
      icon: <FiCalendar />,
      title: "Meeting",
      value: "Book a call via Cal.com",
      link: "https://cal.com/elijahfarrell",
      external: true
    }
  ];

  return (
    <div id="contact">
      <h1 className="text-3xl my-5">CONTACT</h1>
      <BackgroundBeamsWithCollision className="w-full h-auto z-0 translate-y-7">
        <Card className="border-none py-28 px-2 md:px-4">
          <CardBody className="w-full h-auto z-30 relative">
            <p className="leading-9 text-center mb-12">
              Ready to collaborate? Let's discuss your next project or just say hello!
            </p>

            {/* Contact Information Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto relative z-40 px-2">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.link}
                  target={info.external ? "_blank" : "_self"}
                  rel={info.external ? "noopener noreferrer" : undefined}
                  className="block no-underline relative z-40"
                >
                  <Card className="p-6 text-center hover:shadow-lg transition-all duration-300 hover:scale-105 min-h-[200px] flex flex-col justify-center cursor-pointer group relative z-40">
                    <div className="flex justify-center mb-4">
                      <div className="text-3xl text-emerald-600 group-hover:scale-110 transition-transform duration-300">
                        {info.icon}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">{info.title}</h3>
                    <div className="text-emerald-600 group-hover:text-emerald-700 transition-colors break-words text-sm md:text-base px-2 whitespace-pre-line">
                      {info.value}
                    </div>
                  </Card>
                </a>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-4 py-8 relative z-40 px-2">
              {links.map(
                (element, index) =>
                  element && (
                    <div key={index} className="relative z-40">
                      <LinkCard
                        key={index}
                        title={element.title}
                        url={element.url}
                        icon={element.icon}
                        customText={element.customText}
                      />
                    </div>
                  )
              )}
            </div>

            <div className="text-center text-xs text-muted-foreground pt-10">
              © Developed by Me
            </div>
          </CardBody>
        </Card>
      </BackgroundBeamsWithCollision>
    </div>
  );
}
