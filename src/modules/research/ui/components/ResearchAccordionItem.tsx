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

export interface ResearchAction {
  label: string;
  icon: string;
  url: string;
}

export interface ResearchProject {
  title: string;
  description: string;
  image: string;
  actions: ResearchAction[];
}

export interface ResearchVideo {
  url: string;
  title: string;
  description: string;
}

export interface ResearchTopic {
  id: string;
  question: string;
  answer: string;
  video?: ResearchVideo;
  research: ResearchProject[];
  defaultOpen?: boolean;
}

interface ResearchAccordionItemProps {
  topic: ResearchTopic;
  index: number;
}

export function ResearchAccordionItem({
  topic,
  index,
}: ResearchAccordionItemProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "50px" });

  const getLogoForTopic = (topicId: string) => {
    switch (topicId) {
      case "research-1":
        return "/images/research/gen-ai-logo.png";
      case "research-2":
        return "/images/research/accessibility-logo.png";
      case "research-3":
        return "/images/research/social-computing-logo.png";
      default:
        return null;
    }
  };

  const logoPath = getLogoForTopic(topic.id);

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
      <AccordionItem
        key={topic.id}
        value={topic.id}
        className="rounded-4xl shadow-lg"
      >
        <AccordionTrigger className="px-6 py-2 md:py-4 !bg-white !border-2 !rounded-full text-left !text-sm md:!text-lg lg:!text-xl font-medium shadow shadow-gray-300 font-jetbrains-mono">
          {logoPath && (
            <Image
              src={logoPath}
              alt={`${topic.question} logo`}
              width={50}
              height={50}
              className="size-6 md:size-8 object-contain flex-shrink-0"
            />
          )}
          <span>{topic.question}</span>
        </AccordionTrigger>
        <AccordionContent className="px-6 py-5 text-gray-700 leading-relaxed text-sm md:text-lg">
          {topic.answer && <AnswerSection answer={topic.answer} />}

          {topic.video && <VideoSection video={topic.video} />}

          <ResearchGrid topicName={topic.question} projects={topic.research} />
        </AccordionContent>
      </AccordionItem>
    </motion.div>
  );
}

interface AnswerSectionProps {
  answer: string;
}

function AnswerSection({ answer }: AnswerSectionProps) {
  return (
    <div className="mb-12 flex justify-center">
      <div className="w-full relative">
        {/* Text Content with Red Bar */}
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
        {/* Video */}
        <div className="w-full lg:w-1/2">
          <div className="relative w-full h-64 lg:h-80 rounded-lg overflow-hidden shadow-lg">
            <iframe
              src={video.url}
              title={video.title}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Text Content */}
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
  projects: ResearchProject[];
}

export function ResearchGrid({ topicName, projects }: ResearchGridProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "50px" });

  if (!projects || projects.length === 0) {
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
        {projects.map((research, index) => (
          <ResearchCard key={index} research={research} />
        ))}
      </div>
    </motion.div>
  );
}
