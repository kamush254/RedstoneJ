
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
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-serif font-bold tracking-tight text-jewelry-black">
                REDSTONE <span className="text-jewelry-gold">JEWELRY</span>
              </span>
            </Link>

            {/* Navigation - Desktop */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link 
                to="/" 
                className={`text-sm font-medium transition-colors hover:text-jewelry-gold ${
                  isActive('/') ? 'text-jewelry-gold' : 'text-jewelry-black'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/products" 
                className={`text-sm font-medium transition-colors hover:text-jewelry-gold ${
                  isActive('/products') || location.pathname.startsWith('/products/') 
                    ? 'text-jewelry-gold' 
                    : 'text-jewelry-black'
                }`}
              >
                Collection
              </Link>
              <Link 
                to="/appointment" 
                className={`text-sm font-medium transition-colors hover:text-jewelry-gold ${
                  isActive('/appointment') ? 'text-jewelry-gold' : 'text-jewelry-black'
                }`}
              >
                Book Appointment
              </Link>
              <Link 
                to="/about" 
                className={`text-sm font-medium transition-colors hover:text-jewelry-gold ${
                  isActive('/about') ? 'text-jewelry-gold' : 'text-jewelry-black'
                }`}
              >
                About Us
              </Link>
              <Link to="/admin/login">
                <Button 
                  variant="outline" 
                  className="ml-4 border-jewelry-gold text-jewelry-gold hover:bg-jewelry-gold hover:text-white transition-colors"
                >
                  Admin Portal
                </Button>
              </Link>
            </nav>

            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2 text-jewelry-black rounded-md hover:bg-gray-100 focus:outline-none"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile navigation menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-200 py-4">
            <div className="container mx-auto px-4">
              <nav className="flex flex-col space-y-4">
                <Link 
                  to="/" 
                  className={`text-sm font-medium transition-colors px-2 py-2 rounded-md ${
                    isActive('/') 
                      ? 'text-jewelry-gold bg-gray-50' 
                      : 'text-jewelry-black hover:text-jewelry-gold hover:bg-gray-50'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to="/products" 
                  className={`text-sm font-medium transition-colors px-2 py-2 rounded-md ${
                    isActive('/products') || location.pathname.startsWith('/products/') 
                      ? 'text-jewelry-gold bg-gray-50' 
                      : 'text-jewelry-black hover:text-jewelry-gold hover:bg-gray-50'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Collection
                </Link>
                <Link 
                  to="/appointment" 
                  className={`text-sm font-medium transition-colors px-2 py-2 rounded-md ${
                    isActive('/appointment') 
                      ? 'text-jewelry-gold bg-gray-50' 
                      : 'text-jewelry-black hover:text-jewelry-gold hover:bg-gray-50'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Book Appointment
                </Link>
                <Link 
                  to="/about" 
                  className={`text-sm font-medium transition-colors px-2 py-2 rounded-md ${
                    isActive('/about') 
                      ? 'text-jewelry-gold bg-gray-50' 
                      : 'text-jewelry-black hover:text-jewelry-gold hover:bg-gray-50'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About Us
                </Link>
                <Link 
                  to="/admin/login"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button 
                    variant="outline" 
                    className="w-full border-jewelry-gold text-jewelry-gold hover:bg-jewelry-gold hover:text-white transition-colors"
                  >
                    Admin Portal
                  </Button>
                </Link>
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-jewelry-black text-white">
  {/* WhatsApp floating button */}
  <a 
    href="https://wa.me/254715304355" 
    target="_blank" 
    rel="noopener noreferrer"
    className="fixed bottom-4 right-4 z-50 bg-jewelry-gold text-white p-3 rounded-full shadow-lg hover:bg-opacity-90 transition-all duration-300"
    aria-label="Chat on WhatsApp"
  >
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="currentColor"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
    <span className="sr-only">WhatsApp chat</span>
  </a>

  {/* Footer content */}
  <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      {/* Company info */}
      <div>
        <h3 className="mb-4 text-lg font-serif font-bold text-jewelry-gold">
          REDSTONE JEWELRY
        </h3>
        <p className="mb-4 text-sm text-gray-300">
          Exquisite jewelry crafted with precision and passion, 
          offering timeless elegance for every occasion.
        </p>
        <div className="flex space-x-4">
          {/* Social media icons */}
          <a href="#" className="text-gray-300 hover:text-jewelry-gold transition-colors">
            <span className="sr-only">Facebook</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>
          <a href="https://www.instagram.com/redstonee_jewellery/" className="text-gray-300 hover:text-jewelry-gold transition-colors">
            <span className="sr-only">Instagram</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
          <a href="#" className="text-gray-300 hover:text-jewelry-gold transition-colors">
            <span className="sr-only">Twitter</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Quick links */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-white">Quick Links</h3>
        <ul className="space-y-2 text-sm">
          <li>
            <Link to="/products" className="text-gray-300 hover:text-jewelry-gold transition-colors">
              Our Collection
            </Link>
          </li>
          <li>
            <Link to="/appointment" className="text-gray-300 hover:text-jewelry-gold transition-colors">
              Book an Appointment
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-gray-300 hover:text-jewelry-gold transition-colors">
              About Us
            </Link>
          </li>
          <li>
            <Link to="#" className="text-gray-300 hover:text-jewelry-gold transition-colors">
              Terms & Conditions
            </Link>
          </li>
          <li>
            <Link to="#" className="text-gray-300 hover:text-jewelry-gold transition-colors">
              Privacy Policy
            </Link>
          </li>
        </ul>
      </div>

      {/* Contact info */}
      <div>
        <h3 className="mb-4 text-lg font-semibold text-white">Contact Us</h3>
        <address className="not-italic">
          <p className="mb-2 text-sm text-gray-300">
            <strong className="text-white">Address:</strong><br />
            123 Luxury Avenue<br />
            Nairobi, Kenya
          </p>
          <p className="mb-2 text-sm text-gray-300">
            <strong className="text-white">Phone:</strong><br />
            +254 712 345 678
          </p>
          <p className="mb-2 text-sm text-gray-300">
            <strong className="text-white">Email:</strong><br />
            info@redstonejewelry.com
          </p>
          <p className="text-sm text-gray-300">
            <strong className="text-white">Hours:</strong><br />
            Mon-Sat: 10:00 AM - 7:00 PM<br />
            Sunday: Closed
          </p>
        </address>
      </div>
    </div>

    <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
      <p>&copy; {new Date().getFullYear()} Redstone Jewelry. All rights reserved.</p>
    </div>
  </div>
</footer>
    </div>
  );
};

export default MainLayout;
