import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import ProductCard from '@/components/shared/ProductCard';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { productService } from '@/services/productService';
import { Product } from '@/interfaces';
import backgroundImage from '@/assets/images/bg.jpg';

const Home: FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const products = await productService.getFeaturedProducts();
        setFeaturedProducts(products);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError('Failed to load featured products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative h-[100dvh] overflow-hidden">
  {/* Parallax Background */}
  <div className="absolute inset-0 transform-gpu will-change-transform">
    <img
      src={backgroundImage}
      alt="Luxury jewelry"
      className="w-full h-full object-cover object-center scale-110 sm:scale-100 motion-safe:animate-kenburns"
      loading="eager"
      style={{ transform: 'translateZ(0)' }} // Force hardware acceleration
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/45 to-black/25" />
  </div>

  {/* Floating Jewelry Elements (Subtle Animation) */}
  <div className="hidden sm:block">
    <div className="absolute top-[20%] left-[10%] animate-float-1">
      <div className="w-8 h-8 bg-jewelry-gold/30 rounded-full blur-[20px]" />
    </div>
    <div className="absolute top-[30%] right-[15%] animate-float-2">
      <div className="w-6 h-6 bg-white/20 rounded-full blur-[15px]" />
    </div>
  </div>

  {/* Content */}
  <div className="relative h-full flex flex-col items-center justify-center px-4 text-center">
    <div className="max-w-[480px] w-full space-y-6 transform translate-y-[-10%]">
      {/* Dynamic Text Rotator */}
      <div className="overflow-hidden">
        <h1 className="text-4xl font-serif font-bold text-white leading-[1.15] [text-shadow:0_2px_12px_rgba(0,0,0,0.4)] motion-safe:animate-slide-up">
        Redstone,<br />
          <span className="inline-block mt-2 motion-safe:animate-delayed-fade">
            Nairobi's Premier Jewelry Destination
          
          </span>
        </h1>
      </div>

      {/* Glowing Text Effect */}
      <p className="text-white/90 text-lg leading-relaxed mx-auto max-w-[320px] relative">
        <span className="motion-safe:animate-text-glow">
        Your Destination for Exquisite Gemstone & Diamond Jewelry in Nairobi
        </span>
      </p>

      {/* Hover-enhanced Buttons */}
      <div className="flex flex-col gap-3 w-full mx-auto max-w-[280px]">
        <Link
          to="/products"
          className="block w-full relative overflow-hidden 
                   bg-jewelry-gold text-white py-4 rounded-full 
                   text-lg font-medium transition-all duration-300
                   shadow-lg hover:shadow-xl hover:scale-[1.02]
                   active:scale-95"
        >
          <span className="relative z-10">Explore Collection</span>
          <div className="absolute inset-0 motion-safe:animate-shimmer opacity-0 hover:opacity-30 transition-opacity" />
        </Link>
        
        <Link
          to="/appointment"
          className="block w-full bg-white/10 text-white py-4 rounded-full 
                   text-lg font-medium backdrop-blur-sm border border-white/30
                   transition-all duration-300 hover:bg-white/20 hover:scale-[1.02]
                   active:scale-95"
        >
          <span className="relative z-10">Book Appointment</span>
        </Link>
      </div>
    </div>

    {/* Modern Scroll Indicator */}
    <div className="absolute bottom-8 animate-bounce">
      <div className="w-10 h-16 relative">
        <div className="absolute bottom-0 w-4 h-4 border-2 border-white rounded-full 
                        left-1/2 -translate-x-1/2 animate-pulse" />
        <div className="absolute w-[2px] h-8 bg-white/70 left-1/2 -translate-x-1/2" />
      </div>
    </div>
  </div>

</section>
      {/* Featured Products Section */}
      {/* Featured Products Section */}
<section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
  {/* Decorative elements */}
  <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
    <div className="absolute top-20 -left-20 w-64 h-64 rounded-full bg-jewelry-lightgold opacity-10 blur-3xl"></div>
    <div className="absolute bottom-10 -right-20 w-72 h-72 rounded-full bg-jewelry-lightgold opacity-10 blur-3xl"></div>
  </div>

  <div className="container mx-auto relative z-10">
    <div className="text-center mb-16">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-serif font-bold text-jewelry-black mb-6"
      >
        Featured Collection
      </motion.h2>
      
      <motion.div 
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-24 h-1 bg-jewelry-gold mx-auto mb-6 transform origin-center"
      ></motion.div>
      
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed"
      >
        Discover our handpicked selection of exquisite pieces, each crafted with unparalleled attention to detail and design excellence.
      </motion.p>
    </div>

    {loading ? (
      <div className="flex justify-center py-20">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-jewelry-lightgold border-t-jewelry-gold rounded-full"
        ></motion.div>
      </div>
    ) : error ? (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <p className="text-red-500 text-lg mb-6">{error}</p>
        <Button 
          onClick={() => window.location.reload()} 
          className="mt-4 bg-jewelry-gold hover:bg-jewelry-darkgold text-white transition-all duration-300 transform hover:scale-105 px-8 py-3 rounded-full shadow-lg hover:shadow-xl"
        >
          Try Again
        </Button>
      </motion.div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {featuredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -10 }}
          >
            <ProductCard 
              product={product} 
              featured={true} 
              className="transition-all duration-300 hover:shadow-2xl hover:border-jewelry-lightgold"
            />
          </motion.div>
        ))}
      </div>
    )}

    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="text-center mt-16"
    >
      <Link to="/products">
        <Button 
          variant="outline" 
          size="lg"
          className="border-2 border-jewelry-gold text-jewelry-gold hover:bg-jewelry-gold hover:text-white transition-all duration-300 transform hover:scale-105 px-10 py-4 rounded-full font-medium text-lg shadow-sm hover:shadow-md"
        >
          View Full Collection
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Button>
      </Link>
    </motion.div>
  </div>
