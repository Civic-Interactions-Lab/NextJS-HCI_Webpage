import { cn } from "@/lib/utils";

interface TitleProps {
  title: string;
  classname?: string;
}

function Title({ title, classname }: TitleProps) {
  return (
    <h2
      className={cn(
        "font-bold text-gray-900 !text-2xl md:!text-3xl xl:!text-4xl mb-4",
        classname,
      )}
    >
      {title}
    </h2>
  );
}

function BorderTitle({ title }: TitleProps) {
  return (
    <div className="w-fit flex-col px-2 md:px-4 xl:px-6 py-1 md:py-2 xl:py-3 border-3 border-primary-red-800">
      <h2 className="uppercase text-lg md:text-2xl xl:text-4xl text-primary-red-800 !font-jetbrains-mono !font-bold">
        {title}
      </h2>
    </div>
  );
}

export { Title, BorderTitle };
