import { FC, ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const isActive = (path: string): boolean => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Enhanced Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Improved Logo */}
            <Link to="/" className="flex items-center group">
              <img 
                src="/src/assets/images/redlogo.png" 
                alt="Redstone Jewelry Logo" 
                className="h-16 md:h-24 w-auto transform transition-all duration-300 hover:scale-105"
                style={{ padding: '8px 0' }} // Maintain aspect ratio
              />
              {!isMobile && (
                <span className="ml-3 font-serif text-2xl text-jewelry-black group-hover:text-jewelry-gold transition-colors">
                  REDSTONE
                </span>
              )}
            </Link>

            {/* Enhanced Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link 
                to="/" 
                className={`text-base font-medium transition-all ${
                  isActive('/') 
                    ? 'text-jewelry-gold border-b-2 border-jewelry-gold' 
                    : 'text-jewelry-black hover:text-jewelry-gold hover:scale-105'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/products" 
                className={`text-base font-medium transition-all ${
                  isActive('/products') || location.pathname.startsWith('/products/') 
                    ? 'text-jewelry-gold border-b-2 border-jewelry-gold' 
                    : 'text-jewelry-black hover:text-jewelry-gold hover:scale-105'
                }`}
              >
                Collection
              </Link>
              <Link 
                to="/appointment" 
                className={`text-base font-medium transition-all ${
                  isActive('/appointment') 
                    ? 'text-jewelry-gold border-b-2 border-jewelry-gold' 
                    : 'text-jewelry-black hover:text-jewelry-gold hover:scale-105'
                }`}
              >
                Book Appointment
              </Link>
              <Link 
                to="/about" 
                className={`text-base font-medium transition-all ${
                  isActive('/about') 
                    ? 'text-jewelry-gold border-b-2 border-jewelry-gold' 
                    : 'text-jewelry-black hover:text-jewelry-gold hover:scale-105'
                }`}
              >
                About Us
              </Link>
              <Link to="/admin/login">
                <Button 
                  variant="outline" 
                  className="ml-4 border-2 border-jewelry-gold text-jewelry-gold hover:bg-jewelry-gold hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  Admin Portal
                </Button>
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-jewelry-black rounded-lg hover:bg-gray-50 focus:outline-none transition-colors"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-7 w-7" strokeWidth="1.5" />
              ) : (
                <Menu className="h-7 w-7" strokeWidth="1.5" />
              )}
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-sm border-b border-gray-100">
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-3">
                <Link 
                  to="/" 
                  className={`text-base font-medium px-4 py-3 rounded-lg transition-all ${
                    isActive('/') 
                      ? 'text-jewelry-gold bg-jewelry-gold/10' 
                      : 'text-jewelry-black hover:bg-gray-50'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to="/products" 
                  className={`text-base font-medium px-4 py-3 rounded-lg transition-all ${
                    isActive('/products') || location.pathname.startsWith('/products/') 
                      ? 'text-jewelry-gold bg-jewelry-gold/10' 
                      : 'text-jewelry-black hover:bg-gray-50'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Collection
                </Link>
                <Link 
                  to="/appointment" 
                  className={`text-base font-medium px-4 py-3 rounded-lg transition-all ${
                    isActive('/appointment') 
                      ? 'text-jewelry-gold bg-jewelry-gold/10' 
                      : 'text-jewelry-black hover:bg-gray-50'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Book Appointment
                </Link>
                <Link 
                  to="/about" 
                  className={`text-base font-medium px-4 py-3 rounded-lg transition-all ${
                    isActive('/about') 
                      ? 'text-jewelry-gold bg-jewelry-gold/10' 
                      : 'text-jewelry-black hover:bg-gray-50'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About Us
                </Link>
                <Link 
                  to="/admin/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-4"
                >
                  <Button 
                    variant="outline" 
                    className="w-full border-2 border-jewelry-gold text-jewelry-gold hover:bg-jewelry-gold hover:text-white transition-all"
                  >
                    Admin Portal
                  </Button>
                </Link>
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Enhanced Footer */}
      <footer className="bg-jewelry-black text-white relative">
        {/* WhatsApp Button */}
        <a 
          href="https://wa.me/254715304355" 
          target="_blank" 
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 bg-jewelry-gold text-white p-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          aria-label="Chat on WhatsApp"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6"
            viewBox="0 0 24 24" 
            fill="currentColor"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>

        <div className="container mx-auto px-4 py-12 md:px-8 md:py-16">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3 lg:gap-12">
            {/* Brand Section */}
            <div className="space-y-6">
              <div className="flex items-center">
                <img 
                  src="/src/assets/images/redlogo.png" 
                  alt="Redstone Logo" 
                  className="h-16 w-auto mr-3"
                />
                <h3 className="text-2xl font-serif font-bold text-jewelry-gold">
                  REDSTONE
                </h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Crafting timeless elegance with precision and passion. 
                Experience luxury jewelry that tells your unique story.
              </p>
              <div className="flex space-x-5">
                <a href="#" className="text-gray-300 hover:text-jewelry-gold transition-colors">
                  <span className="sr-only">Facebook</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>
                <a href="https://www.instagram.com/redstonee_jewellery/" className="text-gray-300 hover:text-jewelry-gold transition-colors">
                  <span className="sr-only">Instagram</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-jewelry-gold transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Links Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-jewelry-gold">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/products" className="text-gray-300 hover:text-jewelry-gold transition-colors flex items-center group">
                    <span className="group-hover:underline">Our Collection</span>
                    <svg className="ml-2 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </Link>
                </li>
                {/* Repeat similar structure for other links */}
              </ul>
            </div>

            {/* Contact Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-jewelry-gold">Contact Us</h3>
              <address className="not-italic space-y-3">
                <div>
                  <p className="text-white font-medium mb-1">Address</p>
                  <p className="text-gray-300">
                    Tom Mboya Street,<br/>
                    Odeon Midway Mall,<br/>
                    1st Floor Shop U13<br/>
                    Nairobi, Kenya
                  </p>
                </div>
                <div>
                  <p className="text-white font-medium mb-1">Phone</p>
                  <p className="text-gray-300">+254 715 304 355</p>
                </div>
                <div>
                  <p className="text-white font-medium mb-1">Email</p>
                  <p className="text-gray-300">info@redstonejewelry.com</p>
                </div>
              </address>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Redstone Jewelry. Crafting Excellence Since 2020.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;