import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface CustomButtonProps {
  text: string;
  ariaLabel: string;
}

const CustomButton = ({ text, ariaLabel, ...props }: CustomButtonProps) => {
  return (
    <Button
      className="!bg-black text-white !rounded-full hover:!bg-gray-700 transition-colors w-fit uppercase !p-3 md:!p-5 xl:!p-6"
      size="sm"
      aria-label={ariaLabel}
      {...props}
    >
      <p className="text-xs md:text-sm xl:text-lg font-bold font-jetbrains-mono">
        {text}
      </p>
      <ArrowRight className="size-4 md:size-5 xl:size-6" />
    </Button>
  );
};

interface NavButtonProps {
  text: string;
  ariaLabel: string;
  href: string;
}

const NavButton = ({ href, ...props }: NavButtonProps) => {
  return (
    <Link href={href}>
      <CustomButton {...props} />
    </Link>
  );
};

export { CustomButton, NavButton };
