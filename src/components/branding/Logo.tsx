
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
}

export const Logo = ({ className = '' }: LogoProps) => {
  return (
    <Link to="/dashboard" className={`flex items-center ${className}`}>
      <div className="relative h-8 w-8">
        <img
          src="/lovable-uploads/b02b9954-5929-4fc0-a5d5-843699f92ad6.png"
          alt="ThriveTrackED Logo"
          className="h-full w-full object-contain"
        />
      </div>
    </Link>
  );
};
