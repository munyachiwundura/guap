import { FunctionComponent } from 'react';
import { motion } from 'framer-motion';
import { User } from 'next-auth';
import Image from 'next/image';
import Input from './input';

type Props = {
  user: {
    name: string;
    image: string;
    email: string;
  };
};

const ManageAccount: FunctionComponent<Props> = (props) => {
  const Submit = async (e: any) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const formData = Object.fromEntries(form.entries());
    console.log(formData);
  };

  return (
    <motion.div
      animate={{ y: 0 }}
      initial={{ y: -300 }}
      className="md:w-[400px] w-72 md:p-5 pb-32 p-2 z-50 bg-white rounded fixed dark:bg-black/90 dark:text-white"
    >
      <form onSubmit={(e: any) => Submit(e)}>
        <h1 className="font-bold">Edit Account Info</h1>
        <div className="flex items-center mt-4">
          <Image
            src={props.user.image}
            alt={props.user.name}
            width={100}
            height={100}
            className="rounded-full"
          />
          <div className="ml-3 ">
            <p>Profile Picture</p>
            <input type="file" accept=".jpg, .png" />
          </div>
        </div>
        <Input
          label="Username"
          name="username"
          placeholder={props.user.name}
          type="text"
          onChange={() => console.log('')}
          value=""
        />
        <Input
          label="Email"
          name="email"
          placeholder={props.user.email}
          type="email"
          onChange={() => console.log('')}
          value=""
        />
        <motion.button
          whileTap={{ scale: 0.9 }}
          layoutId="addTransaction"
          type="submit"
          className="dark:bg-white dark:text-black  p-3  text-md bg-black text-white rounded mt-3"
        >
          Save
        </motion.button>
      </form>
    </motion.div>
  );
};

export default ManageAccount;
