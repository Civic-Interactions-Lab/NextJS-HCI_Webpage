import { BorderHeading } from "@/components/AppTitle";
import { LinkButton } from "@/components/AppButton";
import Image from "next/image";
import TapeTag from "@/components/TapeTag";

const HciOpenHouse = () => {
  return (
    <div className="flex flex-col space-y-6 md:space-y-12 pt-0 md:pt-6">
      <BorderHeading title="HCI OPEN HOUSE" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-12 items-center mb-6 md:mb-8">
        <div className="relative order-2 md:order-1 mx-0 md:mx-8">
          <div className="h-64 md:h-72 overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0"
              alt="HCI Lab Open House with students and researchers"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute top-12 -right-8 rotate-12 bg-pink-300 text-primary-red-900 px-4 py-2 rounded-full font-bold text-sm md:text-base">
              #HCI
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 order-1 md:order-2">
          <p className="text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed">
            At HCI Lab Open House, students and researchers from across Temple
            showcase their latest projects in Human-Computer Interaction. This
            event highlights ongoing work from our undergraduate researchers,
            master&apos;s students, PhD candidates, and Research Scholars
            Program participants. Explore interactive demos, learn about
            emerging ideas shaping the future of technology, and experience
            firsthand why our lab is becoming a growing hub for innovation at
            Temple.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div className="relative order-4 md:order-1 mx-0 md:mx-8">
          <div className=" h-64 md:h-72 overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0"
              alt="Icebreaker activities at HCI Open House"
              fill
              className="object-cover"
            />
            <TapeTag>
              <p className="text-xs md:text-sm font-light font-jetbrains-mono leading-tight break-words whitespace-normal max-w-40 md:max-w-48 line-clamp-3">
                Icebreaker at Open House Description
              </p>
            </TapeTag>
          </div>
        </div>

        <div className="flex flex-col space-y-3 order-3 md:order-2">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900 font-outfit">
            We want you!
          </h3>
          <p className="text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed">
            We want students to get to know the team and connect with current
            members. Students from psychology, computer science, design, and
            related fields are all welcome—anyone curious about Human-Computer
            Interaction can join, learn, and get involved.
          </p>
          <div className="flex">
            <LinkButton
              href="/join"
              ariaLabel="Join the HCI Lab"
              text="JOIN THE LAB"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HciOpenHouse;
