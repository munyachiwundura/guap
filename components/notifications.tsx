import React from 'react'
import {motion} from 'framer-motion'
import type { Notification } from './notification'
import NotificationItem from './notification'

const Notifications = () => {
    const notifications : Notification[] = [
        {body: 'hello', time: 'Thursday 1 june 2018', title: 'Incomming Money'},
        {body: 'hello', time: 'Thursday 1 june 2018', title: 'Incomming Money'},
        {body: 'hello', time: 'Thursday 1 june 2018', title: 'Incomming Money'},
        {body: 'hello', time: 'Thursday 1 june 2018', title: 'Incomming Money'},
    ]
  return (
    <motion.div animate={{x: 0}}  initial={{x: 300}} className='fixed dark:text-white dark:bg-black/90 flex flex-col items-center w-80 z-50 h-full bg-white/90 right-0 top-0'>
        <h1 className='text-xl font-bold ml-3 mt-6 self-start'>Notifications</h1>
        <div className='w-[90%] flex flex-col items-center'>
            {notifications.map((x: Notification ,y:number) => 
            <NotificationItem key={y} body={x.body} time={x.time} title={x.title}/>
            )}
        </div>
    </motion.div>
  )
}

export default Notifications