"use client";

import ImageCarousel from "@/components/ImageCarousel";
import { BorderHeading } from "@/components/AppTitle";

const labImages = [
  {
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVzZWFyY2glMjB0ZWFtfGVufDB8fDB8fHww",
    alt: "Research team collaboration",
  },
  {
    src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmVzZWFyY2glMjB0ZWFtfGVufDB8fDB8fHww",
    alt: "Lab team working together",
  },
  {
    src: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cmVzZWFyY2glMjB0ZWFtfGVufDB8fDB8fHww",
    alt: "Research lab environment",
  },
  {
    src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHJlc2VhcmNoJTIwdGVhbXxlbnwwfHwwfHx8MA%3D%3D",
    alt: "Lab team discussion",
  },
];

interface LabValuesProps {
  images?: Array<{
    src: string;
    alt: string;
  }>;
}

const LabValues = ({ images = labImages }: LabValuesProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center mt-0 md:mt-12">
      <div className="flex flex-col gap-6">
        <BorderHeading title="Lab Values" />
        <p className="text-sm md:text-lg xl:text-xl text-gray-700 leading-relaxed">
          Our lab is built on values that guide how we learn, create, and work
          together. We prioritize collaboration, curiosity, and
          inclusivity—ensuring every member feels supported and empowered to
          contribute their ideas. We believe in designing with empathy,
          questioning with intention, and pursuing research that makes a
          positive impact on people and technology. These values shape our
          culture, strengthen our community, and drive the meaningful work we do
          every day.
        </p>
      </div>

      <div className="relative">
        <ImageCarousel
          images={images}
          height="h-64 md:h-80"
          roundedClassName="rounded-tl-[100px]"
          showPagination={true}
          showNavigation={true}
          title="Lab Values Gallery"
          description="Images showcasing our lab's collaborative environment"
          priority={true}
        />
      </div>
    </div>
  );
};

export default LabValues;
