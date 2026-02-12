import { getTestimonials } from "@/sanity/lib/testimonials/getTestimonials";
import TestimonialCard from "@/modules/about/ui/components/TestimonialCard";

const TestimonialList = async () => {
  const testimonials = await getTestimonials();

  console.log(testimonials);

  return (
    <div
      className="flex space-x-8 overflow-x-auto scrollbar-hide pt-6 pb-12 px-10 md:px-12"
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
  );
};

export default TestimonialList;
