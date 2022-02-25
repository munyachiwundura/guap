import Link from 'next/link';
import { FunctionComponent, useState } from 'react';
import { motion } from 'framer-motion';

type Props = {
  icon: string;
  title: string;
  href: string;
};
const NavItem: FunctionComponent<Props> = (props) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={props.href} passHref>
      <motion.li
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        animate={{ scale: 1 }}
        whileTap={{ scale: 0.9 }}
        className="relative group scale-0 md:m-4 m-1 rounded-xl transition-all hover:bg-black dark:hover:bg-white dark:hover:text-black hover:text-white p-5 flex items-center justify-center"
      >
        <i className={`bi bi-${props.icon} text-2xl md:text-4xl`}></i>
        <motion.p
          animate={{ scale: hovered ? 1 : 0 }}
          className="absolute dark:bg-white dark:text-black scale-0 md:-right-20 md:top-[20px] -top-12  p-2 bg-black text-sm text-white rounded"
        >
          {props.title}
        </motion.p>
      </motion.li>
    </Link>
  );
};

export default NavItem;
