import Link from 'next/link';
import React from 'react';

interface SidebarButtonProps {
  text: string,
  url: string,
  active?: boolean
};

const SidebarButton = (props: SidebarButtonProps) => {
  const { text, url, active } = props;

  return (
    <Link href={url}>
      <div className={`p-2 ${active ? 'bg-blue_dark' : 'bg-transparent'} rounded-md cursor-pointer transition-colors duration-150 ease-in-out hover:bg-blue_dark`}>
        <span className='text-white poppins-medium'>{text}</span>
      </div>
    </Link>
  );
};

export default SidebarButton;