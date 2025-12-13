"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getImageSrc } from "@/lib/utils";

interface TestimonialStyle {
  backgroundColor: string;
  borderColor: string;
  badgeColor: string;
  rotate: string;
  translate: string;
  avatarLocation: string;
  isLeft: boolean;
}

interface TestimonialCardProps {
  testimonial: {
    _id: string;
    quote: string | null;
    role: string | null;
    person: {
      name: string | null;
      img: any; // eslint-disable-line @typescript-eslint/no-explicit-any
    } | null;
  };
  index: number;
}

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

const TestimonialCard = ({ testimonial, index }: TestimonialCardProps) => {
  const imageUrl = testimonial.person?.img
    ? getImageSrc(testimonial.person.img)
    : undefined;
  const style = testimonialStyles[index % testimonialStyles.length];

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -100,
        rotateX: -90,
        scale: 0.8,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
      }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: "easeOut",
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{
        y: -12,
        rotateX: 8,
        scale: 1.05,
        transition: {
          type: "spring",
          stiffness: 400,
          damping: 15,
        },
      }}
      className={`relative flex-shrink-0 w-64 md:w-88 h-fit p-3 md:p-6 pb-8 md:pb-12 rounded-none ${style.backgroundColor} ${style.rotate} ${style.translate} shadow-md shadow-gray-400 cursor-pointer`}
      style={{
        transformOrigin: "center top",
      }}
    >
      <div className="mb-6">
        <p className="text-xs md:text-sm xl:text-base text-gray-800 leading-relaxed ">
          {testimonial.quote}
        </p>
      </div>

      <div
        className={`absolute ${style.avatarLocation} flex items-start space-x-2 z-40`}
      >
        {style.isLeft && (
          <div
            className={`inline-block mt-3 px-2 py-1 ${style.badgeColor} text-white text-xs md:text-sm font-semibold shadow-sm shadow-gray-400`}
          >
            {testimonial.person?.name}
          </div>
        )}

        <Avatar className={`size-20 md:size-24 border-4 ${style.borderColor}`}>
          <AvatarImage
            src={imageUrl}
            alt={testimonial.person?.name || "Testimonial author"}
            className="object-cover"
          />
          <AvatarFallback className="text-lg font-semibold">
            {testimonial.person?.name
              ?.split(" ")
              .map((n) => n[0])
              .join("") || "??"}
          </AvatarFallback>
        </Avatar>

        {!style.isLeft && (
          <div
            className={`inline-block mt-3 px-2 py-1 ${style.badgeColor} text-white text-xs md:text-sm font-semibold shadow-sm shadow-gray-400`}
          >
            {testimonial.person?.name}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
