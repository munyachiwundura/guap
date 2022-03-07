import { FunctionComponent } from 'react';
import { Bar } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  BarElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from 'chart.js';
ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

type Month = {
  month: string;
  balance: number;
};

type Props = {
  months: Month[];
};

const MonthlyBalance: FunctionComponent<Props> = ({ months }) => {
  const highest = Math.max(...months.map((x, y) => x.balance));
  const datas = {
    labels: months.map((x) => x.month),

    datasets: [
      {
        data: months.map((x) => x.balance),

        backgroundColor: months.map((x) => 'grey'),
        borderRadius: 5,
        hoverBackgroundColor: months.map((x) => 'black'),
        borderWidth: 0,
        weight: 2,
      },
    ],
  };
  return (
    <div className="justify-center max-h-[290px] dark:bg-white/10 relative flex p-6 pt-12 w-[600]  bg-white shadow-md">
      <h2 className="absolute  top-3 left-6 font-bold text-xl">
        Total Balance
      </h2>
      <div className="w-[85%]">
        <Bar
          data={datas}
          options={{
            scales: {
              y: {
                display: false,
                grid: {
                  display: false,
                },
              },

              x: {
                grid: {
                  display: false,
                },
              },
            },
            plugins: {
              legend: {
                display: false,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default MonthlyBalance;
