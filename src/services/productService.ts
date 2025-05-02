
import { Product } from '@/interfaces';

// Mock product data
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Diamond Eternity Ring',
    description: 'An exquisite diamond eternity ring set in 18k white gold, symbolizing endless love and commitment.',
    price: 85000, // KSH
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    category: 'ring',
    featured: true,
    inStock: true,
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z'
  },
  {
    id: '2',
    name: 'Sapphire Pendant Necklace',
    description: 'A stunning sapphire pendant necklace, crafted with precision and elegance in 18k yellow gold.',
    price: 120000, // KSH
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    category: 'necklace',
    featured: true,
    inStock: true,
    createdAt: '2023-01-02T00:00:00.000Z',
    updatedAt: '2023-01-02T00:00:00.000Z'
  },
  {
    id: '3',
    name: 'Emerald Tennis Bracelet',
    description: 'A luxurious emerald tennis bracelet, set in 18k white gold with 25 perfectly matched emeralds.',
    price: 175000, // KSH
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    category: 'bracelet',
    featured: false,
    inStock: true,
    createdAt: '2023-01-03T00:00:00.000Z',
    updatedAt: '2023-01-03T00:00:00.000Z'
  },
  {
    id: '4',
    name: 'Ruby Drop Earrings',
    description: 'Elegant ruby drop earrings with diamond accents, a perfect addition to your jewelry collection.',
    price: 95000, // KSH
    images: [
      'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    category: 'earring',
    featured: false,
    inStock: true,
    createdAt: '2023-01-04T00:00:00.000Z',
    updatedAt: '2023-01-04T00:00:00.000Z'
  },
  {
    id: '5',
    name: 'Luxury Diamond Watch',
    description: 'A handcrafted luxury watch with diamond-studded bezel and genuine leather strap.',
    price: 350000, // KSH
    images: [
      'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    category: 'watch',
    featured: true,
    inStock: true,
    createdAt: '2023-01-05T00:00:00.000Z',
    updatedAt: '2023-01-05T00:00:00.000Z'
  },
  {
    id: '6',
    name: 'Pearl Stud Earrings',
    description: 'Classic pearl stud earrings set in 14k gold, perfect for everyday elegance.',
    price: 45000, // KSH
    images: [
      'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    category: 'earring',
    featured: false,
    inStock: true,
    createdAt: '2023-01-06T00:00:00.000Z',
    updatedAt: '2023-01-06T00:00:00.000Z'
  }
];

const API_URL = import.meta.env.VITE_API_BASE_URL + '/products';



export const productService = {
  // Get all products
  getAllProducts: async (): Promise<Product[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return await response.json();
  },

  // Get featured products
  getFeaturedProducts: async (): Promise<Product[]> => {
    const response = await fetch(`${API_URL}?featured=true`);
    if (!response.ok) {
      throw new Error('Failed to fetch featured products');
    }
    return await response.json();
  },

  // Get product by ID
  getProductById: async (id: string): Promise<Product | null> => {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error('Failed to fetch product by ID');
    }
    return await response.json();
  },

  // Get products by category
  getProductsByCategory: async (category: Product['category']): Promise<Product[]> => {
    const response = await fetch(`${API_URL}?category=${category}`);
    if (!response.ok) {
      throw new Error('Failed to fetch products by category');
    }
    return await response.json();
  },

  // Create new product (Admin only)
  createProduct: async (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData)
    });
    if (!response.ok) {
      throw new Error('Failed to create product');
    }
    return await response.json();
  },

  // Update product (Admin only)
  updateProduct: async (id: string, productData: Partial<Product>): Promise<Product | null> => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData)
    });
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error('Failed to update product');
    }
    return await response.json();
  },

  // Delete product (Admin only)
  deleteProduct: async (id: string): Promise<boolean> => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      if (response.status === 404) return false;
      throw new Error('Failed to delete product');
    }
    return true;
  }
};