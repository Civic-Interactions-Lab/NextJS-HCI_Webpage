import React from "react";
import { Accordion } from "@/components/ui/accordion";
import { ResearchAccordionItem } from "@/modules/research/ui/components/ResearchAccordionItem";

const researchData = {
  researchTopics: [
    {
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
      research: [
        {
          title:
            "CoNotate: Suggesting Queries Based on Notes Promotes Knowledge Discovery | CHI 2021",
          description:
            "CoNotate offers query suggestions based on analyzing the searcher's notes and previous searches for patterns and gaps in information. This approach helped searchers issue significantly more queries, and discover more domain-specific terms than standard web search. This demonstrates how search can leverage user-generated content to help people get started when exploring complex, multi-faceted information spaces.",
          image: "/images/cover/6-studio.JPG",
          actions: [
            { label: "PDF", icon: "/src/assets/icons/pdf-icon.png", url: "#" },
            {
              label: "Demo",
              icon: "/src/assets/icons/demo-icon.png",
              url: "#",
            },
            {
              label: "Code",
              icon: "/src/assets/icons/code-icon.png",
              url: "#",
            },
            {
              label: "Cite",
              icon: "/src/assets/icons/cite-icon.png",
              url: "#",
            },
          ],
        },
        {
          title:
            "InterWeave: Presenting Suggestions in Context Scaffolds Information Search and Synthesis | UIST 2022",
          description:
            "InterWeave mines the emergent structure of a searchers' notes and places contextual search guidance suggestions within this structure. This approach helped search actively, gather information, and connect newly discovered information to existing knowledge, compared to current search. This demonstrates how search can leverage user-generated content and structure to help people explore and make sense of complex information spaces.",
          image: "/images/cover/6-studio.JPG",
          actions: [
            { label: "PDF", icon: "/src/assets/icons/pdf-icon.png", url: "#" },
            {
              label: "Talk",
              icon: "/src/assets/icons/talk-icon.png",
              url: "#",
            },
            {
              label: "Cite",
              icon: "/src/assets/icons/cite-icon.png",
              url: "#",
            },
          ],
        },
        {
          title:
            "Sensecape: Enabling Multilevel Exploration and Sensemaking with Large Language Models | UIST 2023",
          description:
            "Sensecape is an interactive system designed to support complex information tasks with an LLM by enabling users to manage the complexity of information through multilevel abstraction and switch seamlessly between foraging and sensemaking. Sensecape empowers users to explore more topics and structure their knowledge hierarchically, thanks to the externalization of levels of abstraction.",
          image: "/images/cover/6-studio.JPG",
          actions: [
            { label: "PDF", icon: "/src/assets/icons/pdf-icon.png", url: "#" },
            {
              label: "Demo",
              icon: "/src/assets/icons/demo-icon.png",
              url: "#",
            },
            {
              label: "Code",
              icon: "/src/assets/icons/code-icon.png",
              url: "#",
            },
            {
              label: "Cite",
              icon: "/src/assets/icons/cite-icon.png",
              url: "#",
            },
          ],
        },
      ],
      defaultOpen: true,
    },
    {
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
      research: [
        {
          title:
            "CoNotate: Suggesting Queries Based on Notes Promotes Knowledge Discovery | CHI 2021",
          description:
            "CoNotate offers query suggestions based on analyzing the searcher's notes and previous searches for patterns and gaps in information. This approach helped searchers issue significantly more queries, and discover more domain-specific terms than standard web search. This demonstrates how search can leverage user-generated content to help people get started when exploring complex, multi-faceted information spaces.",
          image: "/images/cover/6-studio.JPG",
          actions: [
            { label: "PDF", icon: "/src/assets/icons/pdf-icon.png", url: "#" },
            {
              label: "Demo",
              icon: "/src/assets/icons/demo-icon.png",
              url: "#",
            },
            {
              label: "Code",
              icon: "/src/assets/icons/code-icon.png",
              url: "#",
            },
            {
              label: "Cite",
              icon: "/src/assets/icons/cite-icon.png",
              url: "#",
            },
          ],
        },
        {
          title:
            "InterWeave: Presenting Suggestions in Context Scaffolds Information Search and Synthesis | UIST 2022",
          description:
            "InterWeave mines the emergent structure of a searchers' notes and places contextual search guidance suggestions within this structure. This approach helped search actively, gather information, and connect newly discovered information to existing knowledge, compared to current search. This demonstrates how search can leverage user-generated content and structure to help people explore and make sense of complex information spaces.",
          image: "/images/cover/6-studio.JPG",
          actions: [
            { label: "PDF", icon: "/src/assets/icons/pdf-icon.png", url: "#" },
            {
              label: "Talk",
              icon: "/src/assets/icons/talk-icon.png",
              url: "#",
            },
            {
              label: "Cite",
              icon: "/src/assets/icons/cite-icon.png",
              url: "#",
            },
          ],
        },
        {
          title:
            "Sensecape: Enabling Multilevel Exploration and Sensemaking with Large Language Models | UIST 2023",
          description:
            "Sensecape is an interactive system designed to support complex information tasks with an LLM by enabling users to manage the complexity of information through multilevel abstraction and switch seamlessly between foraging and sensemaking. Sensecape empowers users to explore more topics and structure their knowledge hierarchically, thanks to the externalization of levels of abstraction.",
          image: "/images/cover/6-studio.JPG",
          actions: [
            { label: "PDF", icon: "/src/assets/icons/pdf-icon.png", url: "#" },
            {
              label: "Demo",
              icon: "/src/assets/icons/demo-icon.png",
              url: "#",
            },
            {
              label: "Code",
              icon: "/src/assets/icons/code-icon.png",
              url: "#",
            },
            {
              label: "Cite",
              icon: "/src/assets/icons/cite-icon.png",
              url: "#",
            },
          ],
        },
      ],
    },
    {
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
      research: [
        {
          title:
            "CoNotate: Suggesting Queries Based on Notes Promotes Knowledge Discovery | CHI 2021",
          description:
            "CoNotate offers query suggestions based on analyzing the searcher's notes and previous searches for patterns and gaps in information. This approach helped searchers issue significantly more queries, and discover more domain-specific terms than standard web search. This demonstrates how search can leverage user-generated content to help people get started when exploring complex, multi-faceted information spaces.",
          image: "/images/cover/6-studio.JPG",
          actions: [
            { label: "PDF", icon: "/src/assets/icons/pdf-icon.png", url: "#" },
            {
              label: "Demo",
              icon: "/src/assets/icons/demo-icon.png",
              url: "#",
            },
            {
              label: "Code",
              icon: "/src/assets/icons/code-icon.png",
              url: "#",
            },
            {
              label: "Cite",
              icon: "/src/assets/icons/cite-icon.png",
              url: "#",
            },
          ],
        },
        {
          title:
            "InterWeave: Presenting Suggestions in Context Scaffolds Information Search and Synthesis | UIST 2022",
          description:
            "InterWeave mines the emergent structure of a searchers' notes and places contextual search guidance suggestions within this structure. This approach helped search actively, gather information, and connect newly discovered information to existing knowledge, compared to current search. This demonstrates how search can leverage user-generated content and structure to help people explore and make sense of complex information spaces.",
          image: "/images/cover/6-studio.JPG",
          actions: [
            { label: "PDF", icon: "/src/assets/icons/pdf-icon.png", url: "#" },
            {
              label: "Talk",
              icon: "/src/assets/icons/talk-icon.png",
              url: "#",
            },
            {
              label: "Cite",
              icon: "/src/assets/icons/cite-icon.png",
              url: "#",
            },
          ],
        },
        {
          title:
            "Sensecape: Enabling Multilevel Exploration and Sensemaking with Large Language Models | UIST 2023",
          description:
            "Sensecape is an interactive system designed to support complex information tasks with an LLM by enabling users to manage the complexity of information through multilevel abstraction and switch seamlessly between foraging and sensemaking. Sensecape empowers users to explore more topics and structure their knowledge hierarchically, thanks to the externalization of levels of abstraction.",
          image: "/images/cover/6-studio.JPG",
          actions: [
            { label: "PDF", icon: "/src/assets/icons/pdf-icon.png", url: "#" },
            {
              label: "Demo",
              icon: "/src/assets/icons/demo-icon.png",
              url: "#",
            },
            {
              label: "Code",
              icon: "/src/assets/icons/code-icon.png",
              url: "#",
            },
            {
              label: "Cite",
              icon: "/src/assets/icons/cite-icon.png",
              url: "#",
            },
          ],
        },
      ],
    },
  ],
};

const CommonResearchAreas = () => {
  const { researchTopics } = researchData;

  return (
    <>
      <h1 className="font-semibold text-gray-900 !text-2xl md:!text-3xl xl:!text-4xl mb-8 font-outfit">
        Explore common research areas in our lab
      </h1>

      <div className="px-0 md:px-6 mb-16">
        <Accordion
          type="single"
          collapsible
          className="space-y-6"
          defaultValue="research-1"
        >
          {researchTopics.map((topic, index) => (
            <ResearchAccordionItem key={topic.id} topic={topic} index={index} />
          ))}
        </Accordion>
      </div>
    </>
  );
};
export default CommonResearchAreas;
