"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Webcam from "react-webcam";
import { ArrowRightFromLine, ArrowUpRightFromSquare, Lightbulb, WebcamIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const page = ({params}) => {

  const [interviewData,setInterviewData] = useState(null);
  const [webCamEnable,setWebCamEnable] = useState(false);
  const [interviewId,setInterviewId] = useState();

    const getInterviewDetails  = async ()=> {
       
        let par = await params;
        let id = par.interviewId;
        setInterviewId(id);
    
        let response = await axios.post(`http://localhost:3000/api/getData`,{id});
        setInterviewData(response.data); 

    }

    useEffect(()=>{
        getInterviewDetails()
    },[])

    useEffect(()=>{
       
    },[interviewData])

  return (
   <div className='my-10 '>
        <h2 className='font-bold text-4xl '>Let's <span className='text-red-500'>Get Started</span></h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
       

        <div className='flex flex-col my-5 gap-5 '>
          <div className='flex flex-col gap-5 p-5 rounded-lg border border-t-4 border-green-500 bg-blue-200'>

        {interviewData&&<h2 className='text-md'><strong>Job Role/Job Position :</strong><span className='text-lg capitalize text-gray-600 bg-yellow-400 rounded-lg p-1'> {interviewData.jobPosition}</span></h2>}
      {interviewData&&<h2 className='text-md '><strong>Job Description/Tech Stack :</strong><span className='text-lg capitalize text-gray-600 bg-yellow-400 rounded-lg p-2'> {interviewData.jobDescription}</span></h2>}
      {interviewData&&<h2 className='text-md'><strong>Years of Exprience :</strong><span className='text-lg text-gray-600 bg-yellow-400 rounded-lg p-2'> {interviewData.
jobExperience}</span></h2>}
</div>
<div className='p-5  border rounded-lg border-yellow-300 bg-yellow-100'>
        
        <h2 className=' text-yellow-500 flex gap-2 items-center'><Lightbulb/><strong>Information </strong></h2>
        <h2 className='mt-3 text-sm text-yellow-500'>{process.env.NEXT_PUBLIC_INFORMATION}</h2>
</div>

      </div>

      <div>
          {webCamEnable? <Webcam
          onUserMedia={()=>{setWebCamEnable(true)}}
          onUserMediaError={()=>{setWebCamEnable(false)}}
          mirrored={true}
          style={{
            height:300,
            width:300
          }}
          />
          :
          <>
          <WebcamIcon className='h-60 w-full rounded-lg border p-20 my-7 bg-slate-300'/>
          <Button variant="ghost" className='w-full border border-purple-500' onClick={()=>{setWebCamEnable(true)}}>Enable Webcam and Microphone</Button>
          </>
          }

<div className='flex justify-end items-end mt-5'>

       <Link href={`/dashboard/interview/${interviewId}/start`}>
            <Button className='p-4 bg-green-600 font-bold text-lg'><ArrowRightFromLine/>Start Interview</Button>
       </Link>

          </div>
        </div>

        </div>
       
          
      
   </div>
  )
}

export default page