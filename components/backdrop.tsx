import { FunctionComponent } from 'react';
import { motion } from 'framer-motion';

type Props = {
  onClick: () => void;
};
const Backdrop: FunctionComponent<Props> = (props) => {
  return (
    <div className="flex items-center justify-center top-0 right-0 z-50 fixed w-[100vw] h-[100vh]">
      <motion.div
        animate={{ opacity: 1 }}
        onClick={() => props.onClick()}
        className="opacity-0 backdrop-blur-md z-50 fixed w-[100vw] h-[100vh] bg-black/20 top-0 right-0"
      ></motion.div>
      {props.children}
    </div>
  );
};

export default Backdrop;
