'use client';

import React from 'react';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { useTheme } from 'next-themes';
import { useHasMounted, useSectionInView } from '@/common/lib/hooks';
import SectionHeading from '@/common/components/shared/section-heading';
import { experiencesData } from '@/common/lib/data';
import SectionDivider from '../../shared/section-divider';
import { motion } from 'framer-motion';

export default function Experience() {
  const { ref } = useSectionInView('experience');
  const { theme } = useTheme();
  const hasMounted = useHasMounted();

  // Critical fix: We need to ensure dark mode elements are visible
  const timelineElementStyle = {
    background: theme === 'light' ? '#f3f4f6' : 'rgba(255, 255, 255, 0.05)',
    boxShadow: 'none',
    border: '1px solid rgba(0, 0, 0, 0.05)',
    textAlign: 'left',
    padding: '1.3rem 2rem',
    borderRadius: '8px',
  };

  // Fix for animation
  const headingVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 } 
    }
  };

  return (
    <section
      id="experience"
      ref={ref}
      className="relative w-full scroll-mt-20 dark:bg-darkBg dark:text-white"
    >
      {/* Add subtle background glow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute left-1/4 top-1/4 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/5 blur-3xl"></div>
        <div className="absolute right-1/4 top-3/4 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/5 blur-3xl"></div>
      </div>

      <div className="relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={headingVariants}
        >
          <SectionHeading>My experience/ Education</SectionHeading>
        </motion.div>

        {hasMounted && (
          <VerticalTimeline 
            lineColor={theme === 'light' ? '#9ca3af' : 'rgba(255, 255, 255, 0.2)'}
            animate={true}
          >
            {experiencesData.map((item, index) => (
              <React.Fragment key={index}>
                <VerticalTimelineElement
                  className="vertical-timeline-element--work"
                  contentStyle={timelineElementStyle}
                  contentArrowStyle={{
                    borderRight: theme === 'light'
                      ? '0.4rem solid #9ca3af'
                      : '0.4rem solid rgba(255, 255, 255, 0.2)',
                  }}
                  date={item.date}
                  icon={item.icon}
                  iconStyle={{
                    background: theme === 'light' ? '#fff' : 'rgba(255, 255, 255, 0.15)',
                    fontSize: '1.5rem',
                  }}
                  visible={true}
                >
                  <h3 className="font-semibold capitalize text-black dark:text-white">{item.title}</h3>
                  <p className="!mt-0 font-normal text-gray-700 dark:text-gray-300">{item.location}</p>
                  <p className="!mt-1 !font-normal text-gray-700 dark:text-white/75">
                    {item.description}
                  </p>
                </VerticalTimelineElement>
              </React.Fragment>
            ))}
          </VerticalTimeline>
        )}
      </div>

      <div className="flex w-full justify-center dark:bg-darkBg">
        <SectionDivider />
      </div>
    </section>
  );
}