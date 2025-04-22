
import { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import ProductCard from '@/components/shared/ProductCard';
import { Button } from '@/components/ui/button';
import { productService } from '@/services/productService';
import { Product } from '@/interfaces';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Products: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>(categoryParam || 'all');
  const [sortBy, setSortBy] = useState<string>('featured');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let fetchedProducts: Product[];
        
        if (categoryParam && categoryParam !== 'all') {
          // TypeScript type assertion for category
          fetchedProducts = await productService.getProductsByCategory(
            categoryParam as Product['category']
          );
        } else {
          fetchedProducts = await productService.getAllProducts();
        }

        // Apply sorting
        const sortedProducts = sortProducts(fetchedProducts, sortBy);
        setProducts(sortedProducts);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryParam, sortBy]);

  const sortProducts = (products: Product[], sortOption: string): Product[] => {
    const productsCopy = [...products];
    
    switch (sortOption) {
      case 'featured':
        return productsCopy.sort((a, b) => (a.featured === b.featured ? 0 : a.featured ? -1 : 1));
      case 'price-low':
        return productsCopy.sort((a, b) => a.price - b.price);
      case 'price-high':
        return productsCopy.sort((a, b) => b.price - a.price);
      case 'newest':
        return productsCopy.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      default:
        return productsCopy;
    }
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    
    if (category === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    
    setSearchParams(searchParams);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'ring', name: 'Rings' },
    { id: 'necklace', name: 'Necklaces' },
    { id: 'bracelet', name: 'Bracelets' },
    { id: 'earring', name: 'Earrings' },
    { id: 'watch', name: 'Watches' },
    { id: 'other', name: 'Other' },
  ];

  return (
    <MainLayout>
      {/* Page Header */}
      <section className="bg-gray-50 py-12 px-4 sm:px-6">
        <div className="container mx-auto">
          <h1 className="text-3xl font-serif font-bold text-jewelry-black text-center">
            Our Collection
          </h1>
          <div className="w-24 h-1 bg-jewelry-gold mx-auto mt-4 mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-center">
            Explore our diverse range of exquisite jewelry pieces, each handcrafted with precision and care.
          </p>
        </div>
      </section>

      {/* Filters and Products */}
      <section className="py-12 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar with filters */}
            <div className="w-full lg:w-64 flex-shrink-0">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-medium text-jewelry-black mb-4">Categories</h3>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <Button
                        variant="ghost"
                        className={`w-full justify-start ${
                          activeCategory === category.id
                            ? 'bg-jewelry-lightgold text-jewelry-darkgold font-medium'
                            : 'text-gray-600 hover:text-jewelry-gold'
                        }`}
                        onClick={() => handleCategoryChange(category.id)}
                      >
                        {category.name}
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Products grid */}
            <div className="flex-1">
              {/* Sort options */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-medium text-jewelry-black">
                  {activeCategory === 'all' 
                    ? 'All Products' 
                    : categories.find(c => c.id === activeCategory)?.name || 'Products'}
                </h2>
                <div className="flex items-center">
                  <span className="text-sm text-gray-600 mr-2">Sort by:</span>
                  <Select value={sortBy} onValueChange={handleSortChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator className="mb-6" />

              {/* Product grid */}
              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="w-12 h-12 border-4 border-jewelry-lightgold border-t-jewelry-gold rounded-full animate-spin"></div>
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <p className="text-red-500">{error}</p>
                  <Button 
                    onClick={() => window.location.reload()} 
                    className="mt-4 bg-jewelry-gold hover:bg-jewelry-darkgold text-white"
                  >
                    Try Again
                  </Button>
                </div>
              ) : products.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600">No products found in this category.</p>
                  <Button 
                    onClick={() => handleCategoryChange('all')} 
                    className="mt-4 bg-jewelry-gold hover:bg-jewelry-darkgold text-white"
                  >
                    View All Products
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      featured={product.featured}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Products;
