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
    <div className=' relative mb-4 shadow-md rounded min-w-[250px] w-[100%] h-[50px] bg-white flex items-center dark:bg-white/10'>
        <div style={{background: props.category.color}} className=' mx-2 rounded h-[30px] w-[30px] flex items-center justify-center'>
            <i className={`text-white text-xl bi bi-${props.category.icon}`}></i>
        </div>
        <div className=' flex p-1 justify-between flex-col h-[100%]'>
            <p className='dark:text-white text-md font-bold '>{props.title}</p>
            <span className='text-xs dark:text-gray-300 text-gray-800 w-[120px] md:w-[200px] text-ellipsis whitespace-nowrap overflow-x-hidden '>{props.date}</span>
        </div>
        <p className={`ml-5 text-md  ${props.ammount < 0 ? 'text-red-600' : 'text-green-600'} `}>R {props.ammount}</p>
    </div>
  )
}

export default TransactionItem