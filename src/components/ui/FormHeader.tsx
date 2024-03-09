import React from 'react';
import { easeInOut, motion } from 'framer-motion';

// Utils
import parseDate from '@/utils/parseDate';

interface FormHeaderProps {
  title: string,
  date: Date,
};

const FormHeader = (props: FormHeaderProps) => {
  const { title, date } = props;

  return (
    <div className="w-fit h-fit">
      <motion.h2 
        className="text-base text-center poppins-medium text-white -mb-1"
        initial={{
          y: -18,
          opacity: 0
        }}
        animate={{
          y: 0,
          opacity: 1,
          transition: {
            duration: 0.3,
            ease: 'easeInOut'
          }
        }}
      >
        {parseDate(date)}
      </motion.h2>
      <motion.h1 
        className="text-3xl text-center poppins-bold text-white"
        initial={{
          y: 18,
          opacity: 0
        }}
        animate={{
          y: 0,
          opacity: 1,
          transition: {
            duration: 0.3,
            ease: 'easeInOut'
          }
        }}
      >
        {title}
      </motion.h1>
    </div>
  );
};

export default FormHeader;