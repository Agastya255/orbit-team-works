import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            SynergySphere
          </h1>
          <p className="text-muted-foreground">Work Smarter Together</p>
        </div>
        
        <div className="bg-card border shadow-card rounded-lg p-6 animate-scale-in">
          {children}
        </div>
      </div>
    </div>
  );
}