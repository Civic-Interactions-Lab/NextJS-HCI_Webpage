import {
  getGenAIEducationResearch,
  getAccessibilityTechnologyResearch,
  getSocialComputingResearch,
} from "@/sanity/lib/research/getResearch";
import ResearchIntro from "@/modules/research/ui/components/research-intro";
import ResearchCategory from "@/modules/research/ui/components/research-category";

const CATEGORIES = [
  {
    label: "Gen AI & Education",
    tagline:
      "Generative AI in education is the use of advanced AI tools that can create text, images, code, and other content to support teaching and learning.",
    videoUrl: "https://www.youtube.com/embed/Pq-d6wipGRQ?si=wMHHvnP0XLIiwFAc",
    videoTitle: "AI-Powered Learning Revolution",
    videoDescription:
      "Discover how generative AI is transforming education through personalized learning experiences, automated content creation, and intelligent tutoring systems that adapt to each student's unique learning style and pace.",
    accent: "bg-well-red",
  },
  {
    label: "Accessibility Technology",
    tagline:
      "Accessibility technology empowers everyone to connect, create, and participate — no barriers, just possibilities.",
    videoUrl: "https://www.youtube.com/embed/QuJmaYuhKH0?si=ZFBhZ6LFrTgnHrwN",
    videoTitle: "Breaking Barriers with Accessible Technology",
    videoDescription:
      "Explore our innovative approaches to creating inclusive digital experiences that empower users with disabilities through voice interfaces, haptic feedback, and adaptive technologies that make technology accessible to everyone.",
    accent: "bg-sky",
  },
  {
    label: "Social Computing",
    tagline:
      "Social Computing connects people through technology, turning interaction into innovation.",
    videoUrl: "https://www.youtube.com/embed/Dv6UydkbkgY?si=xlsh193YsrcW5cgz",
    videoTitle: "The Future of Social Computing",
    videoDescription:
      "Learn about our groundbreaking research in collaborative platforms, digital wellbeing, and virtual communities that are reshaping how people connect, learn, and solve problems together in the digital age.",
    accent: "bg-grass",
  },
];

const ResearchView = async () => {
  const [genAI, accessibility, socialComputing] = await Promise.all([
    getGenAIEducationResearch(),
    getAccessibilityTechnologyResearch(),
    getSocialComputingResearch(),
  ]);

  const researchData = [genAI, accessibility, socialComputing];

  return (
    <div className="space-y-0">
      <div className="pb-8">
        <ResearchIntro />
      </div>

      {CATEGORIES.map((cat, i) => (
        <ResearchCategory
          key={cat.label}
          {...cat}
          research={researchData[i]}
          index={i}
        />
      ))}
    </div>
  );
};

export default ResearchView;
