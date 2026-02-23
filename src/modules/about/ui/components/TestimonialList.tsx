import { getTestimonials } from "@/sanity/lib/testimonials/getTestimonials";
import TestimonialCard from "@/modules/about/ui/components/TestimonialCard";
import { SectionHeading } from "@/components/AppTitle";

const TestimonialList = async () => {
  const testimonials = await getTestimonials();

  return (
    <div className="flex flex-1 flex-col space-y-6">
      <SectionHeading title="MULTIPLE INTERDISCIPLINARY PATHWAYS" />
      <div
        className="flex space-x-8 overflow-x-auto scrollbar-hide pt-6 px-10 md:px-12"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          perspective: "1000px",
        }}
      >
        {testimonials.map((testimonial, index) => {
          return (
            <TestimonialCard
              key={testimonial._id}
              testimonial={testimonial}
              index={index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TestimonialList;
