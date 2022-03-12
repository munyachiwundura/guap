import { FunctionComponent, useEffect, useState } from 'react';
import Card from './card';
import CardsSelector from './cardsSelector';
import Input from './input';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

const MakeTransactionModal: FunctionComponent = () => {
  const router = useRouter();
  const [card, setCard] = useState<any>({ bank: '', id: '' });
  const [cards, setCards] = useState([]);
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    const request = await fetch('api/transaction_category');
    const data = await request.json();
    setCategories(data.request);
    if (!request.ok) {
      throw Error(request.statusText);
    }
    return data;
  };

  const getCards = async () => {
    const request = await fetch('api/cards');
    const data = await request.json();
    setCards(data.request);
    console.log(data);
  };

  useEffect(() => {
    getCards();
    getCategories();
  }, []);

  const createCategory = async () => {
    const title = prompt('What is the Title');
    const color = prompt('What Color would the category be');
    const icon = prompt('what Icon would your category be');

    const request = await fetch('/api/transaction_category/create', {
      method: 'POST',
      body: JSON.stringify({
        title: title,
        icon: icon,
        color: color,
      }),
    });

    const data = request.json();
    getCategories();
    if (!request.ok) {
      throw Error(request.statusText);
    }
    return data;
  };
  const refreshData = () => router.replace(router.asPath);

  const submition: any = async (e: any) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const formData = Object.fromEntries(form.entries());

    const request = await fetch('api/transactions/create', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
    const data = await request.json();
    refreshData();
    if (!request.ok) {
      throw Error(request.statusText);
    }
    return data;
  };
  return (
    <motion.div
      animate={{ y: 0 }}
      initial={{ y: -300 }}
      className="md:w-[400px] w-72 md:p-5 pb-32 p-2 z-50 bg-white rounded fixed dark:bg-black/90 dark:text-white"
    >
      <form onSubmit={(e) => submition(e)}>
        <h1 className="font-bold">Pick A Card</h1>
        <CardsSelector>
          {cards.length === 0 && (
            <div className="flex items-center justify-center w-[135px] h-[85px] md:w-[335px] md:h-[185px] m-5 flex-shrink-0">
              <h1 className="text-md font-semibold relative">
                You do not have any cards to display please add a card at
                <Link href="/wallet">
                  <a className="text-blue-500"> Wallet</a>
                </Link>
              </h1>
            </div>
          )}
          {cards.map((x: any, y: number) => (
            <div
              key={y}
              className={card.bank !== x.bank ? 'opacity-50' : 'opacity-100'}
            >
              <Card
                onClick={() => setCard(x)}
                accountType={x.accountType}
                bank={x.bank}
                name={x.name}
                number={x.accountNumber}
              />
            </div>
          ))}
        </CardsSelector>
        <input type="hidden" name="cardId" value={card.id} />
        <Input
          label="Transaction"
          name="title"
          onChange={(e) => console.log(e)}
          placeholder="Buy Groceries"
          value=""
          type="text"
        />
        <h3 className="text-md font-bold mt-2">
          Category:{' '}
          <button onClick={() => createCategory()}>New Category</button>
        </h3>
        <select
          className="w-full border-2 dark:bg-black dark:border-white/10 border-black rounded pl-3"
          name="transactionCategoryId"
        >
          {categories.map((x: any, y: number) => (
            <option key={y} style={{ backgroundColor: x.color }} value={x.id}>
              {x.icon} {x.title}
            </option>
          ))}
        </select>
        <Input
          label="Ammount"
          name="ammount"
          onChange={(e) => console.log(e)}
          placeholder="0"
          value="0"
          type={'number'}
        />
        <Input
          label="Date"
          name="date"
          onChange={(e) => console.log(e)}
          placeholder="Today"
          value={new Date()}
          type={'date'}
        />
        <h3 className="text-md font-bold mt-2">Reccurs:</h3>
        <input type="checkbox" name="reccurs" />
        <motion.button
          whileTap={{ scale: 0.9 }}
          layoutId="addTransaction"
          type="submit"
          className="dark:bg-white dark:text-black absolute p-3 bottom-6 text-md bg-black text-white rounded right-6"
        >
          Add Transaction
        </motion.button>
      </form>
    </motion.div>
  );
};

export default MakeTransactionModal;
