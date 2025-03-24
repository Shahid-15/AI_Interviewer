"use client";
import { Button } from "@/components/ui/button";

import { Heading2, Mic } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import Webcam from "react-webcam";
import { useToast } from "@/hooks/use-toast";
import { chatSession } from "@/utils/GeminiAIModel";
import { useUser } from "@clerk/nextjs";
import axios from "axios";

function RecordAnsSection({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewData,
}) {

  const [userAnswer, setUserAnswer] = useState("");
  const [isRecording,setIsRecording] = useState(false);
  const { toast } = useToast();
  const { user,isLoaded } = useUser();
 
  const {
    error,
    interimResult,
    results,
    startSpeechToText,
    stopSpeechToText,
   
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });


const startRecording = ()=>{
  
  setUserAnswer("");
  startSpeechToText();
  setIsRecording(true);

}

const stopRecording = () =>{
   
  setIsRecording(false);
  stopSpeechToText();
  
}

const setToDB = async (finalTranscript) => {
    
  const feedbackPrompt = `Question:  ${mockInterviewQuestion[activeQuestionIndex]?.question} , User Answer
  : ${results} Depends on question and user answer for given interview question please give us rating for answer and
   feedback as area of improvement if any in just 3 to 5 lines in valid JSON format with rating(0-5) field and
   feedback field (note:response should in pure json and can be parse in javascipt object)`;

   const ans = await chatSession.sendMessage(feedbackPrompt);
   const mockJsonResp = (ans.response.text()).replace("```json","").replaceAll("```","")

   const jsonFeedbackResp= JSON.parse(mockJsonResp);
   

  
   let content = {

    mockIdRef:interviewData?.mockId,
    question:mockInterviewQuestion[activeQuestionIndex]?.question,
    correctAns:mockInterviewQuestion[activeQuestionIndex]?.answer,
    userAns:finalTranscript,
    feedback:jsonFeedbackResp?.feedback,
    rating:jsonFeedbackResp?.rating,
    userEmail:user.primaryEmailAddress?.emailAddress,

   }
   let resp = await axios.post(`http://localhost:3000/api/feedback`,content);
  

   if(resp.status==200){

     toast({
       title:"Answer Recorded Successfully",

      })
    }
    
  }
  

useEffect(() => {

  const finalTranscript = results.map((result) => result.transcript).join(" ");
  console.log(finalTranscript)
   
    setUserAnswer(finalTranscript);
    results.length = 0; 

 
   if(!isRecording && finalTranscript?.length>10){
    console.log(finalTranscript)
    setToDB(finalTranscript);
   }
   else{
    console.log("Answer length is too small")
   }

}, [results]);


  return (
    <div className="flex flex-col justify-center items-center">
      {user&&<h1 className="text-lg font-bold"><span className="text-red-500">Its!</span> {user?.firstName}</h1>}
      <div className=" mt-10 border-2 shadow-lg  flex flex-col justify-center items-center bg-black rounded-lg p-5">
        <Image
          className="absolute"
          alt="webcamimage "
          width={130}
          height={130}  
          src={`/webcam.png`}
        ></Image>
        <Webcam
          mirrored={true}
          style={{
            height: 230,
            width: 400,
            zIndex: 10,
          }}
        />
      </div>

      <Button
        
        onClick={isRecording?stopRecording:startRecording}
        className="my-10 "
        variant="outline"
      >
        {isRecording ? (
          <h2 className=" text-red-600 flex gap-2 justify-center items-center">
            <Mic /> Recording...
          </h2>
        ) : (
          <h2 className=" text-purple-800 flex gap-1 items-center font-semibold">
            <Mic />
            Record Answer
          </h2>
        )}
      </Button>

    </div>
  );
}

export default RecordAnsSection;
