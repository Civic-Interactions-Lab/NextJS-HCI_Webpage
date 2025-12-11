import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  role: string;
  image: string;
}

interface TestimonialStyle {
  backgroundColor: string;
  borderColor: string;
  badgeColor: string;
  rotate: string;
  translate: string;
  avatarLocation: string;
  isLeft: boolean;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      "Being a part of the Temple HCI Lab gave me a new perspective on research and design. In the lab, I worked with a talented team on a novel chatbot UI project (Feedstack), which was both challenging and fun! That experience in conversation design helped me land my first full-time role as an Analyst & UX Designer at URBN (Urban Outfitters, Inc) for their retail chatbots. I'm so grateful that but most importantly the memories and people I've met!",
    name: "Hannah Vy Nguyen",
    role: "UX Designer at URBN",
    image: "/images/people/person1.png",
  },
  {
    id: 2,
    quote:
      "Working on real-world projects helped me build a strong portfolio. The mentorship from Dr. MacNeil and the collaborative environment at the Temple HCI Lab were instrumental in my growth as a developer. The skills and experiences I gained there paved the way for my current role as a Software Engineer at Amazon. I'm thankful for the opportunities and connections I made during my time at the lab.",
    name: "Andrew Tran",
    role: "Software Engineer at Amazon",
    image: "/images/people/person2.png",
  },
  {
    id: 3,
    quote:
      "The HCI Lab provided me with hands-on experience in user research and design thinking. Working on accessibility projects opened my eyes to inclusive design principles. The collaborative atmosphere and mentorship helped me transition from computer science to UX design. Now I'm applying these skills as a Product Designer at Microsoft, focusing on accessible technology solutions.",
    name: "Irene Hou",
    role: "Product Designer at Microsoft",
    image: "/images/people/person1.png",
  },
  {
    id: 4,
    quote:
      "The research experience I gained at the HCI Lab was invaluable for my academic journey. Working on data visualization projects and presenting at conferences gave me confidence in my research abilities. The lab's emphasis on human-centered design influenced my PhD research focus. Dr. MacNeil's guidance helped me develop critical thinking skills that I use every day in my doctoral studies.",
    name: "Marcus Chen",
    role: "PhD Student at Carnegie Mellon",
    image: "/images/people/person2.png",
  },
  {
    id: 5,
    quote:
      "Starting as an undergraduate researcher, the HCI Lab gave me my first taste of professional development work. The agile methodology and user testing sessions prepared me for the tech industry. The network I built through the lab led to internship opportunities and eventually my current position. The experience taught me how technology can solve real human problems.",
    name: "Sofia Rodriguez",
    role: "Frontend Developer at Spotify",
    image: "/images/people/person1.png",
  },
];

const testimonialStyles: TestimonialStyle[] = [
  {
    backgroundColor: "bg-yellow-300",
    borderColor: "border-blue-500",
    badgeColor: "bg-blue-500",
    rotate: "rotate-2",
    translate: "-translate-y-2",
    avatarLocation: "-bottom-8 -left-8",
    isLeft: false,
  },
  {
    backgroundColor: "bg-green-300",
    borderColor: "border-green-800",
    badgeColor: "bg-green-800",
    rotate: "-rotate-3",
    translate: "translate-y-3",
    avatarLocation: "-bottom-8 right-12",
    isLeft: false,
  },
  {
    backgroundColor: "bg-pink-300",
    borderColor: "border-orange-500",
    badgeColor: "bg-orange-500",
    rotate: "rotate-1",
    translate: "-translate-y-4",
    avatarLocation: "-bottom-8 -right-6",
    isLeft: true,
  },
  {
    backgroundColor: "bg-purple-300",
    borderColor: "border-yellow-500",
    badgeColor: "bg-yellow-500",
    rotate: "-rotate-1",
    translate: "-translate-y-1",
    avatarLocation: "-bottom-8 right-12",
    isLeft: true,
  },
];

const TestimonyList = () => {
  return (
    <div
      className="flex space-x-8 overflow-x-auto scrollbar-hide pt-6 pb-12 px-10 md:px-12"
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      {testimonials.map((testimonial, index) => {
        const style = testimonialStyles[index % testimonialStyles.length];

        return (
          <div
            key={testimonial.id}
            className={`relative flex-shrink-0 w-64 md:w-88 h-fit p-3 md:p-6 pb-8 md:pb-12 rounded-none ${style.backgroundColor} ${style.rotate} ${style.translate} shadow-md shadow-gray-400`}
          >
            <div className="mb-6">
              <p className="text-xs md:text-sm xl:text-base text-gray-800 leading-relaxed ">
                {testimonial.quote}
              </p>
            </div>

            {/* Profile image */}
            <div
              className={`absolute ${style.avatarLocation} flex items-start space-x-2 z-40`}
            >
              {/* Name badge - left side */}
              {style.isLeft && (
                <div
                  className={`inline-block mt-3 px-2 py-1 ${style.badgeColor} text-white text-xs md:text-sm font-semibold shadow-sm shadow-gray-400`}
                >
                  {testimonial.name}
                </div>
              )}

              <Avatar
                className={`size-20 md:size-24 border-4 ${style.borderColor}`}
              >
                <AvatarImage
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="object-cover"
                />
                <AvatarFallback className="text-lg font-semibold">
                  {testimonial.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              {/* Name badge - right side */}
              {!style.isLeft && (
                <div
                  className={`inline-block mt-3 px-2 py-1 ${style.badgeColor} text-white text-xs md:text-sm font-semibold shadow-sm shadow-gray-400`}
                >
                  {testimonial.name}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TestimonyList;
