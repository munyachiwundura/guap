import Image from 'next/image'
import React, { FunctionComponent } from 'react'


type Props = {
    name: string,
    number: string,
    bank: string,
    accountType: 'Cheque' | 'Savings'
}
const Card: FunctionComponent<Props> = (props) => {
  return (
    <div className='snap-center relative text-white w-[135px] h-[85px] md:w-[335px] md:h-[185px] m-5 flex-shrink-0'>
        <Image width={335} height={185} src={`/img/cards/${props.bank}.svg`}/>
        <p className='absolute md:bottom-10 md:text-lg md:left-5 text-sm bottom-6 left-3'>{props.name}</p>
        <p className='absolute md:bottom-5 md:text-lg md:left-5 text-xs bottom-3 left-3'>{props.number}</p>
        <p className='absolute md:bottom-5 md:text-lg md:right-5  text-sm bottom-9 right-1'>{props.accountType}</p>
    </div>
  )
}

export default Card