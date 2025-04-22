
import { FC, ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { authService } from '@/services/authService';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: FC<AdminLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const user = authService.getCurrentUser();
  
  const isActive = (path: string): boolean => {
    return location.pathname === path;
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // If not authenticated, redirect to login
  if (!authService.isAuthenticated()) {
    navigate('/admin/login');
    return null;
  }

  const navItems = [
    { label: 'Dashboard', path: '/admin' },
    { label: 'Products', path: '/admin/products' },
    { label: 'Appointments', path: '/admin/appointments' },
  ];

  const renderNavItems = () => (
    <ul className="space-y-2">
      {navItems.map((item) => (
        <li key={item.path}>
          <Link
            to={item.path}
            onClick={() => setSidebarOpen(false)}
            className={`flex items-center p-2 rounded-lg ${
              isActive(item.path)
                ? 'bg-jewelry-gold text-white'
                : 'text-gray-800 hover:bg-jewelry-lightgold'
            }`}
          >
            <span>{item.label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Admin Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/admin" className="flex items-center">
              <span className="text-xl font-serif font-bold tracking-tight text-jewelry-black">
                REDSTONE <span className="text-jewelry-gold">ADMIN</span>
              </span>
            </Link>

            <div className="flex items-center space-x-4">
              {/* User info */}
              <div className="hidden md:flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-jewelry-gold text-white flex items-center justify-center">
                  {user?.username.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium">{user?.username}</span>
              </div>

              {/* Logout button */}
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleLogout}
                className="border-jewelry-gold text-jewelry-gold hover:bg-jewelry-gold hover:text-white"
              >
                Logout
              </Button>

              {/* Mobile menu button */}
              {isMobile && (
                <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="md:hidden">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="3" y1="12" x2="21" y2="12" />
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <line x1="3" y1="18" x2="21" y2="18" />
                      </svg>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-64">
                    <div className="flex flex-col h-full">
                      <div className="py-4 border-b">
                        <Link to="/admin" className="flex items-center" onClick={() => setSidebarOpen(false)}>
                          <span className="text-xl font-bold">REDSTONE</span>
                        </Link>
                      </div>
                      <nav className="flex-1 py-4">
                        {renderNavItems()}
                      </nav>
                    </div>
                  </SheetContent>
                </Sheet>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main content with sidebar */}
      <div className="flex flex-1">
        {/* Sidebar - Desktop only */}
        <aside className="hidden md:block w-64 bg-white border-r border-gray-200 shrink-0">
          <div className="p-4 h-full">
            <nav>
              {renderNavItems()}
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
