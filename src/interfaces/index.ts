
// Product Interface
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: 'ring' | 'necklace' | 'bracelet' | 'earring' | 'watch' | 'other';
  featured: boolean;
  inStock: boolean;
  createdAt: string;
  updatedAt: string;
}

// Appointment Interface
export interface Appointment {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  date: string;
  time: string;
  reason: 'consultation' | 'fitting' | 'purchase' | 'repair' | 'other';
  notes?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
}

// User Interface
export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'staff';
  avatar?: string;
}

// Auth Interface
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
}
