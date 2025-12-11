import React from "react";
import { BorderHeading } from "@/components/AppTitle";
import Image from "next/image";

const SocialEvents = () => {
  return (
    <div className="flex flex-col space-y-4 md:space-y-0 pt-6 md:pt-12">
      <BorderHeading title="SOCIAL EVENTS" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-12 items-center mb-6 md:mb-8">
        <div className="flex flex-col gap-6 order-1 md:order-1">
          <p className="text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed">
            Events play an important role in creating a welcoming and connected
            community within the HCI Lab. We intentionally design gatherings—
            workshops, socials, icebreakers, and open houses—to help students
            meet one another, build trust, and feel supported. These moments
            give new and returning members space to form relationships, share
            experiences, and feel at home in the lab, strengthening the
            collaborative culture we value.
          </p>
        </div>

        <div className="relative order-2 md:order-2 mx-0 md:mx-8">
          <div className="h-64 md:h-72">
            <Image
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0"
              alt="HCI Lab team gathering"
              fill
              className="object-cover rounded-br-[150px]"
              priority
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div className="flex flex-col space-y-3 order-3 md:order-1">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900 font-outfit">
            &quot;Let&apos;s play ball!&quot;
          </h3>
          <p className="text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed">
            Our social events are organized by members of the lab and offer a
            relaxed way to take a break, meet new people, and strengthen our
            community. Whether it&apos;s games, food, or quick hangouts, these
            moments help us connect beyond research and get to know each other
            better.
          </p>
        </div>

        <div className="relative order-4 md:order-2 mx-0 md:mx-8">
          <div className="relative h-64 md:h-72 w-full">
            <Image
              src="https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0"
              alt="Lab members playing basketball"
              fill
              className="object-cover rounded-tl-[150px]"
              priority
            />
            <div className="absolute bottom-16 -left-8 -rotate-16 bg-blue-500 text-white px-4 py-2 rounded-full font-bold text-sm md:text-base shadow-lg">
              #TEAM
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialEvents;
