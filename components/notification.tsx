import { FunctionComponent } from 'react'

export type Notification = {
    time: string,
    title: string,
    body: string
}
const NotificationItem: FunctionComponent<Notification> = (props) => {
  return (
    <div className='w-full h-24 bg-white dark:bg-white/10 rounded shadow-md p-3 mt-3' >
        <h3 className='text-xl font-bold'>{props.title}</h3>
        <p className='text-ellipsis w-full text-md'>{props.body}</p>
        <span className='text-xs'>{props.time}</span>
    </div>
  )
}

export default NotificationItem