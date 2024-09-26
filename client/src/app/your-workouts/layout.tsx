import React from 'react'

const DashboardWorkoutsLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className='w-full h-full'>
        {children}
    </div>
  )
}

export default DashboardWorkoutsLayout