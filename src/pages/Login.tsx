import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { useToast } from '@/hooks/use-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (isSignUp) {
      toast({
        title: "Account created successfully!",
        description: "Welcome to SynergySphere",
      });
    } else {
      toast({
        title: "Welcome back!",
        description: "You've successfully signed in",
      });
    }
    
    setIsLoading(false);
    navigate('/dashboard');
  };

  const handleForgotPassword = () => {
    toast({
      title: "Reset link sent!",
      description: "Check your email for password reset instructions",
    });
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p className="text-muted-foreground mt-1">
            {isSignUp ? 'Join your team today' : 'Sign in to your account'}
          </p>
        </div>

        {isSignUp && (
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <Button 
          type="submit" 
          className="w-full" 
          disabled={isLoading}
          variant="hero"
        >
          {isLoading ? 'Please wait...' : (isSignUp ? 'Create Account' : 'Sign In')}
        </Button>

        {!isSignUp && (
          <Button 
            type="button" 
            variant="ghost" 
            className="w-full" 
            onClick={handleForgotPassword}
          >
            Forgot Password?
          </Button>
        )}

        <div className="text-center pt-4 border-t">
          <p className="text-sm text-muted-foreground">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          </p>
          <Button 
            type="button" 
            variant="link" 
            onClick={() => setIsSignUp(!isSignUp)}
            className="p-0 h-auto font-medium"
          >
            {isSignUp ? 'Sign In' : 'Create Account'}
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
}