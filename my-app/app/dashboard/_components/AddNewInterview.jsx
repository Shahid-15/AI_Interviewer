"use client"
import React, { useEffect, useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from '@/utils/GeminiAIModel';
import { LoaderCircle, Plus } from 'lucide-react';
import axios from 'axios'
import connectToDatabase from '@/utils/db_connection';


import { useUser } from '@clerk/nextjs';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPos,setJobPos] = useState();
  const [jobDesc,setJobDesc] = useState();
  const [jobExp,setJobExp] = useState();
  const [loading,setLoading] = useState(false)
  const [jsonResponse,setJsonresponse] = useState('')
  const {user} = useUser();
  const router = useRouter()


const handleSubmit = async (e)=>{

e.preventDefault();
setLoading(true)
  console.log(jobPos)
  console.log(jobDesc)
  console.log(jobExp)
  const InputPrompt = `Job Position:${jobPos}
Job Description:${jobDesc}
Job Experience : ${jobExp}
based on this information generate ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions with answers in json format and the reposnse format should be invertview_questions:[Arrays of questions/answers] (note:response should in pure json and can be parse in javascipt object)`

const result = await chatSession.sendMessage(InputPrompt);

//const MockJsonResponse = (result.response.text()).replace("```json","").replaceAll("```","")
const MockJsonResponse = (result.response.text()).replace(/```json|```/g, '').trim()
console.log("Tye of mockresponse " + typeof MockJsonResponse)


setJsonresponse(MockJsonResponse);

if(MockJsonResponse){
  

let content = {
  jsonMockResponse:MockJsonResponse,
  jobPosition:jobPos,
  jobDescription:jobDesc,
  jobExperience:jobExp,
  createdBy: user.primaryEmailAddress?.emailAddress,
  mockId:uuidv4(),
}

let response = await axios.post(`api/store`,content);
if(response.data){

  setOpenDialog(false);
  console.log(response.data.mockId)
  router.push(`/dashboard/interview/${response.data?.mockId}`)
}


}
else{
  console.log("Error getting response");
}

setLoading(false)

}


  return (
    <>
      <div >
        <div
          className=" p-10 border border-t-8 border-blue-500 bg-gray-200 transition-all hover:scale-105 hover:shadow-md cursor-pointer rounded-lg"
          onClick={() => setOpenDialog(true)}
        >
          <h2 className="text-lg text-center flex justify-center items-center gap-1 font-bold "><Plus/> Add New</h2>

        </div>

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="font-bold text-2xl">
                Tell Us More About Your Job Interview
              </DialogTitle>
              <DialogDescription asChild>
                <form onSubmit={handleSubmit}>
                  <div>
                    <h2>
                      Add Details About Your Job Position/role, Job Description
                      and Years of Experience
                    </h2>
                    <div className="mt-7 my-3">
                      <label htmlFor="jobRole">Job Role/Job Position</label>
                      <Input
                        id="jobRole"
                        placeholder="Ex. Full Stack Developer"
                        required
                        onChange={(e)=>{setJobPos(e.target.value)}}
                      />
                    </div>
                    <div className="mt-5 my-3">
                      <label htmlFor="jobDescription">
                        Job Description/Tech Stack (In Short)
                      </label>
                      <Textarea
                        id="jobDescription"
                        placeholder="Ex. React Angular Nodejs MySql etc"
                        required
                        onChange={(e)=>{setJobDesc(e.target.value)}}
                      />
                    </div>
                    <div className="mt-5 my-2">
                      <label htmlFor="experience">Years of Experience</label>
                      <Input
                        id="experience"
                        placeholder="Ex. 5"
                        type="number"
                        required
                        onChange={(e)=>{setJobExp(e.target.value)}}
                      />
                    </div>
                  </div>
                  <div className="flex gap-5 justify-end mt-5">
                    <Button
                      variant="ghost"
                      type="button"
                      onClick={() => setOpenDialog(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={loading}>
                      {loading?
                      <>
                      <LoaderCircle className='animate-spin'/>'Generating from AI' </>:"Start Interview"
                      }
                      
                      </Button>
                  </div>
                </form>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}

export default AddNewInterview;
