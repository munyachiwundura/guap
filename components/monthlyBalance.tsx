import React from 'react'

const months = [
    {month: 'Jan', balance: 50 },
    {month: 'Feb', balance: 850 },
    {month: 'Mar', balance: 950 },
    {month: 'Apr', balance: 1050 },
    {month: 'May', balance: 1150 },
    {month: 'Jun', balance: 1250 },
    {month: 'Jul', balance: 1350 },
    {month: 'Aug', balance: 1450 },
    {month: 'Sep', balance: 1550 },
    {month: 'Oct', balance: 1650 },
    {month: 'Nov', balance: 1750 },
    {month: 'Dec', balance: 1850 },
]

type Month = {
  month: string,
  balance: number
}


const highest = Math.max(...months.map((x, y) => x.balance ))

const MonthlyBalance = () => {
  return (
    <div className=' dark:bg-white/10 relative flex p-6 pt-10 w-[600]  bg-white shadow-md'>
        <h2 className='absolute  top-6 left-6 font-bold text-xl'>Total Balance</h2>
        <div className='w-full overflow-x-scroll no_scrollbar flex items-end justify-between'>
        {months.map((x: Month, y: number) => 
        <div key={y} className='group h-[100%] flex flex-col items-center justify-end '>
            <p className='bg-black text-white  mb-3 rounded p-1 text-sm scale-0 group-hover:scale-100 transition-all'>R {x.balance}</p>
            <div style={{height: `${x.balance/highest * 100 }px`}} className='bg-zinc-400 w-5 rounded hover:bg-black transition-all' ></div>
            <p>{x.month}</p>
        </div>
        )}
        </div>
    </div>
  )
}



export default MonthlyBalance