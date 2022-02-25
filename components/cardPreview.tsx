import { FunctionComponent } from 'react';
import { motion } from 'framer-motion';
import Card from './card';

type Props = {
  card: {
    name: string;
    number: string;
    bank: string;
    accountType: string;
  };
};

const CardPreview: FunctionComponent<Props> = (props) => {
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
        layoutId="addTransaction"
        whileTap={{ scale: 0.9 }}
        className="dark:bg-white dark:text-black mt-3 p-3 text-md bg-black text-white rounded"
      >
        Edit Card
      </motion.button>
    </motion.div>
  );
};

export default CardPreview;
