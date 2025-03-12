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
import { FiChevronDown } from 'react-icons/fi';

export default function Experience() {
  // Updated threshold to be lower for better detection
  const { ref } = useSectionInView('experience', 0.2);
  const { theme } = useTheme();
  const hasMounted = useHasMounted();
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  // Enhanced timeline element styling - now using CSS instead of inline hover styles
  const timelineElementStyle = (index: number): React.CSSProperties => ({
    background: theme === 'light' ? '#f3f4f6' : 'rgba(255, 255, 255, 0.05)',
    boxShadow: 'none',
    border: theme === 'light'
      ? '1px solid rgba(0, 0, 0, 0.05)'
      : '1px solid rgba(255, 255, 255, 0.1)',
    textAlign: 'left',
    padding: '1.5rem 2rem',
    borderRadius: '12px',
    transition: 'all 0.3s ease',
  });

  // Enhanced animations
  const headingVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 } 
    }
  };

  const floatingArrowVariants = {
    animate: {
      y: [0, -10, 0],
      opacity: [0.3, 1, 0.3],
      transition: {
        y: {
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut",
        },
        opacity: {
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut",
        }
      }
    }
  };

  // Background particles
  const particles = Array.from({ length: 20 }, (_, i) => i);
  
  const particleVariants = {
    animate: (i: number) => ({
      y: [0, -30, 0],
      x: [0, i % 2 === 0 ? 10 : -10, 0],
      opacity: [0, 0.7, 0],
      scale: [0.5, 1, 0.5],
      transition: {
        repeat: Infinity,
        duration: 5 + (i % 5),
        delay: i * 0.2,
        ease: "easeInOut",
      }
    })
  };

  return (
    <section
      id="experience"
      className="relative w-full overflow-hidden scroll-mt-20 py-16 dark:bg-darkBg dark:text-white"
    >
      {/* The main container that needs the ref for intersection detection */}
      <div ref={ref} className="absolute top-0 left-0 w-full h-full pointer-events-none"></div>
      
      {/* Enhanced background effects */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/5 blur-3xl"></div>
        <div className="absolute right-1/4 top-3/4 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/5 blur-3xl"></div>
        <div className="absolute right-1/3 top-1/3 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-500/5 blur-3xl"></div>
        
        {/* Floating particles */}
        {particles.map((i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full ${
              theme === 'light' ? 'bg-blue-400' : 'bg-blue-500'
            }`}
            style={{
              width: `${4 + (i % 8)}px`,
              height: `${4 + (i % 8)}px`,
              left: `${10 + (i * 5)}%`,
              top: `${10 + ((i * 7) % 80)}%`,
              opacity: 0.1,
            }}
            custom={i}
            variants={particleVariants}
            animate="animate"
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={headingVariants}
          className="mb-12"
        >
          <SectionHeading>My Experience & Education</SectionHeading>
          <p className="mx-auto mt-4 max-w-2xl text-center text-gray-600 dark:text-gray-300">
            A timeline of my professional journey and academic achievements that have shaped my expertise.
          </p>
        </motion.div>

        {/* Animated scroll indicator */}
        <motion.div 
          className="flex justify-center mb-8" 
          variants={floatingArrowVariants}
          animate="animate"
        >
          <FiChevronDown className="text-blue-500 dark:text-blue-400" size={28} />
        </motion.div>

        {hasMounted && (
          <VerticalTimeline 
            lineColor={theme === 'light' ? '#d1d5db' : 'rgba(59, 130, 246, 0.3)'}
            animate={true}
          >
            {experiencesData.map((item, index) => (
              <React.Fragment key={index}>
                <div 
                  className="timeline-element-wrapper" 
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  <VerticalTimelineElement
                    className={`vertical-timeline-element--work ${activeIndex === index ? 'timeline-element-active' : ''}`}
                    contentStyle={timelineElementStyle(index)}
                    contentArrowStyle={{
                      borderRight: theme === 'light'
                        ? '0.4rem solid #d1d5db'
                        : '0.4rem solid rgba(255, 255, 255, 0.2)',
                    }}
                    date={item.date}
                    icon={item.icon}
                    position={index % 2 === 0 ? 'left' : 'right'} // Alternates positions
                    iconStyle={{
                      background: theme === 'light' ? '#fff' : 'rgba(255, 255, 255, 0.15)',
                      fontSize: '1.5rem',
                      transition: 'all 0.3s ease',
                    }}
                    visible={true}
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.2 }}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold capitalize text-black dark:text-white text-xl">
                            {item.title}
                          </h3>
                          <p className="!mt-1 font-normal text-gray-700 dark:text-gray-300 flex items-center">
                            <span className="mr-2 text-blue-500 dark:text-blue-400">
                              {theme === 'light' ? '📍' : '🌟'}
                            </span>
                            {item.location}
                          </p>
                        </div>
                        
                        <div className="hidden sm:block">
                          <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                            theme === 'light' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-blue-900/30 text-blue-300'
                          }`}>
                            {item.date}
                          </span>
                        </div>
                      </div>
                      
                      <div className={`mt-4 border-t ${
                        theme === 'light' ? 'border-gray-200' : 'border-gray-700/30'
                      } pt-4`}>
                        <p className="!mt-0 !font-normal text-gray-700 dark:text-white/75 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  </VerticalTimelineElement>
                </div>
              </React.Fragment>
            ))}
          </VerticalTimeline>
        )}
      </div>

      {/* Call to action button */}
      <motion.div 
        className="mt-12 flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        viewport={{ once: true }}
      >
        <a href='/Salif Interview Resume.pdf' download={true}>
        <button className={`group relative overflow-hidden rounded-full px-6 py-3 ${
          theme === 'light' 
            ? 'bg-gray-900 text-white hover:bg-gray-800' 
            : 'bg-blue-600 text-white hover:bg-blue-700'
        } transition-all duration-300`}>
          <span className="relative z-10">Download Full Resume</span>
          <span className="absolute bottom-0 left-0 h-full w-0 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
        </button>
        </a>
      </motion.div>

      <div className="mt-16 flex w-full justify-center dark:bg-darkBg">
        <SectionDivider />
      </div>

      {/* Add custom CSS for hover effects */}
      <style jsx global>{`
        .timeline-element-wrapper:hover .vertical-timeline-element--work {
          transform: translateY(-5px);
        }
        
        .timeline-element-wrapper:hover .vertical-timeline-element-content {
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          border-color: ${theme === 'light' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.3)'} !important;
          background: ${theme === 'light' ? '#f0f9ff' : 'rgba(59, 130, 246, 0.1)'} !important;
        }
        
        .timeline-element-wrapper:hover .vertical-timeline-element-content-arrow {
          border-right: 0.4rem solid ${theme === 'light' ? 'rgba(59, 130, 246, 0.4)' : 'rgba(59, 130, 246, 0.5)'} !important;
        }
        
        .timeline-element-wrapper:hover .vertical-timeline-element-icon {
          background: ${theme === 'light' ? '#e0f2fe' : 'rgba(59, 130, 246, 0.2)'} !important;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2) !important;
        }
      `}</style>
    </section>
  );
}