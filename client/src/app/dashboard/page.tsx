import Dashboard from '@/components/dashboard/Dashboard'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Fitness APP | Dashboard'
}

const DashboardPage = () => {
  return (
    <div className='w-full h-full'>
        <Dashboard/>
    </div>
  )
}

export default DashboardPage