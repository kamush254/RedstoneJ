
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to Home page - changed from '/' to '/about' to avoid potential loop
    navigate('/about');
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-jewelry-lightgold border-t-jewelry-gold rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-xl text-gray-600">Redirecting to Redstone Jewelry...</p>
      </div>
    </div>
  );
};

export default Index;
