import { Loader2 } from "lucide-react";

const LoadingState = () => {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Loader2 className="animate-spin size-6 text-muted-foreground" />
    </div>
  );
};

export default LoadingState;
