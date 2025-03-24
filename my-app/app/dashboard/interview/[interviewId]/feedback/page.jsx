"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible"
import { ChevronsUpDown, HomeIcon, StarsIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

  

function page({params}) {
const [feedbackList,setFeedbackList] = useState([]);
const [finalRating,setFinalRating] = useState(0);
const router = useRouter()

 const calculateOverallRating = ()=>{

        let finalRating = 0;

        feedbackList.forEach((item,index)=>{
          console.log(item?.rating)

          finalRating += Number(item?.rating);
        })

        
        let result = (finalRating/5);
        setFinalRating(result);
        
 }

    const getFeedback = async ()=>{

        let par = await params;
        let id = par.interviewId;

        let response = await axios.post(`http://localhost:3000/api/getFeedback`,{id});

      setFeedbackList(response.data.data);


    }
    useEffect(()=>{
        console.log("Feedback list is ",feedbackList)

        calculateOverallRating();

    },[feedbackList])

    useEffect(()=>{
   
        getFeedback();

    },[])
  return (
    <div className='p-10 '>

       {feedbackList?.length==0?
       <h2 className='font-bold text-xl text-gray-500'>No Interview Feedback Found</h2>:
      <>
      <h2 className='text-3xl font-bold text-green-500'>Congratulation!</h2>
      <h2 className='font-bold text-2xl'><span className='
      text-red-500'>Here is your</span> interview feedback</h2>
      <h2 className='text-primary font-bold text-xl my-3 flex justify-center gap-3 items-center'>Your overall interview rating :<StarsIcon/> <strong className='text-5xl text-black'>{finalRating}</strong></h2>
      <h2 className='text-sm text-gray-500'>Find below interview question with correct answer,your answer and feeback for improvement</h2>
      {feedbackList&&feedbackList.map((item,idx)=>(

        <Collapsible key={idx} className='mt-7'>
        <CollapsibleTrigger className='p-2 bg-secondary rounded-xl my-2 text-left gap-7 w-full flex justify-between'>
        {item.question} <ChevronsUpDown className='h-4 w-5'/>
        </CollapsibleTrigger>
        <CollapsibleContent>
      <div className='flex flex-col  gap-2' >
        <h2 className='text-red-500 p-2 border rounded-lg'><strong>Rating : </strong>{item.rating}</h2>
        <h2 className='p-2 border rounded-lg bg-red-50 text-sm text-red-900'><strong>Your Answer : </strong>{item.userAns}</h2>
        <h2 className='p-2 border rounded-lg bg-green-50 text-sm text-green-900'><strong>Correct Answer : </strong>{item.correctAns}</h2>
        <h2 className='p-2 border rounded-lg bg-blue-50 text-sm text-blue-900'><strong>Feedback : </strong>{item.feedback}</h2>
      </div>
        </CollapsibleContent>
        </Collapsible>

      ))}
      </>
}
     
     <Button className='mt-4 p-2 font-bold border-t-4 border-green-500' onClick={()=>{router.replace('/dashboard')}}><HomeIcon/> Go Home</Button>
    
    </div>
  )
}

export default page
