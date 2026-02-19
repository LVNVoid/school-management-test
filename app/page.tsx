import { Button } from '@/components/ui/button';
import Link from 'next/link';

const RootPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Link href="/dashboard">
        <Button>Go to dashboard</Button>
      </Link>
    </div>
  );
};

export default RootPage;
