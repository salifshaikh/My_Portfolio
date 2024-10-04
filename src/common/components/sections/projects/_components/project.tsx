import { useRef, useState } from 'react';
import { projectsData } from '@/common/lib/data';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

type ProjectProps = (typeof projectsData)[number] & {
  sourceCodeLink: string;
  liveDemoLink: string;
};

export default function Project({
  title,
  description,
  tags,
  imageUrl,
  sourceCodeLink,
  liveDemoLink,
}: ProjectProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['0 1', '1.33 1'],
  });
  const scaleProgess = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgess = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  return (
    <motion.div
      ref={ref}
      style={{
        scale: scaleProgess,
        opacity: opacityProgess,
      }}
      className="group mb-3 last:mb-0 sm:mb-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <section
        className={
          'relative max-w-[52rem] overflow-hidden rounded-lg border transition hover:bg-gray-200 dark:hover:bg-primary-foreground sm:h-[20rem]'
        }
      >
        <div className="flex h-full flex-col px-5 pb-7 pt-4 sm:max-w-[50%] sm:pl-10 sm:pr-2 sm:pt-10 sm:group-even:ml-[18rem]">
          <h3 className="text-2xl font-semibold uppercase">{title}</h3>
          <p className="mt-2 leading-relaxed">{description}</p>
          <ul className="mt-4 flex flex-wrap gap-2 sm:mt-auto">
            {tags.map((tag, index) => (
              <li
                className="rounded-full bg-[#ffcbb4] px-3 py-1 text-[0.7rem] uppercase tracking-wider dark:bg-[#ddbea9] dark:text-black"
                key={index}
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>

        <Image
          src={imageUrl}
          alt="Project I worked on"
          quality={95}
          className="absolute -right-40 top-8 hidden w-[28.25rem] rounded-t-lg transition group-even:-left-40 group-even:right-[initial] group-hover:-translate-x-3 group-hover:translate-y-3 group-hover:-rotate-2 group-hover:scale-[1.04] group-even:group-hover:translate-x-3 group-even:group-hover:translate-y-3 group-even:group-hover:rotate-2 sm:block"
        />

        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-4 left-4 flex space-x-4"
          >
            <Link href={sourceCodeLink} target="_blank">
              <button className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
                Source Code
              </button>
            </Link>
            <Link href={liveDemoLink} target="_blank">
              <button className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600">
                Live Demo
              </button>
            </Link>
          </motion.div>
        )}
      </section>
    </motion.div>
  );
}