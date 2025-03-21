"use client";

import SectionDivider from "@/common/components/shared/section-divider";
import TextAnimation from "./_components/text-animation";
import { useSectionInView } from "@/common/lib/hooks";
import { useActiveSectionContext } from "@/common/stores/active-section";
import { smoothScrollTo } from "@/common/lib/utils";
import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import Image from "next/image";
import { useTheme } from "next-themes"; // Import useTheme hook
import React, { useState, useEffect } from "react";

export default function Hero() {
  const { ref } = useSectionInView("home");
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();
  const { theme } = useTheme(); // Use the theme hook
  const [backgroundVideo, setBackgroundVideo] = useState('');

  useEffect(() => {
    const videoUrl = theme === "dark"
      ? "https://cdn.pixabay.com/video/2024/02/23/201735-916310640_large.mp4"
      : "https://cdn.pixabay.com/video/2019/08/13/26011-353916142_large.mp4";
    setBackgroundVideo(videoUrl);
  }, [theme]);


  return (
    <>
      <section
        className="relative flex h-screen w-full scroll-mt-36 flex-col items-center justify-center overflow-hidden"
        id="home"
        ref={ref}
      >
        <div
          className={
            "absolute left-0 top-0 h-screen w-full dark:bg-[#0000007c]"
          }
        ></div>
                <video
          autoPlay
          loop
          muted
          playsInline
          key={backgroundVideo}
          className="absolute top-0 left-0 w-full h-full object-cover -z-1 filter blur-xl scale-110 overflow-hidden"
          style={{ filter: 'blur(5px)' }}
        >
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="container flex flex-col items-start justify-center tracking-wide text-black dark:text-white">
          <div className="container relative flex h-full w-full flex-col items-center">
            <div className="h-72 w-[280px] text-center text-[2rem] font-extrabold sm:w-[520px] md:w-[700px] lg:mb-5 lg:w-[920px] lg:text-[3rem]">
              <motion.span
                initial={{ y: -100, x: "-50%", opacity: 0 }}
                animate={{ y: 0, x: "-50%", opacity: 1 }}
                className="mb-10 text-start font-extrabold"
              >
                Hey!
              </motion.span>
              <br />
              <TextAnimation delay={1} baseText={`I'm Salif`} />
            </div>
            <motion.div
              className="w-92 flex flex-col items-center justify-center gap-3 px-4 text-sm font-medium md:mt-12 md:flex-row lg:text-lg"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.1,
              }}
            >
              <a
                className="group flex w-64 cursor-pointer items-center justify-center gap-2 rounded-full bg-darkBg px-7 py-3 text-white outline-none transition hover:bg-white hover:text-black hover:dark:text-black sm:w-auto"
                onClick={(e) => { 
                  smoothScrollTo({ e, id: "contact" });
                  setActiveSection("contact");
                  setTimeOfLastClick(Date.now());
                }}
              >
                <span>Contact me here</span>
              </a>

              <a
                className="borderBlack group flex w-64 cursor-pointer items-center justify-center gap-2 rounded-full bg-white px-7 py-3 text-black outline-none transition hover:bg-gray-100 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 sm:w-auto"
                href="/Salif Interview Resume.pdf"
                download
              >
                <span>Download Resume</span>
              </a>

              <div className="flex gap-2">
                <a
                  className="borderBlack flex h-[50px] w-[50px] cursor-pointer items-center justify-center gap-2 rounded-full bg-white p-2 text-black transition hover:bg-gray-100 hover:text-gray-950 dark:bg-white/10 dark:text-white/60 dark:hover:bg-white/20"
                  href="https://www.linkedin.com/in/salifshaikh/"
                  target="_blank"
                >
                  <Linkedin />
                </a>
                <a
                  className="borderBlack flex h-[50px] w-[50px] cursor-pointer items-center justify-center gap-2 rounded-full bg-white p-2 text-gray-700 transition hover:bg-gray-100 hover:text-gray-950 dark:bg-white/10 dark:text-white/60 dark:hover:bg-white/20"
                  href="https://github.com/salifshaikh"
                  target="_blank"
                >
                  <Image
                    width={25}
                    height={25}
                    src={"/svgs/github.svg"}
                    alt="github icon"
                  />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <div className="flex w-full justify-center dark:bg-darkBg">
        <SectionDivider />
      </div>
    </>
  );
}
