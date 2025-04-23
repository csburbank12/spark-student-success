
import { Check, Leaf } from "lucide-react";

export const LoginHeader = () => {
  return (
    <div className="flex flex-col items-center space-y-4 text-center">
      <div className="flex items-center gap-2">
        <div className="relative h-10 w-10">
          <Leaf className="h-10 w-10 text-emerald-500" />
          <Check className="absolute bottom-0 right-0 h-5 w-5 text-emerald-500" />
        </div>
        <div className="flex flex-col items-start">
          <h1 className="text-4xl font-heading font-bold">ThriveTrackED</h1>
          <p className="text-lg text-coral-500 font-medium">Clarity. Care. Growth.</p>
        </div>
      </div>
    </div>
  );
};
