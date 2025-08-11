import React from 'react';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { Tilt } from 'react-tilt';
import workplaceImage from '@/assets/work/workplace.jpeg';
import polyImage from '@/assets/education/suny-poly-logo.jpg';
import { useSettings } from '@/contexts/SettingsContext';

// Types
interface TExperience {
  title: string;
  companyName: string;
  icon: string;
  iconBg: string;
  date: string;
  points: string[];
}

// Experience data
const experiences: TExperience[] = [
  {
    title: 'Research Assistant',
    companyName: 'SUNY Polytechnic Institute - CESSAIR',
    icon: polyImage,
    iconBg: '#383E56',
    date: 'Feb 2025 – May 2025',
    points: [
      'Led development of a distributed multi-agent AI system on 30+ NVIDIA Orin Nano devices for real-time conversational research.',
      'Designed and deployed a GTK interface for LLM personality customization and Discord-style chat management.',
      'Managed a team of four to build a C++/GTK app for structured AI dialogues via local Ollama endpoints.',
      'Architected memory and message-routing pipelines for persistent, context-aware conversations across distributed nodes.',
      'Optimized prompt engineering and integration, significantly boosting response quality and system performance.',
    ],
  },
  {
    title: 'Work Study Assistant',
    companyName: 'The Workplace',
    icon: workplaceImage,
    iconBg: '#E6DEDD',
    date: 'Aug 2021 – Dec 2021',
    points: [
      'Performed general duties including facility support and janitorial tasks.',
      'Occasionally assisted with basic device troubleshooting and user setup when assigned.',
      'Gained initial exposure to technical support environments and team coordination.'
    ],
  },
];

// Experience Card Component
const ExperienceCard: React.FC<TExperience & { index: number }> = ({ date, iconBg, icon, companyName, title, points, index }) => {
  const { currentColor } = useSettings();
  
  return (
    <VerticalTimelineElement
      contentStyle={{ 
        background: `linear-gradient(135deg, ${currentColor}30 0%, ${currentColor}10 100%)`, 
        color: 'inherit',
        border: `1px solid ${currentColor}40`
      }}
      contentArrowStyle={{ borderRight: `7px solid ${currentColor}` }}
      date={date}
      dateStyle={{ 
        color: 'inherit',
        fontWeight: '600',
        fontSize: '14px',
        textShadow: 'none'
      }}
      iconStyle={{ 
        background: 'var(--icon-bg, #000000)',
        borderRadius: '12px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
      }}
      icon={
        <div className="h-full w-full flex justify-center items-center">
          <div className="w-[80%] h-[80%] bg-white rounded-full flex justify-center items-center">
            <img src={icon} alt={companyName} className="w-[70%] h-[70%] object-contain" />
          </div>
        </div>
      }
    >
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="cursor-pointer"
      >
        <h3 className="text-gray-900 dark:text-white text-[24px] font-bold">{title}</h3>
        <p className="text-[60px] font-semibold" style={{ margin: 0, color: currentColor }}>{companyName}</p>
        <ul className="mt-5 list-disc ml-5 space-y-2">
          {points.map((point, index) => (
            <li
              key={`experience-point-${index}`}
              className="text-gray-700 dark:text-gray-300 text-[14px] pl-1 tracking-wider"
            >
              {point}
            </li>
          ))}
        </ul>
      </Tilt>
    </VerticalTimelineElement>
  );
};

// Main Experience Component
const WorkExperience: React.FC = () => {
  const { currentColor } = useSettings();
  
  return (
    <section id="work" className="py-20 px-6 sm:px-8 bg-gray-50 dark:bg-neutral-900 border-t border-gray-200 dark:border-neutral-700">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
            What I have done so far
          </h2>
          <h3 className="text-2xl sm:text-3xl font-semibold mt-2" style={{ color: currentColor }}>
            Work Experience.
          </h3>
        </div>
        
        <div className="mt-20 flex flex-col">
          <VerticalTimeline>
            {experiences.map((experience, index) => (
              <ExperienceCard key={index} {...experience} index={index} />
            ))}
          </VerticalTimeline>
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;
