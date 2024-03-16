import Sidebar from '@/components/Sidebar';
import React from 'react';

const Dashboard = () => {
  return (
    <div className='relative w-full min-h-screen h-fit'>
      <Sidebar active='dashboard'/>
    </div>
  );
};

export default Dashboard;