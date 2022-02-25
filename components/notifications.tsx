import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Notification } from './notification';
import NotificationItem from './notification';

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>();

  const getNotifications = async () => {
    const request = await fetch('/api/notifications');
    const data = await request.json();
    console.log(data);

    setNotifications(data.request);
    if (!request.ok) {
      throw Error(request.statusText);
    }
    return data;
  };

  const clearNotifications = async () => {
    setNotifications([]);
  };

  const deleteNotification = async (x: string | undefined) => {
    if (notifications) {
      const index = notifications.findIndex((i) => i.id === x);
      console.log(x, index);
      let mutation = notifications;
      mutation.splice(index, 1);
      setNotifications([]);
      setNotifications(mutation);
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <motion.div
      animate={{ x: 0 }}
      initial={{ x: 300 }}
      className="fixed dark:text-white dark:bg-black/90 flex flex-col items-center w-80 z-50 h-full bg-white/90 right-0 top-0"
    >
      <h1 className="text-xl font-bold ml-3 mt-6 self-start">Notifications</h1>
      <div className="w-[90%] flex flex-col items-center">
        {!notifications ? (
          <div className="mt-[40vh]">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity }}
              className="rotate-0"
            >
              <motion.i className="bi bi-arrow-repeat text-5xl"></motion.i>
            </motion.div>
          </div>
        ) : (
          <motion.div transition={{ staggerChildren: 0.5, delayChildren: 0.3 }}>
            {notifications.map((x: Notification, y: number) => (
              <motion.div
                className="cursor-pointer"
                dragSnapToOrigin={true}
                dragConstraints={{ left: 100, right: 100 }}
                onDragEnd={() => deleteNotification(x.id)}
                initial={{ x: 300 }}
                animate={{ x: 0 }}
                key={y}
                drag="x"
              >
                <NotificationItem
                  content={x.content}
                  Date={x.Date}
                  title={x.title}
                />
              </motion.div>
            ))}
            {notifications && (
              <motion.div
                whileTap={{ scale: 0.9 }}
                onClick={() => clearNotifications()}
                className="w-full mt-5 flex justify-end cursor-pointer"
              >
                <i className="bi bi-list font-lg"></i>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Notifications;
