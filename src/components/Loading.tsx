import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center flex-1 min-h-screen">
      <Loader2 className="animate-spin" />
    </div>
  );
};

export default Loading;
