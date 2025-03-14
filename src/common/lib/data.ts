import React from 'react';

import campwithusImg from '@/../public/images/camp-with-us.png';
import carcatalogImg from '@/../public/images/car-catalog.png';
import filedriveImg from '@/../public/images/file-drive.png';
import projectmanagementImg from '@/../public/images/project-management.png';
import reactfoodImg from '@/../public/images/react-food.png';
import surgeImg from '@/../public/images/surge.png';
import portfolioImg from '@/../public/images/portfolio.png';
import auditMasterImg from '@/../public/images/audit-master.png';
import citizenLink from '@/../public/images/citizen-link.png';

import {
  BookIcon,
  BriefcaseBusinessIcon,
  LaptopMinimalIcon,
} from 'lucide-react';

export const links = [
  {
    name: 'Home',
    id: 'home',
  },
  {
    name: 'About',
    id: 'about',
  },
  {
    name: 'Projects',
    id: 'projects',
  },
  {
    name: 'Experience',
    id: 'experience',
  },
  {
    name: 'Skills',
    id: 'skills',
  },
  {
    name: 'Contact',
    id: 'contact',
  },
] as const;

export const experiencesData = [
  {
    title: 'Artificial Intelligence and Data Science',
    location: 'TSEC , Bandra',
    description: ` Bachelor of Engineering Degree. Won 1x Hackathon organised by CSI-TSEC in 2024. Won Ideathon organised by IIC-TSEC in 2023. Avg c.g.p.a. - 7.97 `,
    icon: React.createElement(BriefcaseBusinessIcon),
    date: '2022 - 2026 | Present',
  },
  {
    title: 'Web-Dev Intern',
    location: 'Raise Digital',
    description: `Front-end Web Develpoer position. Responsible for implementation of accessible and interactive interface. Working on various projects with team successfully and completed the assigned project and got the Project completiion Certificate.`,
    icon: React.createElement(BookIcon),
    date: ' 2024 | March-April',
  },
  
  {
    title: 'HSC',
    location: 'Sardar Valabhbhai Patel Vidyalaya',
    description: `Cleared Entrance Exams like JEE MAINS'22 AND MHTCET'22 with 93%ile in both. HSC Percentage - 61.67`,
    icon: React.createElement(LaptopMinimalIcon),
    date: '2020 - 2022',
  },

  {
    title: 'SSC',
    location: 'St. Xaviers High School',
    description: `Always among the top 5 toppers list, achieved 9 Certificates of Honour in studies throughout my school. Also excelling in sports, won 5 Certificate of achievement in Athletics/sprint. 
    Percentage - 87`,
    icon: React.createElement(LaptopMinimalIcon),
    date: 'March 2020',
  },
] as const;

export const images = {
  campwithusImg,
  carcatalogImg,
  filedriveImg,
  projectmanagementImg,
  reactfoodImg,
};

export const projectsData = [
  {
    title: 'Colloquy',
    description:
      'Our website generates unique IDs for each session, allowing users to initiate calls without the need for traditional registration. Simply share your generated ID with others, and they can join the conversation instantly.',
    tags: ['React', 'Socket.IO', 'Nodejs', 'Expressjs', 'WebRTC', 'Git', 'yarn/nodemon'],
    imageUrl: campwithusImg,
    sourceCodeLink: 'https://github.com/salifshaikh/Colloquy---Video-Voice-Call-Application',
    liveDemoLink: 'https://colloquy-call-application.onrender.com/', },
  {
    title: 'Portfolio',
    description: `Portfolio that you're currently viewing! This project showcases my work and provides information about me.`,
    tags: [
      'React',
      'TypeScript',
      'Next.js',
      'Framer Motion',
      'Resend API',
      'Tailwind',
    ],
    imageUrl: portfolioImg,
    sourceCodeLink: 'https://github.com/salifshaikh/My_Portfolio',
    liveDemoLink: 'https://salif-portfolio.vercel.app/',  },
  {
    title: 'EduLift',
    description: `Developed an Education Equity platform designed to provide equal learning opportunities for students. The platform offers features such as donation support, access to educational resources through the Google Books API, and a user-friendly interface for managing content.`,
    tags: [
      'React',
      'TypeScript',
      'Next.js',
      'Tailwind',
      'restAPI',
      'Firebase',
      'Node',
      'Express',
      'React-jitsi',
    ],
    imageUrl: auditMasterImg,
    sourceCodeLink: 'https://github.com/salifshaikh/Edulift---Smart-Education',
    liveDemoLink: 'https://salifshaikh.github.io/Edulift-vdo/',  },
  {
    title: 'Kahani AI',
    description:
      'KahaniAI is an AI-driven storytelling platform that leverages multiple LLM models to generate and enhance stories. Whether you want to create short tales, enhance your writing, or convert text into engaging PDFs, KahaniAI has got you covered!',
    tags: [
      'React',
      'Vite',
      'Flask',
      'Spacy',
      'Python',
      'GeminiAPI',
      'Firebase',
      'Tailwind',
      'Cloudinary',
    ],
    imageUrl: surgeImg,
    sourceCodeLink: 'https://github.com/salifshaikh/KahaniAI---A-story-generator-AI-for-writers',
    liveDemoLink: 'https://kahaniai-salifshaikhs-projects.vercel.app/',  },
  {
    title: 'Citizen Link',
    description:
      'The platform is designed to enhance citizen engagement by providing convenient access to a wide range of city services, local news, community events, issue reporting and tracking, emergency alerts, and an interactive map.',
    tags: ['HTML', 'CSS', 'Bootstrap', 'Javascript'],
    imageUrl: citizenLink,
    sourceCodeLink: 'https://github.com/salifshaikh/smart-city',
    liveDemoLink: 'https://salifshaikh.github.io/smart-city/',  },
] as const;

export const skillsData = [
  ['JavaScript', '/svgs/javascript-js.svg'],
  ['TypeScript', '/svgs/typescript-icon.svg'],
  ['React', '/svgs/react.svg'],
  ['Next.js', '/svgs/nextjs.svg'],
  ['Node.js', '/svgs/node-js.svg'],
  ['Express', '/svgs/express-original.svg'],
  ['Firebase', '/svgs/firebase.svg'],
  ['Bootstrap', '/svgs/bootstrap.svg'],
  ['ShadCN', '/svgs/shadcnui.svg'],
  ['Framer', '/svgs/framer.svg'],
  ['Tailwind', '/svgs/tailwind-css.svg'],
  ['MongoDB', '/svgs/mongodb-original.svg'],
  ['MySQL', '/svgs/MySQL.svg'],
  ['HTML', '/svgs/file-type-html.svg'],
  ['CSS', '/svgs/file-type-css.svg'],
  ['Git', '/svgs/git.svg'],
  ['Cloudinary', '/svgs/cloudinary.svg'],
  ['WebRTC', '/svgs/webrtc.svg'],
  ['GitHub', '/svgs/github.svg'],
  ['C', '/svgs/c.svg'],
  ['Python', '/svgs/python.svg'],
  ['Java', '/svgs/java.svg'],
  ['Roadmap', '/svgs/etc.svg']
] as const;
