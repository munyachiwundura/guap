import type {
  NextPage,
  InferGetServerSidePropsType,
  GetServerSideProps,
} from 'next';
import { getSession } from 'next-auth/react';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Login: NextPage = () => {
  return (
    <main className="w-screen h-screen flex items-center justify-center bg-white z-[100] absolute top-0 left-0">
      <div className="">
        <h2 className="text-3xl">Welcome to</h2>
        <h1 className="text-8xl flex items-center">
          G<h1 className="text-blue-400">U</h1>AP
        </h1>
        <p className="text-xl">The only Money Management App You Need</p>
        <div className="mt-5 flex items-center">
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="mr-5 text-white p-3 bg-black rounded"
            onClick={() => signIn()}
          >
            Get Started
          </motion.button>
          <Link href={'/'} passHref>
            <motion.button whileTap={{ scale: 0.9 }} className="text-blue-400">
              Contact Us
            </motion.button>
          </Link>
        </div>
      </div>
      <div>
        <Image
          alt="Cover Image for GUAP"
          src={'/img/welcome.svg'}
          width={500}
          height={500}
        />
      </div>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async (req) => {
  const session = await getSession(req);
  if (session) {
    req.res.writeHead(303, { Location: '/' });
  }
  return {
    props: {
      welcome: 'Welcome',
    },
  };
};

export default Login;
