import {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from 'next';
import { getSession } from 'next-auth/react';
import Calendar from 'react-calendar';
import { useState } from 'react';
import TransactionItem from '../components/transactionItem';

const CalendarPage: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = (props) => {
  const [value, onChange] = useState(new Date());
  const [transaction, setTransaction] = useState(
    JSON.parse(props.transactions)
  );

  return (
    <main className="dark:bg-white/10 bg-black/5 md:ml-[130px] flex justify-center items-center flex-col md:mr-auto dark:text-white min-h-[90vh] mt-16 gap-6 p-8 pb-[300px] md:pb-0 z-10 relative w-[80vw] rounded">
      <h1 className="text-3xl font-bold">Calendar</h1>
      <div className=" bg-white dark:bg-white/10 p-6 shadow-md">
        <Calendar className="calendar" value={value} onChange={onChange} />
      </div>
      <div>
        <h1 className="text-2xl font-bold mb-5">Transactions</h1>
        {transaction.map((x: any, y: number) => (
          <TransactionItem
            key={y}
            ammount={x.ammount}
            category={x.TransactionCategory}
            title={x.title}
            date={x.date}
          />
        ))}
      </div>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (!session) {
    ctx.res.writeHead(303, { Location: '/login' });
  }

  const requestTransactions = await prisma.transaction.findMany({
    where: {
      user: {
        email: session?.user?.email,
      },
    },
    include: {
      TransactionCategory: true,
    },
  });

  const transactions = JSON.stringify(requestTransactions);
  console.log(transactions);
  return {
    props: {
      user: session?.user,
      transactions: transactions,
    },
  };
};

export default CalendarPage;
