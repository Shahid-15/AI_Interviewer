
"use client"
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  



import React, { useState } from 'react'
import { Trash } from 'lucide-react'

function InterviewItemCard({interview,interviewList,setInterviewList}) {

    const [openDialog,setOpenDialog]= useState(false);

    const router = useRouter()

    const printMockId = ()=>{

        console.log("Mock id is => ",interview?.mockId);
    }

    const deleteMock = async ()=>{

        let resp = await axios.delete(`/api/DeleteMock/?id=${interview?.mockId}`);

        setInterviewList(interviewList.filter((item)=>item?.mockId!=interview?.mockId))
        setOpenDialog(false);

    }


    const onStart = ()=>{

        router.push(`/dashboard/interview/${interview.mockId}`)
    }

    const onFeedback = ()=>{

        router.push(`/dashboard/interview/${interview.mockId}/feedback`)
    }
    
  return (

    <div>

    <div  className='border shadow-lg rounded-lg p-3 bg-slate-200'>
 

        <div className='flex justify-between'>
        <h2 className='font-bold text-primary'>{interview?.jobPosition.toLowerCase().split(" ").map(e=>{return e.charAt(0).toUpperCase() + e.slice(1)}).join(" ")}</h2> 
        <Trash className='cursor-pointer' onClick={()=>setOpenDialog(true)}/>
            </div>
        <h2 className='text-sm text-gray-600'>{interview.jobExperience} Years of Experience</h2>
        <h2 className='text-xs text-gray-400'>Created At {interview.createdAt}</h2>
        <div className='flex justify-between mt-2 gap-5'>
            <Button onClick={onFeedback} className='w-full bg-slate-50' size="sm" variant="outline">Feedback</Button>
            <Button onClick={onStart} className='w-full' size="sm">Start</Button>
        </div>
      
    </div>
    <Dialog open={openDialog} onOpenChange={setOpenDialog} >
  
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Do you want to delete it ?</DialogTitle>
      <DialogDescription asChild>
        <div className='flex justify-end gap-4'>
            <Button onClick={deleteMock} className='text-sm w-16 bg-red-500'>Ok</Button>
            <Button onClick={()=>setOpenDialog(false)} className='text-sm w-16'>Cancel</Button>
        </div>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

    </div>
  )
}

export default InterviewItemCard
