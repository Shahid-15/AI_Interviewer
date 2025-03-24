"use client"
import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import InterviewItemCard from './InterviewItemCard';
import { ArrowDown, ArrowDown10Icon } from 'lucide-react';

function InterviewList() {

    const { user, isLoaded, isSignedIn } = useUser();
    const [interviewList,setInterviewList] = useState([]);


    const getUserList = async ()=>{
         
        const userData = await axios.post(`http://localhost:3000/api/interviewList`,{email:user?.primaryEmailAddress?.emailAddress});
        setInterviewList(userData.data)
        

    }

    useEffect(() => {

    getUserList()

    }, [isLoaded, isSignedIn]);

    useEffect(()=>{

console.log(interviewList)
    },[interviewList])

 
  return (
    <>
        <h2 className='font-semibold text-xl flex gap-2 items-center justify-center'><span className='text-2xl'>Previous</span> <strong className='text-purple-500'>Mock Interviews</strong>  <ArrowDown/></h2>
    <div className='grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-5 my-3'>


        {interviewList&& interviewList.map((interview,idx)=>(
            
            <InterviewItemCard key={idx} interview={interview} interviewList={interviewList} setInterviewList={setInterviewList}/>
        ))}
      
    </div>
        </>
  )
}

export default InterviewList
