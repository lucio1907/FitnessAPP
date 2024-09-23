import DashboardHeader from '@/components/dashboard/DashboardHeader'
import React from 'react'

const DashboardLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className='w-full h-full'>
        <DashboardHeader />
        {children}
    </div>
  )
}

export default DashboardLayout