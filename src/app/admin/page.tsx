'use client'

import Sidebar from '@/components/Sidebar'
import React from 'react'
import DashboardPage from './dashboard/page'

const Dashboard = () => {
  return (
    <div className="relative w-full min-h-screen h-fit">
      <div className="flex flex-row-reverse w-screen h-screen">
        <DashboardPage />
        <Sidebar active="dashboard" />
      </div>
    </div>
  )
}

export default Dashboard
