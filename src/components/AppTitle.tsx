import { cn } from "@/lib/utils";

interface TitleProps {
  title: string;
  className?: string;
}

function Title({ title, className }: TitleProps) {
  return (
    <h2
      className={cn(
        "font-bold text-gray-900 text-2xl! md:text-3xl! xl:text-4xl! mb-4",
        className,
      )}
    >
      {title}
    </h2>
  );
}

function BorderHeading({ title }: TitleProps) {
  return (
    <div className="w-fit flex-col px-2 md:px-4 xl:px-6 py-1 md:py-2 xl:py-2.5 border-3 border-well-red">
      <h2 className="uppercase text-lg md:text-xl xl:text-2xl text-well-red font-jetbrains-mono! font-bold!">
        {title}
      </h2>
    </div>
  );
}

function BorderTitle({ title }: TitleProps) {
  return (
    <div className="w-fit flex-col px-4 md:px-6 xl:px-8 py-1 md:py-2 xl:py-3 border-2 border-well-red">
      <h2 className="uppercase text-base md:text-lg xl:text-xl text-well-red font-jetbrains-mono! font-bold!">
        {title}
      </h2>
    </div>
  );
}

function SectionHeading({ title, className }: TitleProps) {
  return (
    <h2
      className={cn(
        "text-well-red font-jetbrains-mono font-normal text-xl md:text-2xl xl:text-3xl tracking-tight",
        className,
      )}
    >
      {title}
    </h2>
  );
}

export { Title, BorderHeading, BorderTitle, SectionHeading };
