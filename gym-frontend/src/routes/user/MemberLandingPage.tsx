import { Button } from '@/components/ui/button';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import type { User } from '@/services/useUser';

export default function MemberLandingPage() {
  const navigate = useNavigate();
  const { user } = useOutletContext<{ user: User }>();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome, {user.name}!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full" onClick={() => alert('/edit')}>
            ✏️ Edit Data
          </Button>
          <Button className="w-full" onClick={() => navigate('/memberinfo')}>
            💪🏼 Start Working Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
