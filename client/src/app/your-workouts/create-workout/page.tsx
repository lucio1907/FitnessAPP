import CreateWorkoutComponent from '@/components/dashboard-workouts/createWorkouts/CreateWorkoutComponent'
import Navbar from '@/components/navbar/Navbar'
import { cookies } from 'next/headers';
import React from 'react'

const CreateWorkoutPage = (): React.ReactElement => {
  const cookieStore = cookies();
  const userId = cookieStore.get('user_id')?.value;
  
  return (
    <div className='w-full h-full'>
        <Navbar href='/dashboard'/>
        <CreateWorkoutComponent user_id={userId}/>
    </div>
  )
}

export default CreateWorkoutPage