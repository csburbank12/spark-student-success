
import { Logo } from "@/components/branding/Logo";

export const LoginHeader = () => {
  return (
    <div className="text-center space-y-4">
      <Logo className="h-12 w-auto mx-auto" />
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Welcome Back</h1>
        <p className="text-sm text-muted-foreground">
          Sign in to continue to your account
        </p>
      </div>
    </div>
  );
};
