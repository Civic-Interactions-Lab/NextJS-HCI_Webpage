"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const CallToActionSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "50px" });

  return (
    <motion.div
      ref={ref}
      className="w-full bg-primary-red-800 mb-12 mt-4 overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="flex w-full justify-between items-center pl-0 md:pl-8 h-48 md:h-56 relative max-w-7xl mx-auto">
        <motion.div
          className="flex-1 flex-col w-full justify-center items-center md:items-start text-center md:text-left px-16 ml-0 md:ml-6 md:px-0 z-10"
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          <motion.p
            className="text-2xl md:text-4xl text-white font-medium font-outfit mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
          >
            Interested in joining?
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
          >
            <Link href="/join">
              <motion.div
                className="border-3 border-white rounded-sm px-8 md:px-16 py-1.5 w-fit mb-8 mx-auto md:mx-0 cursor-pointer hover:bg-white hover:text-primary-red-800 text-sm md:text-lg text-white font-medium font-outfit transition-colors duration-300 ease-in-out"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(255, 255, 255, 0.2)",
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                Apply to Join Us
              </motion.div>
            </Link>
          </motion.div>

          <motion.div
            className="w-full h-3 md:h-4 bg-[#FF5E7E]"
            initial={{ width: 0 }}
            animate={isInView ? { width: "100%" } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          />
        </motion.div>

        {/* Desktop Logo */}
        <motion.div
          className="hidden md:block"
          initial={{ opacity: 0, x: 30, rotate: -10 }}
          animate={
            isInView
              ? { opacity: 1, x: 0, rotate: 0 }
              : { opacity: 0, x: 30, rotate: -10 }
          }
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <Image
            src="/logos/hci-logo-white.png"
            alt="Temple University HCI Lab logo - Human-Computer Interaction Research Laboratory"
            className="size-96 flex-shrink-0"
            width={384}
            height={384}
            loading="eager"
            decoding="sync"
            itemProp="logo"
            role="img"
          />
        </motion.div>

        {/* Mobile Logo */}
        <motion.div
          className="block md:hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            isInView ? { opacity: 0.3, scale: 1 } : { opacity: 0, scale: 0.8 }
          }
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        >
          <Image
            src="/logos/hci-logo-white.png"
            alt="Temple University HCI Lab logo - Human-Computer Interaction Research Laboratory"
            className="size-48 flex-shrink-0"
            width={192}
            height={192}
            loading="eager"
            decoding="sync"
            itemProp="logo"
            role="img"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CallToActionSection;
