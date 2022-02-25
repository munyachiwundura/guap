import { FunctionComponent, useContext } from 'react';
import SideNavigation from './sideNavigation';
import { AppContext } from '../context';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';

const Layout: FunctionComponent = ({ children }) => {
  const router = useRouter();
  const { state, dispatch } = useContext(AppContext);
  return (
    <>
      {router.pathname === '/login' ? (
        children
      ) : (
        <div className={`${state.dark && 'dark'}`}>
          <div className=" dark:bg-black transition-all duration-300 relative w-[100%] min-h-screen overflow-x-hidden z-0 flex justify-center">
            <SideNavigation />
            <AnimatePresence>
              <motion.div
                key={router.route}
                className="page_transition"
                initial="hidden"
                animate="visible"
                exit="pageExit"
                variants={{
                  hidden: {
                    opacity: 0,
                    x: '100vw',
                  },
                  visible: {
                    opacity: 1,
                    transition: { duration: 1.6 },
                    x: 0,
                    transitionEnd: {
                      x: 0,
                    },
                  },
                  pageExit: {
                    backgroundColor: '#fff',
                    opacity: 1,
                    transition: { duration: 0.8 },
                    x: '-100vw',
                  },
                }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      )}
    </>
  );
};

export default Layout;
