import Link from "next/link";
import Image from "next/image";

const CallToActionSection = () => {
  return (
    <section className="w-full bg-well-red overflow-hidden">
      <div className="flex w-full justify-between items-center pl-0 md:pl-8 h-48 md:h-56 relative max-w-7xl mx-auto">
        <div className="flex-1 flex-col w-full justify-center items-center md:items-start text-center md:text-left px-16 ml-0 md:ml-6 md:px-0 z-10">
          <p className="text-2xl md:text-4xl text-white font-medium font-outfit mb-4">
            Interested in joining?
          </p>

          <div>
            <Link
              href="https://docs.google.com/forms/d/e/1FAIpQLScuzv5spPPiuG0sSvb7KFvMucBhJtgParffTVDwC7dWefcCMQ/viewform"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="border-3 border-white rounded-sm px-8 md:px-16 py-1.5 w-fit mb-8 mx-auto md:mx-0 cursor-pointer hover:bg-white hover:text-well-red text-sm md:text-lg text-white font-medium font-outfit transition-colors duration-300 ease-in-out">
                Apply to Join Us
              </div>
            </Link>
          </div>

          <div className="w-full h-3 md:h-4 bg-[#FF5E7E]" />
        </div>

        <div className="hidden md:block">
          <Image
            src="/logos/hci-logo-white.png"
            alt="Temple University HCI Lab logo - Human-Computer Interaction Research Laboratory"
            className="size-96 shrink-0"
            width={384}
            height={384}
            loading="lazy"
            itemProp="logo"
            role="img"
          />
        </div>

        <div className="block md:hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30">
          <Image
            src="/logos/hci-logo-white.png"
            alt="Temple University HCI Lab logo - Human-Computer Interaction Research Laboratory"
            className="size-48 shrink-0"
            width={192}
            height={192}
            loading="lazy"
            itemProp="logo"
            role="img"
          />
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
