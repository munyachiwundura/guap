import { FunctionComponent } from 'react';
import CategoryItem from './categoryItem';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

type Category = {
  title: string;
  color: string;
  ammount: number;
};

type Props = {
  data: Category[];
};

const ExpensesDistribution: FunctionComponent<Props> = ({ data }) => {
  console.log(data);
  const total = data.reduce((y, x) => y + x.ammount, 0);

  const datas = {
    labels: data.map((x) => x.title),

    datasets: [
      {
        data: data.map((x) => x.ammount),

        backgroundColor: data.map((x) => x.color),
        borderWidth: 0,
        weight: 2,
      },
    ],
  };

  return (
    <div className="dark:bg-white/10 flex md:mb-0 mb-6 md:ml-4 flex-col p-5 justify-between items-center shadow-md w-[100%] h-72 bg-white relative">
      <h3 className="text-xl font-bold w-full pl-3 mb-3">Last 30 Days</h3>
      <div className="relative w-[60%]">
        <Doughnut
          data={datas}
          options={{
            plugins: {
              legend: {
                display: false,
              },
            },
          }}
        />
        <h3 className="absolute top-[50px] w-full text-center font-bold text-md">
          R {total}
        </h3>
      </div>
      <div className="flex flex-col items-center">
        <h3 className="text-sm font-bold mt-3 align-text-center">
          Expenses Distribution
        </h3>
        <div className="flex justify-center flex-wrap w-[100]">
          {data.map((x, y) => (
            <CategoryItem key={y} color={x.color} title={x.title} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpensesDistribution;
