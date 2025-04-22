
import { FC, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import ImageGallery from '@/components/shared/ImageGallery';
import { Button } from '@/components/ui/button';
import { productService } from '@/services/productService';
import { Product } from '@/interfaces';
import { Separator } from '@/components/ui/separator';

const ProductDetail: FC = () => {
  const { id } = useParams<{ id: string }>();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const fetchedProduct = await productService.getProductById(id);
        
        if (!fetchedProduct) {
          setError('Product not found');
          return;
        }
        
        setProduct(fetchedProduct);
        
        // Fetch related products (same category)
        const allProducts = await productService.getProductsByCategory(fetchedProduct.category);
        const filtered = allProducts.filter(p => p.id !== id).slice(0, 3);
        setRelatedProducts(filtered);
        
        setError(null);
      } catch (err) {
        console.error('Failed to fetch product:', err);
        setError('Failed to load product. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const formatPrice = (price: number): string => {
    return `KSH ${price.toLocaleString()}`;
  };

  const getCategoryName = (category: Product['category']): string => {
    const categories: Record<Product['category'], string> = {
      'ring': 'Rings',
      'necklace': 'Necklaces',
      'bracelet': 'Bracelets',
      'earring': 'Earrings',
      'watch': 'Watches',
      'other': 'Other Jewelry'
    };
    
    return categories[category] || 'Jewelry';
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto py-16 px-4 sm:px-6 flex justify-center">
          <div className="w-12 h-12 border-4 border-jewelry-lightgold border-t-jewelry-gold rounded-full animate-spin"></div>
        </div>
      </MainLayout>
    );
  }

  if (error || !product) {
    return (
      <MainLayout>
        <div className="container mx-auto py-16 px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-jewelry-black mb-4">
            {error || 'Product not found'}
          </h2>
          <p className="text-gray-600 mb-8">
            The product you're looking for may have been removed or is temporarily unavailable.
          </p>
          <Link to="/products">
            <Button 
              className="bg-jewelry-gold hover:bg-jewelry-darkgold text-white"
            >
              Browse Our Collection
            </Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {/* Breadcrumbs */}
      <div className="bg-gray-50 py-4 px-4 sm:px-6">
        <div className="container mx-auto">
          <nav className="text-sm">
            <ol className="list-none p-0 inline-flex text-gray-600">
              <li className="flex items-center">
                <Link to="/" className="hover:text-jewelry-gold">Home</Link>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </li>
              <li className="flex items-center">
                <Link to="/products" className="hover:text-jewelry-gold">Collection</Link>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </li>
              <li className="flex items-center">
                <Link 
                  to={`/products?category=${product.category}`} 
                  className="hover:text-jewelry-gold"
                >
                  {getCategoryName(product.category)}
                </Link>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </li>
              <li>
                <span className="text-gray-800 font-medium">{product.name}</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Product Detail */}
      <section className="py-12 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product Images */}
            <div>
              <ImageGallery images={product.images} productName={product.name} />
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-3xl font-serif font-bold text-jewelry-black mb-2">
                {product.name}
              </h1>
              
              <p className="text-2xl font-medium text-jewelry-gold mb-6">
                {formatPrice(product.price)}
              </p>

              <div className="prose max-w-none text-gray-700 mb-8">
                <p>{product.description}</p>
              </div>

              <Separator className="my-6" />

              <div className="mb-8">
                <h3 className="text-lg font-medium text-jewelry-black mb-4">Details</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex">
                    <span className="w-32 font-medium">Category:</span>
                    <span>{getCategoryName(product.category)}</span>
                  </li>
                  <li className="flex">
                    <span className="w-32 font-medium">Availability:</span>
                    <span>{product.inStock ? 'In Stock' : 'Out of Stock'}</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <Link to="/appointment">
                  <Button 
                    className="w-full bg-jewelry-gold hover:bg-jewelry-darkgold text-white"
                    size="lg"
                  >
                    Book Appointment to View
                  </Button>
                </Link>
                
                <p className="text-sm text-gray-600 text-center">
                  Experience this exquisite piece in person at our showroom.
                  <br />Book a private consultation with our jewelry specialists.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-12 px-4 sm:px-6 bg-gray-50">
          <div className="container mx-auto">
            <h2 className="text-2xl font-serif font-bold text-jewelry-black mb-4 text-center">
              You May Also Like
            </h2>
            <div className="w-24 h-1 bg-jewelry-gold mx-auto mb-8"></div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <Link to={`/products/${relatedProduct.id}`} className="block relative aspect-square">
                    <img
                      src={relatedProduct.images[0]}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </Link>
                  <div className="p-4">
                    <Link to={`/products/${relatedProduct.id}`} className="block">
                      <h3 className="text-lg font-medium text-jewelry-black hover:text-jewelry-gold transition-colors">
                        {relatedProduct.name}
                      </h3>
                    </Link>
                    <p className="mt-1 font-medium text-jewelry-gold">
                      {formatPrice(relatedProduct.price)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </MainLayout>
  );
};

export default ProductDetail;