</section>

      {/* Luxury Experience Section */}
      <section className="py-16 px-4 sm:px-6 bg-gray-50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-serif font-bold text-jewelry-black mb-4">
                The Redstone Experience
              </h2>
              <div className="w-24 h-1 bg-jewelry-gold mb-6"></div>
              <p className="text-gray-600 mb-4">
              Step into Redstone Jewelry, Nairobi’s premier fine jewelry boutique. Explore our curated selection of stunning gemstone necklaces, elegant diamond rings, and timeless bracelets—all sourced from trusted, ethical suppliers.
              </p>
              <p className="text-gray-600 mb-6">
              Whether you’re marking a special occasion or elevating your everyday style, find the perfect piece that speaks to your unique taste.
              </p>
              <Link to="/appointment">
                <Button 
                  className="bg-jewelry-gold hover:bg-jewelry-darkgold text-white"
                >
                  Book a Consultation
                </Button>
              </Link>
            </div>
            <div className="relative">
              <img 
                src="https://ideogram.ai/assets/image/lossless/response/qpjHUsfFRaqAayDk74-y6Q" 
                alt="Jewelry craftsman at work" 
                className="rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg max-w-xs hidden md:block">
                <p className="text-sm font-medium text-jewelry-gold">
                  "Every piece tells a story of expert craftsmanship and timeless beauty."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-jewelry-black mb-4">
              Explore By Category
            </h2>
            <div className="w-24 h-1 bg-jewelry-gold mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Browse our diverse collection of fine jewelry categories, each offering unique designs and exceptional craftsmanship.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Rings',
                image: 'https://images.unsplash.com/photo-1598560917505-59a3ad559071?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                path: '/products?category=ring'
              },
              {
                title: 'Necklaces',
                image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                path: '/products?category=necklace'
              },
              {
                title: 'Earrings',
                image: 'https://images.pexels.com/photos/2735970/pexels-photo-2735970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                path: '/products?category=earring'
              },
              {
                title: 'Bracelets',
                image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                path: '/products?category=bracelet'
              },
              {
                title: 'Watches',
                image: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                path: '/products?category=watch'
              },
              {
                title: 'Collections',
                image: 'https://images.unsplash.com/photo-1629224316810-9d8805b95e76?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
                path: '/products'
              },
            ].map((category, index) => (
              <Link
                key={index}
                to={category.path}
                className="group relative overflow-hidden rounded-lg shadow-md h-64"
              >
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <h3 className="text-xl text-white font-medium">{category.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 bg-jewelry-black text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-serif font-bold mb-4">
            Find Your Perfect Piece
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Visit our showroom for a personalized luxury experience or book a private consultation with our jewelry experts.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/appointment">
              <Button 
                className="bg-jewelry-gold hover:bg-jewelry-darkgold text-white min-w-[160px] transition-colors duration-300"
                size="lg"
              >
                Book Appointment
              </Button>
            </Link>
            <Link to="/products">
              <Button 
                variant="outline" 
                size="lg"
                className="border-white/10 text-white/10   transition-colors duration-300 hover:bg-white hover:text-jewelry-black min-w-[160px]"
              >
                Browse Collection
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Home;
