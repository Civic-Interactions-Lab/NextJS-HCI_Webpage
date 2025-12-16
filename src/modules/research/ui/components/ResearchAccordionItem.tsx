"use client";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ResearchCard } from "@/modules/research/ui/components/ResearchCard";
import Image from "next/image";
import { Research } from "../../../../../sanity.types";

interface ResearchVideo {
  url: string;
  title: string;
  description: string;
}

interface ResearchAreaProps {
  research: Research[];
  index: number;
}

interface AnswerSectionProps {
  answer: string;
}

function AnswerSection({ answer }: AnswerSectionProps) {
  return (
    <div className="mb-12 flex justify-center">
      <div className="w-full relative">
        <div className="border-r-8 border-r-[#9D3747] pl-10 pr-6">
          <h2 className="text-base md:text-lg xl:text-2xl leading-relaxed font-sans text-right font-semibold">
            {answer}
          </h2>
        </div>
      </div>
    </div>
  );
}

interface VideoSectionProps {
  video: ResearchVideo;
}

function VideoSection({ video }: VideoSectionProps) {
  return (
    <div className="mb-8">
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        <div className="w-full lg:w-1/2">
          <div className="relative w-full h-64 lg:h-80 rounded-lg overflow-hidden shadow-lg">
            <iframe
              src={video.url}
              title={video.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            {video.title}
          </h3>
          <p className="text-gray-700 leading-relaxed">{video.description}</p>
        </div>
      </div>
    </div>
  );
}

interface ResearchGridProps {
  topicName: string;
  researchProjects: Research[];
}

function ResearchGrid({ topicName, researchProjects }: ResearchGridProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "50px" });

  if (!researchProjects || researchProjects.length === 0) {
    return null;
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="mt-6"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Our Papers in {topicName}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {researchProjects.map((research) => (
          <ResearchCard key={research._id} research={research} />
        ))}
      </div>
    </motion.div>
  );
}

export function GenAIEducationAccordion({
  research,
  index,
}: ResearchAreaProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "50px" });

  const staticData = {
    id: "research-1",
    question: "Gen AI & Education",
    answer:
      "Generative AI in education is the use of advanced AI tools that can create text, images, code, and other content to support teaching and learning.",
    video: {
      url: "https://www.youtube.com/embed/rwF-X5STYks?si=cCxETc2Z79CAZW7P",
      title: "AI-Powered Learning Revolution",
      description:
        "Discover how generative AI is transforming education through personalized learning experiences, automated content creation, and intelligent tutoring systems that adapt to each student's unique learning style and pace.",
    },
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.6,
        delay: index * 0.2,
        ease: "easeOut",
      }}
    >
      <AccordionItem value={staticData.id} className="rounded-4xl shadow-lg">
        <AccordionTrigger className="px-6 py-2 md:py-4 bg-white! border-2! rounded-full! text-left text-sm! md:text-lg! lg:text-xl! font-medium shadow shadow-gray-300 font-jetbrains-mono">
          <Image
            src="/images/research/gen-ai-logo.png"
            alt={`${staticData.question} logo`}
            width={50}
            height={50}
            className="size-6 md:size-8 object-contain shrink-0"
          />
          <span>{staticData.question}</span>
        </AccordionTrigger>
        <AccordionContent className="px-6 py-5 text-gray-700 leading-relaxed text-sm md:text-lg">
          <AnswerSection answer={staticData.answer} />
          <VideoSection video={staticData.video} />
          <ResearchGrid
            topicName={staticData.question}
            researchProjects={research}
          />
        </AccordionContent>
      </AccordionItem>
    </motion.div>
  );
}

export function AccessibilityTechnologyAccordion({
  research,
  index,
}: ResearchAreaProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "50px" });

  const staticData = {
    id: "research-2",
    question: "Accessibility Technology",
    answer:
      '"Accessibility technology empowers everyone to connect, create, and participate—no barriers, just possibilities."',
    video: {
      url: "https://www.youtube.com/embed/DBxmADjQlI4?si=S6I6XPN3GIaQNeeT",
      title: "Breaking Barriers with Accessible Technology",
      description:
        "Explore our innovative approaches to creating inclusive digital experiences that empower users with disabilities through voice interfaces, haptic feedback, and adaptive technologies that make technology accessible to everyone.",
    },
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.6,
        delay: index * 0.2,
        ease: "easeOut",
      }}
    >
      <AccordionItem value={staticData.id} className="rounded-4xl shadow-lg">
        <AccordionTrigger className="px-6 py-2 md:py-4 bg-white! border-2! rounded-full! text-left text-sm! md:text-lg! lg:text-xl! font-medium shadow shadow-gray-300 font-jetbrains-mono">
          <Image
            src="/images/research/accessibility-logo.png"
            alt={`${staticData.question} logo`}
            width={50}
            height={50}
            className="size-6 md:size-8 object-contain shrink-0"
          />
          <span>{staticData.question}</span>
        </AccordionTrigger>
        <AccordionContent className="px-6 py-5 text-gray-700 leading-relaxed text-sm md:text-lg">
          <AnswerSection answer={staticData.answer} />
          <VideoSection video={staticData.video} />
          <ResearchGrid
            topicName={staticData.question}
            researchProjects={research}
          />
        </AccordionContent>
      </AccordionItem>
    </motion.div>
  );
}

export function SocialComputingAccordion({
  research,
  index,
}: ResearchAreaProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "50px" });

  const staticData = {
    id: "research-3",
    question: "Social Computing",
    answer:
      "Social Computing connects people through technology, turning interaction into innovation.",
    video: {
      url: "https://www.youtube.com/embed/Dv6UydkbkgY?si=xlsh193YsrcW5cgz",
      title: "The Future of Social Computing",
      description:
        "Learn about our groundbreaking research in collaborative platforms, digital wellbeing, and virtual communities that are reshaping how people connect, learn, and solve problems together in the digital age.",
    },
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.6,
        delay: index * 0.2,
        ease: "easeOut",
      }}
    >
      <AccordionItem value={staticData.id} className="rounded-4xl shadow-lg">
        <AccordionTrigger className="px-6 py-2 md:py-4 bg-white! border-2! rounded-full! text-left text-sm! md:text-lg! lg:text-xl! font-medium shadow shadow-gray-300 font-jetbrains-mono">
          <Image
            src="/images/research/social-computing-logo.png"
            alt={`${staticData.question} logo`}
            width={50}
            height={50}
            className="size-6 md:size-8 object-contain shrink-0"
          />
          <span>{staticData.question}</span>
        </AccordionTrigger>
        <AccordionContent className="px-6 py-5 text-gray-700 leading-relaxed text-sm md:text-lg">
          <AnswerSection answer={staticData.answer} />
          <VideoSection video={staticData.video} />
          <ResearchGrid
            topicName={staticData.question}
            researchProjects={research}
          />
        </AccordionContent>
      </AccordionItem>
    </motion.div>
  );
}
