import { FunctionComponent } from 'react';

export type Notification = {
  id?: string;
  Date: string;
  title: string;
  content: string;
};
const NotificationItem: FunctionComponent<Notification> = (props) => {
  return (
    <div className="w-full bg-white dark:bg-white/10 rounded shadow-md p-2 mt-3">
      <h3 className="text-lg font-bold">{props.title}</h3>
      <p className="text-ellipsis w-full text-sm">{props.content}</p>
      <span className="text-xs">{props.Date}</span>
    </div>
  );
};

export default NotificationItem;
