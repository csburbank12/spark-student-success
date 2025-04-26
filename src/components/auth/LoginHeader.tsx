
import { Logo } from "@/components/branding/Logo";

export const LoginHeader = () => {
  return (
    <div className="text-center space-y-4 animate-fade-in">
      <Logo className="h-12 w-auto mx-auto" />
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          Welcome Back
        </h1>
        <p className="text-sm text-muted-foreground">
          Sign in to continue to your account
        </p>
      </div>
    </div>
  );
};
