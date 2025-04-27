import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/services/authService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const AdminLogin: FC = () => {
  // ... (keep existing logic unchanged)
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      await authService.login(username, password);
      navigate('/admin');
    } catch (err) {
      console.error('Login failed:', err);
      setError('Invalid username or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // If already authenticated, redirect to admin dashboard
  if (authService.isAuthenticated()) {
    navigate('/admin');
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Enhanced Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-serif font-bold text-jewelry-black mb-2 tracking-wide transform hover:scale-105 transition-all duration-300">
            <span className="bg-gradient-to-r from-jewelry-gold to-jewelry-darkgold bg-clip-text text-transparent">
              REDSTONE JEWELRY
            </span>
          </h1>
          <p className="text-sm text-slate-500 uppercase tracking-widest font-medium">
            Admin Portal
          </p>
        </div>

        {/* Enhanced Card Design */}
        <Card className="shadow-xl rounded-2xl border border-white/20 backdrop-blur-sm bg-white/50">
          <CardHeader className="space-y-2 pb-4">
            <CardTitle className="text-3xl font-bold text-slate-800">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-slate-500">
              Enter your credentials to continue
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {error && (
                <Alert variant="destructive" className="border-red-200 bg-red-50">
                  <AlertDescription className="text-red-800">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-slate-700 font-medium">
                    Username
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={loading}
                    className="focus:ring-2 focus:ring-jewelry-gold focus:border-jewelry-gold border-slate-300 rounded-lg py-3 px-4 transition-all duration-200 shadow-sm"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-slate-700 font-medium">
                      Password
                    </Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    className="focus:ring-2 focus:ring-jewelry-gold focus:border-jewelry-gold border-slate-300 rounded-lg py-3 px-4 transition-all duration-200 shadow-sm"
                  />
                </div>
              </div>
            </CardContent>

            <CardFooter>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-jewelry-gold to-jewelry-darkgold hover:from-jewelry-darkgold hover:to-jewelry-gold text-white font-semibold py-3 rounded-xl transform transition-all duration-300 hover:scale-[1.02] shadow-md hover:shadow-lg"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    Signing In...
                  </span>
                ) : (
                  'Sign In'
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>

        {/* Enhanced Footer Link */}
        <div className="text-center">
          <p className="text-sm text-slate-500">
            Need to return to the main site?{' '}
            <a 
              href="/" 
              className="font-medium text-jewelry-gold hover:text-jewelry-darkgold transition-colors duration-200 underline-offset-4 hover:underline"
            >
              Go to Homepage
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;