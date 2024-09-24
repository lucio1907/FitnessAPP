import DashboardHeader from '@/components/dashboard/DashboardHeader'
import React from 'react'

const DashboardWorkoutsLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className='w-full h-full'>
        <DashboardHeader />
        {children}
    </div>
  )
}

export default DashboardWorkoutsLayout