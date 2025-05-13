import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

export default function GymLoginMobile() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-900 px-4">
      <Card className="w-full max-w-sm rounded-2xl p-6 shadow-lg bg-white">
        <CardContent className="space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome to <br /> Body Master Gym
            </h1>
            {/* <p className="text-sm text-gray-500">Please log in to see your membership</p> */}
          </div>

          <form className="space-y-4">
            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Member ID
              </Label>
              <Input id="id" type="id" name="id" placeholder="#123" className="mt-1" />
            </div>

            <div>
              <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </Label>
              <Input id="password" type="password" name="password" placeholder="••••••••" className="mt-1" />
            </div>

            <Button type="submit" className="w-full mt-2">
              Login
            </Button>
          </form>

          <p className="text-center text-md text-gray-500">
            Hanya visit? <br /> <span className="text-blue-600 ">Silakan hubungi instruktur</span>
          </p>
          <img src="/src/assets/img/bodymaster.png" className="w-1/2 m-auto invert" alt="" />
        </CardContent>
      </Card>
    </div>
  );
}
