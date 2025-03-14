"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaFileAlt, FaTrophy } from "react-icons/fa";

export default function Footer() {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  
  const links = [
    { 
      id: "linkedin", 
      href: "https://www.linkedin.com/in/salifshaikh",
      icon: FaLinkedin, 
      label: "LinkedIn",
      hoverColor: "text-linkedin" 
    },
    { 
      id: "github", 
      href: "https://github.com/salifshaikh",
      icon: FaGithub, 
      label: "GitHub",
      hoverColor: "text-github" 
    },
    { 
      id: "resume", 
      href: "/Salif Interview Resume.pdf",
      icon: FaFileAlt, 
      label: "Resume",
      hoverColor: "text-resume",
      download: true
    },
    { 
      id: "achievements", 
      href: "https://salifshaikh.github.io/Certificates-Gallery/",
      icon: FaTrophy, 
      label: "Achievements",
      hoverColor: "text-achievements" 
    }
  ];

  // Staggered animation for icons
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <footer className="w-full bg-gradient-to-b from-transparent to-gray-50 dark:from-transparent dark:to-gray-900/30 pt-8 pb-6 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-t border-gray-200 dark:border-gray-800 pt-6">
          {/* Left side - Copyright and Text */}
          <motion.div 
            className="text-left"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">Salif Shaikh</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 max-w-xs">
              Let's collaborate to build exceptional digital experiences that make a difference.
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-4">
              &copy; {new Date().getFullYear()} Salif Shaikh. All rights reserved.
            </p>
          </motion.div>

          {/* Right side - Social Links */}
          <motion.div 
            className="flex flex-col items-center md:items-end gap-4"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Connect with me</p>
            
            <div className="flex gap-5 items-center">
              {links.map((link) => (
                <motion.div
                  key={link.id}
                  className="relative"
                  variants={item}
                  onHoverStart={() => setHoveredIcon(link.id)}
                  onHoverEnd={() => setHoveredIcon(null)}
                >
                  <motion.a
                    href={link.href}
                    target={!link.download ? "_blank" : undefined}
                    rel={!link.download ? "noopener noreferrer" : undefined}
                    download={link.download}
                    className="flex flex-col items-center group"
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-md dark:shadow-gray-900/30 group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                      <link.icon 
                        size={20} 
                        className={`text-gray-700 dark:text-gray-300 group-hover:${link.hoverColor} transition-colors duration-300`} 
                      />
                    </div>
                    
                    <motion.span
                      className="text-xs mt-2 text-gray-600 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ 
                        opacity: hoveredIcon === link.id ? 1 : 0,
                        y: hoveredIcon === link.id ? 0 : 10
                      }}
                    >
                      {link.label}
                    </motion.span>
                  </motion.a>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Animated Bottom Bar */}
        <div className="relative mt-6 h-1 w-full overflow-hidden">
          <motion.div
            className="absolute bottom-0 left-0 h-full w-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full"
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </div>
      </div>
    </footer>
  );
}