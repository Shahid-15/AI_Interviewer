import { UserButton } from '@clerk/nextjs'
import React from 'react'
import AddNewInterview from './_components/AddNewInterview'
import InterviewList from './_components/InterviewList'
import Image from 'next/image'



function Dashboard() {

  
  return (
    <div className='p-10'>
      

<h2 className='font-bold text-4xl font-mono'> <span className='text-red-500'>DasH</span>Board</h2>
<h2 className='text-gray-500'><span className='font-bold '>Create</span> and start you AI <span className='text-green-500'>MockUp Interview</span></h2>


      <div className='grid grid-cols-1 md:grid-cols-3 my-5'>
        
        <AddNewInterview/>
      </div>

      {/* Previous Interview List? */}
      <InterviewList/>
      
    </div>
  )
}

export default Dashboard
