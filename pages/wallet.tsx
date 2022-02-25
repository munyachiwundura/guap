import { useState, useEffect } from 'react';
import {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from 'next';
import Card from '../components/card';
import Backdrop from '../components/backdrop';
import AddCard from '../components/addCard';
import TransactionItem from '../components/transactionItem';
import CardPreview from '../components/cardPreview';
import prisma from '../lib/prisma';
import { getSession } from 'next-auth/react';
import { Card as CardType } from '@prisma/client';

const Wallet: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ cards }) => {
  const [open, setOpen] = useState<string | boolean>(false);
  const [card, setCard] = useState<any>();
  const transaction = [
    {
      card: {
        bank: 'absa',
        name: 'munyaradzi',
        accountType: 'Cheque',
        number: '5555 5555 5555 555',
      },
      ammount: -200,
      category: { color: '#65dfc9', icon: 'house', title: 'Home' },
      date: '12 February 2022 at 15: 16',
      title: 'Gas',
    },
    {
      card: {
        bank: 'absa',
        name: 'munyaradzi',
        accountType: 'Cheque',
        number: '5555 5555 5555 555',
      },
      ammount: 200,
      category: { color: '#3431c2', icon: 'house', title: 'Home' },
      date: '12 February 2022 at 15: 16',
      title: 'Gas',
    },
    {
      card: {
        bank: 'absa',
        name: 'munyaradzi',
        accountType: 'Cheque',
        number: '5555 5555 5555 555',
      },
      ammount: -200,
      category: { color: '#FF2C6B', icon: 'house', title: 'Home' },
      date: '12 February 2022 at 15: 16',
      title: 'Gas',
    },
  ];
  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    });
  }, []);
  return (
    <div>
      {open && (
        <Backdrop onClick={() => setOpen(false)}>
          {open === 'AddCard' && <AddCard />}
          {open === 'Card' && card && (
            <CardPreview
              card={{
                accountType: card.accountType,
                bank: card?.bank,
                name: card?.name,
                number: card?.number,
              }}
            >
              {transaction.map((x, y) => (
                <div key={y} onClick={() => setOpen('Transaction')}>
                  <TransactionItem
                    ammount={x.ammount}
                    category={x.category}
                    title={x.title}
                    date={x.date}
                  />
                </div>
              ))}
            </CardPreview>
          )}
        </Backdrop>
      )}
      <main className="dark:bg-white/10 no_scrollbar bg-black/5 md:ml-[130px] flex justify-center items-center flex-col md:mr-auto dark:text-white min-h-[90vh] mt-16 gap-6 p-8 pb-[100px] overflow-y-scroll md:pb-0 z-10 relative w-[80vw] rounded">
        <h1 className="text-3xl font-bold">Your Cards</h1>
        <div className="md:grid md:grid-cols-2 gap-1 w-fit">
          {cards.map((x: any, y: number) => (
            <Card
              onClick={() => {
                setOpen('Card');
                setCard(x);
              }}
              accountType={x.accountType}
              bank={x.bank}
              name={x.name}
              number={x.accountNumber}
            />
          ))}

          <div
            onClick={() => setOpen('AddCard')}
            className="w-[135px] h-[85px] md:w-[335px] md:h-[185px] border-2 border-black rounded-[20px] flex flex-col items-center justify-center m-5"
          >
            <i className="bi bi-plus-lg text-[30px] md:text-[75px]"></i>
            <p className="font-bold text-md md:text-lg">Add a Card</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Wallet;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (!session) {
    ctx.res.writeHead(303, { Location: '/login' });
  }

  const request = await prisma.card.findMany({
    where: {
      user: {
        email: session?.user?.email,
      },
    },
  });
  console.log(request);
  return {
    props: {
      cards: request,
    },
  };
};
