import { FunctionComponent, useState } from 'react'
import { motion } from 'framer-motion'
import Card from './card'
import CardsSelector from './cardsSelector' 
import Input from './input'


const AddCard: FunctionComponent = () => {
  const [card, setCard] = useState('')
  const [name, setName] = useState<any>('Paul Walker')
  const [number, setNumber] = useState<any>('5555-5555-5555-5555')
  const [account, setAccount] = useState<any>('Cheque')
  const submition: any = async (e: any) => {
    e.preventDefault()
    const form = new FormData(e.target);
    const formData = Object.fromEntries(form.entries())
    console.log(formData)
} 

  return (
    <motion.div animate={{y: 0}} initial={{y: -300}} className='md:w-[400px] w-72 md:p-5 pb-32 p-2 z-50 bg-[#e5e5e5] rounded fixed dark:bg-black/90 dark:text-white'>
  <CardsSelector>
            <div className={card !== 'fnb'? 'opacity-50' : 'opacity-100'} onClick={()=>setCard('fnb')}><Card accountType={account} bank={'fnb'} name={name} number={number}/></div>
            <div className={card !== 'absa'? 'opacity-50' : 'opacity-100'} onClick={()=>setCard('absa')}><Card accountType={account} bank={'absa'} name={name} number={number}/></div>
            <div className={card !== 'paypal'? 'opacity-50' : 'opacity-100'} onClick={()=>setCard('paypal')}><Card accountType={account} bank={'paypal'} name={name} number={number}/></div>
        </CardsSelector>
        <form onSubmit={(e)=> submition(e)}>
        <input type='hidden' name='card'value={card} />
        <Input label='Name on Card' name='name' onChange={(e) => setName(e)} placeholder={name} value='' type='text'/>
        <Input label='Account Number' name='number' onChange={(e) => setNumber(e)} placeholder={number} value='' type='text'/>
        <h3 className='text-md font-bold mt-2'>Account Type:</h3>
        <select  className='w-full border-2 dark:bg-black dark:border-white/10 border-black rounded pl-3' name='accountType'>
          <option onClick={(e) => setAccount('Cheque') } value='Cheque'>Cheque</option>
          <option onClick={(e) => setAccount('Savings') } value='Savings'>Savings</option>
        </select>
      
      <motion.button layoutId='addTransaction' whileTap={{scale: 0.9}} className='dark:bg-white dark:text-black mt-3 p-3 text-md bg-black text-white rounded'>Add Card</motion.button>
        </form>

    </motion.div>
  )
}

export default AddCard