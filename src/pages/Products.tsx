import { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import ProductCard from '@/components/shared/ProductCard';
import { Button } from '@/components/ui/button';
import { productService } from '@/services/productService';
import { Product } from '@/interfaces';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Products: FC = () => {
  // ... existing state and logic ...
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
      {/* Enhanced Page Header */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-b from-jewelry-lightgold/10 to-white py-8 px-4 sm:px-6"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4">
            <motion.h1
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="text-4xl font-serif font-bold text-jewelry-black"
            >
              Our Collection
            </motion.h1>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '6rem' }}
              className="h-1 bg-jewelry-gold mx-auto rounded-full"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-600 text-lg max-w-2xl mx-auto"
            >
              Explore our diverse range of exquisite jewelry pieces
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Mobile-Optimized Filters & Products */}
      <section className="py-8 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          {/* Mobile-first category selector */}
          <div className="lg:hidden mb-6">
            <div className="overflow-x-auto pb-4">
              <div className="flex space-x-4 w-max px-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                      activeCategory === category.id
                        ? 'bg-jewelry-gold text-white shadow-lg'
                        : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                    }`}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Desktop category sidebar (hidden on mobile) */}
            <div className="hidden lg:block w-72 flex-shrink-0">
              <div className="sticky top-24 space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-medium text-jewelry-black mb-4">Categories</h3>
                  <ul className="space-y-2">
                    {categories.map((category) => (
                      <motion.li 
                        key={category.id}
                        whileHover={{ x: 5 }}
                      >
                        <Button
                          variant="ghost"
                          className={`w-full justify-start text-base ${
                            activeCategory === category.id
                              ? 'bg-jewelry-lightgold/30 text-jewelry-darkgold font-semibold'
                              : 'text-gray-600 hover:text-jewelry-gold'
                          }`}
                          onClick={() => handleCategoryChange(category.id)}
                        >
                          {category.name}
                        </Button>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1">
              {/* Sticky Sort Header */}
              <motion.div 
                className="bg-white lg:bg-transparent sticky top-0 z-10 py-4 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <h2 className="text-2xl font-semibold text-jewelry-black">
                    {categories.find(c => c.id === activeCategory)?.name}
                  </h2>
                  <div className="flex items-center w-full sm:w-auto">
                    <Select value={sortBy} onValueChange={handleSortChange}>
                      <SelectTrigger className="w-full rounded-xl border-gray-300">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="featured">Featured</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                        <SelectItem value="newest">Newest</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </motion.div>

              {/* Product Grid */}
              {loading ? (
                <div className="flex justify-center py-12">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                    className="w-14 h-14 border-4 border-jewelry-lightgold/30 border-t-jewelry-gold rounded-full"
                  />
                </div>
              ) : error ? (
                <motion.div 
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  className="text-center p-8 bg-red-50 rounded-xl"
                >
                  <p className="text-red-600 mb-4">{error}</p>
                  <Button 
                    onClick={() => window.location.reload()} 
                    className="bg-jewelry-gold hover:bg-jewelry-darkgold text-white px-8 py-3 rounded-full shadow-sm hover:shadow-md transition-all"
                  >
                    Try Again
                  </Button>
                </motion.div>
              ) : products.length === 0 ? (
                <motion.div 
                  className="text-center p-8 bg-gray-50 rounded-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="mb-6 text-6xl">💎</div>
                  <p className="text-gray-600 mb-4">No products found in this category</p>
                  <Button 
                    onClick={() => handleCategoryChange('all')} 
                    className="bg-jewelry-gold hover:bg-jewelry-darkgold text-white px-8 py-3 rounded-full shadow-sm hover:shadow-md transition-all"
                  >
                    Explore All
                  </Button>
                </motion.div>
              ) : (
                <AnimatePresence>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {products.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ y: -5 }}
                      >
                        <ProductCard 
                          product={product} 
                          featured={product.featured}
                          className="hover:shadow-xl transition-shadow duration-300"
                        />
                      </motion.div>
                    ))}
                  </div>
                </AnimatePresence>
              )}
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Products;