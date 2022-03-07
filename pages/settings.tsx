import {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from 'next';
import { getSession } from 'next-auth/react';
import Image from 'next/image';
import SettingButton from '../components/settingButton';
import { AppContext } from '../context';
import { useContext, useState, useEffect } from 'react';
import { signOut } from 'next-auth/react';
import ManageAccount from '../components/manageAccount';
import Backdrop from '../components/backdrop';

const base64ToUint8Array = (base64: any) => {
  const padding = '='.repeat((4 - (base64.length % 4)) % 4);
  const b64 = (base64 + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(b64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

declare global {
  interface Window {
    workbox: any;
  }
}

const Settings: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = (props) => {
  const { state, dispatch } = useContext(AppContext);
  const [notifications, setNotifications] = useState(false);
  const [sync, setSync] = useState(false);
  const [managingAccount, setManagingAccount] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscription, setSubscription] = useState<any>(null);
  const [registration, setRegistration] = useState<any>(null);

  const subscribeOnClick = async (event: any) => {
    event.preventDefault();
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: base64ToUint8Array(
        process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY
      ),
    });
    // TODO: you should call your API to save subscription data on server in order to send web push notification from server
    setSubscription(sub);
    setIsSubscribed(true);
    console.log('web push subscribed!');
    console.log(sub);
  };

  const unsubscribeOnClick = async (event: any) => {
    event.preventDefault();
    await subscription.unsubscribe();
    // TODO: you should call your API to delete or invalidate subscription data on server
    setSubscription(null);
    setIsSubscribed(false);
    console.log('web push unsubscribed!');
  };

  const turnDark = () => {
    dispatch({
      type: state.dark ? 'LIGHT_MODE' : 'DARK_MODE',
    });
  };

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      window.workbox !== undefined
    ) {
      // run only in browser
      navigator.serviceWorker.ready.then((reg) => {
        reg.pushManager.getSubscription().then((sub: any) => {
          if (
            sub &&
            !(
              sub.expirationTime &&
              Date.now() > sub.expirationTime - 5 * 60 * 1000
            )
          ) {
            setSubscription(sub);
            setIsSubscribed(true);
          }
        });
        setRegistration(reg);
      });
    }
  }, []);

  return (
    <>
      {managingAccount && (
        <Backdrop onClick={() => setManagingAccount(false)}>
          <ManageAccount user={props.user} />
        </Backdrop>
      )}
      <main className="dark:bg-white/10 md:pt-[200px] bg-black/5 md:ml-[130px] pt-16 md:mr-auto dark:text-white  min-h-[90vh] mt-16 md:grid md:grid-cols-2 md:grid-rows-2 gap-6 p-8 pb-[300px] md:pb-0 z-10 relative w-[80vw] rounded">
        <h1 className="text-3xl absolute w-full text-center font-bold top-6">
          Settings
        </h1>
        <section>
          <h1 className="text-3xl">Account</h1>
          <div className="flex items-center mb-5">
            <div>
              <Image
                alt="Image of Munyaradzi"
                className="w-24 h-24 rounded-full"
                src={props.user.image}
                width={100}
                height={100}
              />
            </div>
            <div className="ml-6">
              <p className="text-xl font-bold">{props.user?.name}</p>
              <p className="text-xs">{props.user?.email}</p>
            </div>
          </div>
          <SettingButton
            active={false}
            icon="tools"
            onClick={() => setManagingAccount(true)}
            title="Manage Account"
            toggle={false}
          />
          <SettingButton
            active={false}
            icon="box-arrow-left"
            onClick={() => signOut()}
            title="Sign Out"
            toggle={false}
          />
        </section>
        <section>
          <h1 className="text-3xl">Preferences</h1>
          <SettingButton
            active={isSubscribed}
            icon="bell"
            onClick={() =>
              isSubscribed ? unsubscribeOnClick : subscribeOnClick
            }
            title="Notifications"
            toggle={true}
          />
          <SettingButton
            active={state.dark}
            icon="moon"
            onClick={() => turnDark()}
            title="Night Mode"
            toggle={true}
          />
          <SettingButton
            active={sync}
            icon="arrow-repeat"
            onClick={() => setSync(!sync)}
            title="Sync"
            toggle={true}
          />
          <h1 className="text-3xl mt-5">Help</h1>
          <SettingButton
            active={false}
            icon="info-circle"
            onClick={() => console.log('')}
            title="Help"
            toggle={false}
          />
        </section>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (req) => {
  const session = await getSession(req);
  if (!session) {
    req.res.writeHead(303, { Location: '/' });
  }
  return {
    props: {
      user: session?.user,
    },
  };
};

export default Settings;
