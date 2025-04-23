
import { GraduationCap } from "lucide-react";

export const LoginHeader = () => {
  return (
    <div className="flex flex-col items-center space-y-2 text-center">
      <div className="flex items-center gap-2">
        <GraduationCap className="h-10 w-10 text-primary" />
        <h1 className="text-4xl font-heading font-bold">Spark</h1>
      </div>
      <p className="text-xl text-muted-foreground">Student Success Platform</p>
    </div>
  );
};
