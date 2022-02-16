import React from 'react'
import CategoryItem from './categoryItem'
const category = [
    {title: 'School', ammount: 20, color: '#3431c2'},
    {title: 'House', ammount: 60, color: '#65dfc9'},
    {title: 'Rent', ammount: 120, color: '#8a8a8a'},
    {title: 'Groceries', ammount: 220, color: 'black'},
    
]
const ExpensesDistribution = () => {
    const total = category.reduce((y, x) => y + x.ammount, 0 )
  return (
    <div className='dark:bg-white/10 flex md:mb-0 mb-6 md:ml-4 flex-col p-8 justify-between items-center shadow-md w-[100%] h-72 bg-white relative'>
        <h3 className='absolute text-xl font-bold top-5 left-5'>Last 30 Days</h3>
        <div className='mt-4 rounded-[70px] flex items-center justify-center w-[120px] h-[120px] bg-red-400'>
        <div className=' h-[100px] w-[100px] bg-white rounded-[60px] flex flex-col items-center justify-center'>
            <h3 className='text-xl font-bold'>R {total}</h3>
            <span className='text-sm text-gray-500'>Total Expenses</span>
        </div>
        </div>
        <div className='flex flex-col items-center'>
            <h3 className='text-sm font-bold mt-3 align-text-center'>Income Distribution</h3>
            <div className='flex justify-center flex-wrap w-[100]'>
            {category.map((x ,y) => <CategoryItem key={y} color={x.color} title={x.title}/>)}
            </div>
        </div>
    </div>
  )
}

export default ExpensesDistribution