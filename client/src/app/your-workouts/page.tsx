import DashboardWorkouts from '@/components/dashboard-workouts/DashboardWorkouts'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Fitness APP | Workouts',
}

const DashboardWorkoutsPage = (): React.ReactElement => {
  return (
    <div className='w-full h-full'>
        <DashboardWorkouts/>
    </div>
  )
}

export default DashboardWorkoutsPage