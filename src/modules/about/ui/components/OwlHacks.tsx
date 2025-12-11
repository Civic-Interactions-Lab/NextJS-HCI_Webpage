import { BorderHeading } from "@/components/AppTitle";
import { LinkButton } from "@/components/AppButton";
import Image from "next/image";

const OwlHacks = () => {
  return (
    <div className="flex flex-col space-y-4 md:space-y-0 mt-3">
      <BorderHeading title="Owl Hacks" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-12 items-center mb-6 md:mb-8">
        <div className="flex flex-col gap-6 order-1 md:order-1">
          <p className="text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed">
            What started as a lab-led initiative has grown into one of
            Temple&apos;s signature student events. Our HCI Lab members continue
            to serve as the core organizing team, shaping its direction,
            mentoring participants, and keeping the spirit of community-driven
            innovation alive. The event is advised by Dr. Stephen MacNeil, who
            also directs the HCI Lab.
          </p>
        </div>

        <div className="order-2 md:order-2 mx-0 md:mx-8">
          <div className="relative  h-64 md:h-72 rounded-bl-[200px] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0"
              alt="OwlHacks team photo"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div className="flex flex-col space-y-3 order-3 md:order-1">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900 font-outfit">
            More than just a Hackathon
          </h3>
          <p className="text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed">
            OwlHacks features panels with HCI Lab alumni now working in the tech
            and design industry, giving students a chance to learn from
            real-world experiences and explore diverse career paths in
            human-centered technology.
          </p>
          <div className="flex">
            <LinkButton
              href="/owlhacks"
              ariaLabel="Learn more about OwlHacks"
              text="More OwlHacks"
            />
          </div>
        </div>

        <div className="relative order-4 md:order-2 mx-0 md:mx-8">
          <div className="h-64 md:h-72 overflow-hidden w-full">
            <Image
              src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0"
              alt="OwlHacks hackathon event"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute top-12 -right-8 rotate-12 bg-orange-300 text-white px-4 py-2 rounded-full font-bold text-sm md:text-base">
              #COMMUNITY
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwlHacks;
