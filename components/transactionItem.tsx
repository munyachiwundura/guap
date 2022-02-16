import React, { FunctionComponent } from 'react'

type Props = {
    title: string,
    category: {
        color: string,
        icon: string
    },
    date: string,
    ammount: number
}
const TransactionItem: FunctionComponent<Props> = (props) => {
  return (
    <div className=' relative mb-4 shadow-md rounded w-[100%] h-[50px] bg-white flex items-center dark:bg-white/10'>
        <div style={{background: props.category.color}} className='rounded h-[100%] w-[50px] flex items-center justify-center'>
            <i className={`text-white text-3xl bi bi-${props.category.icon}`}></i>
        </div>
        <div className=' flex p-1 justify-between flex-col ml-4 h-[100%]'>
            <p className='dark:text-white text-md font-bold '>{props.title}</p>
            <span className='text-sm dark:text-gray-300 text-gray-800'>{props.date}</span>
        </div>
        <p className={`ml-5 text-2xl  ${props.ammount < 0 ? 'text-red-600' : 'text-green-600'} `}>R {props.ammount}</p>
    </div>
  )
}

export default TransactionItem