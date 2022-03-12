import { useEffect } from 'react';
import { NextPage } from 'next';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

const Logout: NextPage = () => {
  const router = useRouter();
  useEffect(() => {
    signOut();
    router.push('/login');
  });
  return (
    <div>
      <h1>Signing you Out</h1>
    </div>
  );
};

export default Logout;
