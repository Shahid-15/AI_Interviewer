"use client";

import { HelpCircleIcon, LigatureIcon, LightbulbIcon, Volume2 } from "lucide-react";
import React, { useEffect } from "react";

function QuestionSection({mockInterviewQuestion,activeQuestionIndex}) {



const textToSpeach =(text)=>{

  if('speechSynthesis' in window){

    const speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);

  }
  else{

    alert("Sorry Your Browser does not support text to speech")

  }
}

  return (
    <div className="p-5 border rounded-lg mt-8 shadow-lg bg-slate-100 ">
       
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {mockInterviewQuestion.map((question, index) => (
        <h2  className={`p-2 text-xs font-bold bg-slate-300 md:text-sm text-center cursor-pointer rounded-full ${activeQuestionIndex==index&&'bg-purple-700  text-white'}`} key={question.question}> Question #{index}</h2>
        ))}

      </div>
        <h2 className="my-5 text-sm font-bold md:text-lg  rounded-xl shadow-sm border">{mockInterviewQuestion[activeQuestionIndex]?.question}</h2>

        <Volume2 className="cursor-pointer" onClick={()=>{textToSpeach(mockInterviewQuestion[activeQuestionIndex]?.question)}}/>

        <div className="border rounded-lg p-5 bg-blue-100 mt-4">
            <h2 className="flex gap-2 items-center text-primary">
                <LightbulbIcon/>
                <strong>Note:</strong>
            </h2>
            <h2 className="text-sm text-primary my-2">{process.env.NEXT_PUBLIC_NOTE}</h2>
        </div>
    </div>
  );
}

export default QuestionSection;
