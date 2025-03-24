
import { Button } from "@/components/ui/button";
import Image from "next/image";
import connectToDatabase from "@/utils/db_connection";
import testModel from "@/utils/testModel";
import { Dialog } from "@radix-ui/react-dialog";
import Navbar from "@/components/custom/Navbar";




export default function Home() {



  return (
   
<div>
  
  <Navbar/>

  <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-40 mx-20 mt-10">
            <Image src={'/image4.jpeg'} width={400} height={500} alt="image"/>

            <div className="flex flex-col gap-6 justify-center">
              <h2 className="font-bold text-3xl bg-pink-200">Asynchronous AI video interview software to screen better, faster.</h2>

              <div className="flex gap-5">
                <Button className='p-8 font-semibold text-md bg-blue-800'>Sign up as Candidate</Button>
                <Button className='p-8 font-semibold text-md bg-green-500'>Sign up as Business</Button>
              </div>
              <h4 className="text-md text-gray-500 font-normal">Preparing for a job interview? Try mock interviews.</h4>

            </div>
        </div>

        <div className="grid bg-slate-100 grid-cols-1 md:grid-cols-2 mx-20 mt-12 gap-20">

          <div>
            <h2 className="font-bold text-2xl   "><b className="text-red-500 text-3xl">Interviewer</b>.AI 1 End-to-End AI Video Interview Software</h2>
             <h2 className="text-gray-500">

            Interviewer.AI is all about efficiency. It’s a state-of-the-art video recruiting software that leverages Generative AI and Explainable AI to automate job descriptions, craft relevant interview questions, and pre-screen and shortlist candidates. This ensures you find the best talent for your roles while maintaining content relevancy.
             </h2>
          </div>

          <div>
          <Image className="rounded-xl mt-3" src={'/image1.jpg'} width={400} height={500} alt="image"/>
          </div>
        
        </div>
    

<div className="">
 <h2 className="text-4xl font-bold  my-10 text-center"><b className="text-green-500">Y</b>our Personal All-In-One
 Hiring <span className="bg-blue-700 p-1 text-white rounded-md">Assistant</span></h2>

 <div className="flex justify-center mt-5 relative">
       <div className="hidden lg:block">
       <div className="absolute left-20  flex flex-col gap-6 mt-10">
        <div className="shadow-lg bg-white font-semibold w-80 h-24 rounded-xl border-l-4 flex  items-center border-blue-500 text-center"><span>Know what was happening, while you were away</span></div>
        <div  className="shadow-lg bg-white font-semibold w-80 h-24 rounded-xl border-l-4 flex  items-center border-blue-500 text-center"><span>Use suggested questionnaire, or create your own custom questions</span></div>
        <div  className="shadow-lg bg-white font-semibold w-80 h-24 rounded-xl border-l-4 flex  items-center border-blue-500 text-center"><span>Interview candidates where they are and when they can</span></div>
       </div>
       </div>
  
    <div className="border-2 border-blue-500 rounded-xl inline-block  border-dashed px-36 py-12">
    <Image className=" border-red-500" src={'/girl.jpg'} width={269} height={269} alt="girlImg"/>
    </div>
     
     <div className="hidden lg:block">
    <div className="absolute right-20 flex flex-col gap-6 mt-10">
      <div className="shadow-lg bg-white font-semibold w-80 h-24 rounded-xl border-l-4 flex  items-center border-blue-500 text-center"><span>Find your super hires, before they are actually hired</span></div>
      <div className="shadow-lg bg-white font-semibold w-80 h-24 rounded-xl border-l-4 flex  items-center border-blue-500 text-center"><span>Recalibrate with ease as your hiring needs evolve</span></div>
      <div className="shadow-lg bg-white font-semibold w-80 h-24 rounded-xl border-l-4 flex  items-center border-blue-500 text-center"><span>Trust your gut and instincts, but back it up with data</span></div>
    </div>
    </div>
 
    
 </div>

</div>

<div className="mx-10 md:mx-50 my-10 flex gap-10 flex-col md:flex-row justify-center items-center">
  <div className="flex-2 rounded-xl">

  <Image src={'/image5.jpg'} width={500} height={500} alt="image"/>

  </div>

  <div className="flex flex-col gap-5 flex-1">
    <h2 className="font-bold text-sm  md:text-3xl animate-bounce ">Smart Video Interview Software To Boost Efficiency Of Your <span className="text-red-500 text-4xl">Hiring Experts</span></h2>
    <p className="text-md text-gray-400">No credit card required. Cancel Anytime</p>
    <Button className='w-1/5'>Sign Up</Button>
  </div>
</div>

<footer className="flex flex-col lg:flex-row justify-between bg-slate-200 mb-3">
  <div className="flex justify-center gap-5">
  
  <img width="20" src="/instagram.png" alt="" />
  <Image  className="w-5 md:w-10" src={'/fb.svg'} width={100} height={100} alt="image"/>
  <Image  className="w-5 md:w-10" src={'/instagram.svg'} width={100} height={100} alt="image"/>
  <Image className="w-5 md:w-10"  src={'/LI.svg'} width={100} height={100} alt="image"/>
    
  </div>

  <div className="flex gap-1 text-sm text-gray-400 justify-center items-center">
  © Copyright Mock IT Up All rights reserved
  <Image className="hidden lg:block" src={'/MockItUp.png'} width={100} height={100} alt="image"/>


  </div>
  <div className="flex gap-2 text-sm text-gray-400 justify-center items-center">
    Terms of Service | Privacy Policy
    <Image className="hidden lg:block" src={'/HeaderLogo.png'} width={100} height={100} alt="image"/>

  </div>
</footer>

</div>
  );
}
