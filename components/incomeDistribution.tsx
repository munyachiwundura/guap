import { FunctionComponent } from 'react';
import CategoryItem from './categoryItem';
import { motion } from 'framer-motion';

type Props = {
  data: Category[];
};

type Category = {
  title: string;
  ammount: number;
  color: string;
};

const IncomeDistribution: FunctionComponent<Props> = ({ data }) => {
  const total = data.reduce((y, x) => y + x.ammount, 0);
  console.log();
  return (
    <div className="dark:bg-white/10  md:mb-0 mb-6 flex p-8 justify-between items-center shadow-md w-[100%] md:mr-4 h-72 bg-white relative">
      <h3 className="absolute text-xl font-bold top-3 left-5">Last 30 Days</h3>
      <div className="h-[80%] -space-y-4 mt-5 w-12 bg-slate-300 rounded-lg">
        {data.map((x, y) => (
          <motion.div
            animate={{ scaleY: 1 }}
            transition={{ delay: y / 3 }}
            initial={false}
            key={y}
            style={{
              background: x.color,
              height: (x.ammount / total) * 100 + 10 + '%',
            }}
            className="hover:z-10 scale-y-0 scale transition-all group w-[100%] bg-black rounded-lg relative "
          >
            <p className="absolute scale-0 transition-all group-hover:scale-100 bg-black right-[-60px] text-white rounded p-1">
              R {x.ammount}
            </p>
          </motion.div>
        ))}
      </div>
      <div className="ml-5">
        <span className="text-sm text-gray-500">Total Income</span>
        <h3 className="text-xl font-bold">R {total}</h3>
        <h3 className="text-sm font-bold my-3">Income Distribution</h3>
        {data.map((x, y) => (
          <CategoryItem key={y} color={x.color} title={x.title} />
        ))}
      </div>
    </div>
  );
};

export default IncomeDistribution;
