import { FunctionComponent, useState, useEffect } from 'react';
import NavItem from './navItem';
import { useRouter } from 'next/router';
import Backdrop from './backdrop';
import Notifications from './notifications';

const SideNavigation: FunctionComponent = () => {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const [notifications, setNotifications] = useState<number>(1);

  const getNotifications = async () => {
    const request = await fetch('api/notifications');
    const data = await request.json();
    setNotifications(data.request.length);
    if (!request.ok) {
      throw Error(request.statusText);
    }
    return data;
  };

  useEffect(() => {
    getNotifications();
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    });
  }, [router.pathname]);
  return (
    <>
      {open && (
        <>
          <Backdrop onClick={() => setOpen(false)} />
          <Notifications />
          <button
            onClick={() => setOpen(false)}
            className="text-3xl mr-10 dark:text-white z-50 absolute top-6 right-6"
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </>
      )}
      <nav className="flex flex-col h-screen fixed top-0 left-0 p-4 items-center justify-between z-30 ">
        <div className="bg-white dark:bg-black absolute w-[100vw] p-6 pb-0 flex justify-between items-center top-0 left-0">
          <h1 className="dark:text-white text-3xl font-bold">GUAP</h1>
          <button
            onClick={() => setOpen(true)}
            className="relative text-3xl mr-10 dark:text-white"
          >
            <i className="bi bi-bell"></i>
            {notifications !== 0 && (
              <p className="absolute top-0 right-0 text-sm w-5 h-5 bg-red-500 rounded-full color-white">
                {notifications}
              </p>
            )}
          </button>
        </div>
        <ul className="left-0 w-[100vw] dark:bg-black dark:text-white py-8 bottom-0 bg-white md:w-auto md:flex-col  flex-row md:relative absolute  mt-10 flex  justify-evenly">
          <NavItem
            href="/"
            title="Home"
            icon={router.pathname === '/' ? 'grid-fill' : 'grid'}
          />
          <NavItem
            href="/wallet"
            title="Wallet"
            icon={router.pathname === '/wallet' ? 'wallet-fill' : 'wallet'}
          />
          <NavItem
            href="/calendar"
            title="Calendar"
            icon={
              router.pathname === '/calendar' ? 'calendar-fill' : 'calendar'
            }
          />
          <NavItem
            href="/settings"
            title="Settings"
            icon={router.pathname === '/settings' ? 'gear-fill' : 'gear'}
          />
          <NavItem href="/logout" title="Logout" icon="box-arrow-left" />
        </ul>
      </nav>
    </>
  );
};

export default SideNavigation;
