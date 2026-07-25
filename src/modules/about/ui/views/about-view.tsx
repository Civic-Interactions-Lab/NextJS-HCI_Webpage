import AboutIntro from "@/modules/about/ui/components/about-intro";
import StudioTime from "@/modules/about/ui/components/studio-time";
import ConferenceTravel from "@/modules/about/ui/components/conference-travel";
import LearningOutcomes from "@/modules/about/ui/components/learning-outcomes";
import LabValues from "@/modules/about/ui/components/lab-values";

export default function AboutView() {
  return (
    <div className="space-y-32">
      <AboutIntro />
      <StudioTime />
      <ConferenceTravel />
      <LearningOutcomes />
      <LabValues />
    </div>
  );
}
