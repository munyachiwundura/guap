import { FunctionComponent, useState } from 'react'
import Card from './card'
import CardsSelector from './cardsSelector'
import Input from './input'
import { motion } from 'framer-motion'

const MakeTransactionModal: FunctionComponent = () => {
    const [card, setCard] = useState('')
    const submition: any = async (e: any) => {
        e.preventDefault()
        const form = new FormData(e.target);
        const formData = Object.fromEntries(form.entries())
        console.log(formData)
    } 
  return (
    <motion.div animate={{y: 0}} initial={{y: -300}} className='md:w-[400px] w-72 md:p-5 pb-32 p-2 z-50 bg-white rounded fixed dark:bg-black/90 dark:text-white'>
        <form onSubmit={(e)=> submition(e)}>
        <h1 className='font-bold'>Pick A Card</h1>
        <CardsSelector>
            <div className={card !== 'fnb'? 'opacity-50' : 'opacity-100'} onClick={()=>setCard('fnb')}><Card accountType='Cheque' bank={'fnb'} name='Munyaradzi' number='5555-5555-5555-5555'/></div>
            <div className={card !== 'absa'? 'opacity-50' : 'opacity-100'} onClick={()=>setCard('absa')}><Card accountType='Cheque' bank={'absa'} name='Munyaradzi' number='5555-5555-5555-5555'/></div>
            <div className={card !== 'paypal'? 'opacity-50' : 'opacity-100'} onClick={()=>setCard('paypal')}><Card accountType='Cheque' bank={'paypal'} name='Munyaradzi' number='5555-5555-5555-5555'/></div>
        </CardsSelector>
        <input type='hidden' name='card'value={card} />
        <Input label='Transaction' name='title' onChange={(e) => console.log(e)} placeholder='Buy Groceries' value='' type='text'/>
        <h3 className='text-md font-bold mt-2'>Category:</h3>
        <select className='w-full border-2 dark:bg-black dark:border-white/10 border-black rounded pl-3' name='cars'>
          <option value='home'>Home</option>
          <option value='tutoring'>Tutoring</option>
          <option value='personal'>Personal</option>
        </select>
        <Input label='Ammount' name='ammount' onChange={(e) => console.log(e)} placeholder='0' value='0' type={'number'}/>
        <Input label='Date' name='date' onChange={(e) => console.log(e)} placeholder='Today' value={new Date()} type={'date'}/>
        <h3 className='text-md font-bold mt-2'>Reccurs:</h3>
        <input type='checkbox' name='reccurs'/>
       
        <motion.button whileTap={{scale: 0.9}} layoutId='addTransaction' type='submit' className='dark:bg-white dark:text-black absolute p-3 bottom-6 text-md bg-black text-white rounded right-6'>Add Transaction</motion.button>
        </form>

            
    </motion.div>
  )
}

export default MakeTransactionModal