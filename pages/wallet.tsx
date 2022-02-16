import React from 'react'
import Card from '../components/card'

const Wallet = () => {
  return (
    <main className='dark:bg-white/10 bg-black/5 md:ml-[130px] flex justify-center items-center flex-col md:mr-auto dark:text-white min-h-[90vh] mt-16 gap-6 p-8 pb-[300px] md:pb-0 z-10 relative w-[80vw] rounded'>
        <h1 className='text-3xl font-bold'>Your Cards</h1>
        <div className='md:grid md:grid-cols-2 gap-1 w-fit'>
        <Card accountType='Cheque' bank='fnb' name='Munyaradzi' number='5555-5555-5555-5555'  />
        <Card accountType='Cheque' bank='fnb' name='Munyaradzi' number='5555-5555-5555-5555'  />
        <Card accountType='Cheque' bank='fnb' name='Munyaradzi' number='5555-5555-5555-5555'  />
        <div className='w-[335px] h-[185px] border-2 border-black rounded-[20px] flex flex-col items-center justify-center m-5'>
            <i className='bi bi-plus-lg text-[75px]'></i>
            <p className='font-bold text-lg'>Add a Card</p>
        </div>
        </div>
    </main>
  )
}

export default Wallet