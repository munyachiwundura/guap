import { NextPage } from 'next'
import Calendar from 'react-calendar'
import {useState } from 'react'
import TransactionItem from '../components/transactionItem'


const CalendarPage: NextPage = () => {

    const [value, onChange] = useState(new Date())

     const transaction = [
    {ammount: -200,category: {color: '#65dfc9', icon: 'house'}, date: '12 February 2022 at 15: 16', title: 'Gas'},
    {ammount: 200,category: {color: '#3431c2', icon: 'house'}, date: '12 February 2022 at 15: 16', title: 'Gas'},
    {ammount: -200,category: {color: '#FF2C6B', icon: 'house'}, date: '12 February 2022 at 15: 16', title: 'Gas'},
  ]

  return (
    <main className='dark:bg-white/10 bg-black/5 md:ml-[130px] flex justify-center items-center flex-col md:mr-auto dark:text-white min-h-[90vh] mt-16 gap-6 p-8 pb-[300px] md:pb-0 z-10 relative w-[80vw] rounded'>
    
        <h1 className='text-3xl font-bold'>Calendar</h1>
        <div className=' bg-white dark:bg-white/10 p-6 shadow-md' >
        <Calendar className='calendar' value={value} onChange={onChange}/>

        </div>
        <div>
            <h1 className='text-2xl font-bold mb-5' >Transactions</h1>
        {
        transaction.map((x, y) => <TransactionItem key={y} ammount={x.ammount} category={x.category} title={x.title} date={x.date}/>)
      }
        </div>
    </main>
  )
}

export default CalendarPage