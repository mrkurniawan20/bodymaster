import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Ghost } from 'lucide-react';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-50 text-center">
      {/* <Ghost className="w-16 h-16 text-gray-400 mb-4" /> */}
      <img src="/src/assets/img/bodymaster.png" alt="" className="my-5 invert" />
      <h1 className="text-3xl font-bold text-gray-800 mb-2">404 - Page Not Found</h1>
      <p className="text-sm text-gray-500 mb-6">Sorry, the page you're looking for doesn't exist or has been moved.</p>
      <Button onClick={() => navigate('/')} className="w-full max-w-xs">
        Login Page
      </Button>
    </div>
  );
}
