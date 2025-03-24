"use client"

import React, { useEffect,useState } from 'react'
import axios from 'axios'
import QuestionSection from './_components/QuestionSection';

import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, LogOut } from 'lucide-react';
import { useUser } from '@clerk/nextjs';

const RecordAnsSection = dynamic(() => import('./_components/RecordAnsSection'), {
  ssr: false, // Disable SSR
});


function StartInterview({params}) {

    const [interviewData,setInterviewData] = useState(null);
    const [mockInterviewQuestion,setMockInterviewQuestion] = useState();
    const [activeQuestionIndex,setActiveQuestionIndex] = useState(0);
    const [interviewId,setInterviewId] = useState();
    const {user,isLoaded} = useUser();
    
      const getInterviewDetails  = async ()=> {
         
          let par = await params;
          let id = par.interviewId;
          setInterviewId(id);
         
      
          let response = await axios.post(`http://localhost:3000/api/getData`,{id});
          let parseArr = JSON.parse(response.data.jsonMockResponse)
          setMockInterviewQuestion(parseArr.interview_questions)
          


  
          setInterviewData(response.data);
  
      }
  
      useEffect(()=>{

          getInterviewDetails()
          
      },[])



     
          
  
  return (
    <div>
      
       <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>

       {/* Question */}

       {(mockInterviewQuestion)&&<QuestionSection   mockInterviewQuestion={mockInterviewQuestion}
       activeQuestionIndex={activeQuestionIndex}
       />}

       {/* Video/Audio Recording */}
       <div>

       {(mockInterviewQuestion)&&<RecordAnsSection   mockInterviewQuestion={mockInterviewQuestion}
       activeQuestionIndex={activeQuestionIndex}  interviewData={interviewData}
       />}
        <div className='flex justify-end gap-6 mb-4 '>
        {activeQuestionIndex>0&&
        <Button className='font-bold rounded-xl' onClick={()=>{setActiveQuestionIndex(activeQuestionIndex-1)}}>
          <ChevronLeft/> Previous Question</Button>}
       
        {activeQuestionIndex!=mockInterviewQuestion?.length-1&&
        <Button className='font-bold rounded-xl'  onClick={()=>{setActiveQuestionIndex(activeQuestionIndex+1)}}>
          <ChevronRight/>Next Question</Button>}
       {activeQuestionIndex==mockInterviewQuestion?.length-1&& 
       <Link href={`/dashboard/interview/${interviewId}/feedback`}>
        <Button className='font-bold rounded-xl' ><LogOut/>End Interview</Button>
       </Link>
       }
      </div>
       </div>

       </div>
     
    </div>
  )
}

export default StartInterview
