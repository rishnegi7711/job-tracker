import { TriangleAlert } from "lucide-react";

const ErrorState = ({ message }: { message: string }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <TriangleAlert className="text-muted-foreground size-6" />
      <p>{message}</p>
    </div>
  );
};

export default ErrorState;
