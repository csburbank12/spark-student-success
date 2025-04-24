
import { Link } from 'react-router-dom';

interface LogoProps {
  showTagline?: boolean;
  className?: string;
}

export const Logo = ({ showTagline = true, className = '' }: LogoProps) => {
  return (
    <Link to="/dashboard" className={`flex items-center gap-2 ${className}`}>
      <div className="relative h-8 w-8">
        <img
          src="/lovable-uploads/678466b2-f21f-4d66-b1d9-5697652d57b3.png"
          alt="ThriveTrackED Logo"
          className="h-full w-full object-contain"
        />
      </div>
      <div className="flex flex-col items-start">
        <div className="flex items-center">
          <img
            src="/lovable-uploads/0396cfe7-17b1-4642-b8ef-954c3661cbfb.png"
            alt="ThriveTrackED"
            className="h-6 object-contain"
          />
        </div>
        {showTagline && (
          <p className="text-sm text-coral-500 font-medium">
            Clarity. Care. Growth.
          </p>
        )}
      </div>
    </Link>
  );
};
