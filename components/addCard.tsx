import { FunctionComponent, useState } from 'react';
import { motion } from 'framer-motion';
import Card from './card';
import CardsSelector from './cardsSelector';
import Input from './input';
import { useRouter } from 'next/router';

const AddCard: FunctionComponent = () => {
  // In your component body
  const router = useRouter();
  const refreshData = () => router.replace(router.asPath);

  const [card, setCard] = useState('');
  const [name, setName] = useState<any>('Paul Walker');
  const [number, setNumber] = useState<any>('5555-5555-5555-5555');
  const [account, setAccount] = useState<any>('Cheque');
  const [balance, setBalance] = useState<number>(0);

  const submition: any = async (e: any) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const formData = Object.fromEntries(form.entries());

    const request = await fetch('/api/cards/create', {
      method: 'POST',
      body: JSON.stringify(formData),
    });

    const data = await request.json();
    await refreshData();
    if (!request.ok) {
      throw Error(request.statusText);
    }
    return data;
  };

  return (
    <motion.div
      animate={{ y: 0 }}
      initial={{ y: -300 }}
      className="md:w-[400px] w-72 md:p-5 pb-32 p-2 z-50 bg-[#e5e5e5] rounded fixed dark:bg-black/90 dark:text-white"
    >
      <CardsSelector>
        <div className={card !== 'fnb' ? 'opacity-50' : 'opacity-100'}>
          <Card
            onClick={() => setCard('fnb')}
            accountType={account}
            bank={'fnb'}
            name={name}
            number={number}
          />
        </div>
        <div className={card !== 'absa' ? 'opacity-50' : 'opacity-100'}>
          <Card
            onClick={() => setCard('absa')}
            accountType={account}
            bank={'absa'}
            name={name}
            number={number}
          />
        </div>
        <div className={card !== 'paypal' ? 'opacity-50' : 'opacity-100'}>
          <Card
            onClick={() => setCard('paypal')}
            accountType={account}
            bank={'paypal'}
            name={name}
            number={number}
          />
        </div>
      </CardsSelector>
      <form onSubmit={(e) => submition(e)}>
        <input type="hidden" name="bank" value={card} />
        <Input
          label="Name on Card"
          name="name"
          onChange={(e) => setName(e)}
          placeholder={name}
          value=""
          type="text"
        />
        <Input
          label="Account Number"
          name="accountNumber"
          onChange={(e) => setNumber(e)}
          placeholder={number}
          value=""
          type="text"
        />
        <h3 className="text-md font-bold mt-2">Account Type:</h3>
        <select
          className="w-full border-2 dark:bg-black dark:border-white/10 border-black rounded pl-3"
          name="accountType"
        >
          <option onClick={(e) => setAccount('Cheque')} value="Cheque">
            Cheque
          </option>
          <option onClick={(e) => setAccount('Savings')} value="Savings">
            Savings
          </option>
        </select>
        <motion.button
          layoutId="addTransaction"
          whileTap={{ scale: 0.9 }}
          className="dark:bg-white dark:text-black mt-3 p-3 text-md bg-black text-white rounded"
        >
          Add Card
        </motion.button>
      </form>
    </motion.div>
  );
};

export default AddCard;
