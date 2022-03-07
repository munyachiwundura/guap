import { FunctionComponent } from 'react';
import { motion } from 'framer-motion';
import Card from './card';

type Props = {
  card: {
    id: string;
    name: string;
    number: string;
    bank: string;
    accountType: string;
  };
};

const CardPreview: FunctionComponent<Props> = (props) => {
  const deleteCard = async () => {
    const request = await fetch('/api/cards/delete', {
      method: 'POST',
      body: JSON.stringify({ id: props.card.id }),
    });
    if (!request.ok) {
      throw Error(request.statusText);
    }
    return request;
  };

  return (
    <motion.div
      animate={{ y: 0 }}
      initial={{ y: -300 }}
      className="flex flex-col items-center md:w-[400px] w-72 md:p-5 pb-10 p-2 z-50 bg-[#e5e5e5] rounded fixed dark:bg-black/90 dark:text-white"
    >
      <Card
        onClick={() => console.log('')}
        accountType={props.card.accountType}
        bank={props.card.bank}
        name={props.card.name}
        number={props.card.number}
      />
      <h2>Recent Transactions</h2>
      {props.children}
      <motion.button
        onClick={() => deleteCard()}
        layoutId="addTransaction"
        whileTap={{ scale: 0.9 }}
        className="dark:bg-white dark:text-black mt-3 p-3 text-md bg-black text-white rounded"
      >
        Delete Card
      </motion.button>
    </motion.div>
  );
};

export default CardPreview;
