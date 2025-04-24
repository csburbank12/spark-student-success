
import { User } from './index';
import { UserRole } from './roles';

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<User | null>;
  logout: () => void;
  setRole: (role: UserRole, preventRedirect?: boolean) => void;
  refreshSession: () => void;
}
