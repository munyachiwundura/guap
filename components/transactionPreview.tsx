import { FunctionComponent } from 'react';
import { motion } from 'framer-motion';
import Card from './card';
import PreviewRibbon from './previewRibbon';
import { useRouter } from 'next/router';

type Props = {
  id: string;
  card: {
    bank: string;
    name: string;
    number: string;
    accountType: string;
  };
  title: string;
  category: {
    title: string;
    color: string;
    icon: string;
  };
  date: string | number | Date;
  ammount: number;
};

const TransactionPreview: FunctionComponent<Props> = (props) => {
  const deleteTransaction = async () => {
    const request = await fetch('/api/transactions/delete', {
      method: 'POST',
      body: JSON.stringify({
        id: props.id,
      }),
    });
    const data = await request.json();
    if (!request.ok) {
      throw Error(request.statusText);
    }
    return data;
  };

  return (
    <motion.div
      animate={{ y: 0 }}
      initial={{ y: -300 }}
      className="md:w-[400px] w-72 md:p-5 flex flex-col items-center p-5 z-50 bg-[#e5e5e5] rounded fixed dark:bg-black/90 dark:text-white"
    >
      <h1 className="text-xl font-bold">Transaction Preview</h1>
      <Card
        onClick={() => console.log('gotta rest')}
        accountType={props.card.accountType}
        bank={props.card.bank}
        name={props.card.name}
        number={props.card.number}
      />
      <PreviewRibbon title={props.title} />
      <PreviewRibbon
        title={props.category.title}
        icon={props.category.icon}
        color={props.category.color}
      />
      <PreviewRibbon title={props.date.toString()} />
      <PreviewRibbon title={props.ammount.toString()} ammount={true} />
      <motion.button
        layoutId="addTransaction"
        whileTap={{ scale: 0.9 }}
        onClick={() => deleteTransaction()}
        className="dark:bg-white dark:text-black mt-3 p-3 text-md bg-black text-white rounded"
      >
        Delete Transaction
      </motion.button>
    </motion.div>
  );
};

export default TransactionPreview;
