
import { User, AuthState } from '@/interfaces';

// Mock users data
const mockUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@redstone.com',
    role: 'admin',
    avatar: 'https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff'
  },
  {
    id: '2',
    username: 'staff',
    email: 'staff@redstone.com',
    role: 'staff',
    avatar: 'https://ui-avatars.com/api/?name=Staff&background=D4AF37&color=000'
  }
];

// Initial auth state
const initialAuthState: AuthState = {
  user: null,
  isAuthenticated: false,
  token: null
};

// Simulating persistence (localStorage)
const loadAuthState = (): AuthState => {
  if (typeof window !== 'undefined') {
    const savedAuthState = localStorage.getItem('redstone_auth');
    if (savedAuthState) {
      return JSON.parse(savedAuthState);
    }
  }
  return initialAuthState;
};

const saveAuthState = (authState: AuthState): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('redstone_auth', JSON.stringify(authState));
  }
};
const API_URL = import.meta.env.VITE_API_BASE_URL + '/users';



export const authService = {
  // Get current auth state
  getCurrentAuthState: (): AuthState => {
    return loadAuthState();
  },

  // Login
  login: async (username: string, password: string): Promise<AuthState> => {
    const response = await fetch(`${API_URL}?username=${username}&password=${password}`);
    const users = await response.json();

    if (users.length === 0) {
      throw new Error('Invalid credentials');
    }

    const user = users[0];
    const authState: AuthState = {
      user,
      isAuthenticated: true,
      token: `mock-token-${user.id}-${Date.now()}`
    };

    saveAuthState(authState);
    return authState;
  },

  // Logout
  logout: async (): Promise<void> => {
    saveAuthState(initialAuthState);
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    const authState = loadAuthState();
    return authState.isAuthenticated && !!authState.token;
  },

  // Get current user
  getCurrentUser: (): User | null => {
    const authState = loadAuthState();
    return authState.user;
  },

  // Check if user has admin role
  isAdmin: (): boolean => {
    const authState = loadAuthState();
    return authState.isAuthenticated && authState.user?.role === 'admin';
  }
};