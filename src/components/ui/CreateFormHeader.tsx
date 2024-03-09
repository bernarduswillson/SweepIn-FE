import React from 'react'

// Utils
import parseDate from '@/utils/parseDate';

interface CreateFormHeaderProps {
  title: string,
  date: Date,
};

const CreateFormHeader = (props: CreateFormHeaderProps) => {
  const { title, date } = props;

  return (
    <div className="w-fit h-fit">
      <h2 className="text-base text-center poppins-medium text-white -mb-1">{parseDate(date)}</h2>
      <h1 className="text-3xl text-center poppins-bold text-white">{title}</h1>
    </div>
  );
};

export default CreateFormHeader;