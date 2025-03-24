"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation';
import { ArrowRightCircle, UserPlus } from 'lucide-react';
import './Navbar.css'


function Navbar() {

    const router = useRouter();
    const texts = ["Mock it up", "Get a Job"];
    const [text, setText] = useState("");
    const [index, setIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [opacity, setOpacity] = useState(1);
  
    const typingSpeed = 60; // Faster typing speed
    const deletingSpeed = 40; // Faster deleting speed
    const delayBeforeDelete = 600; // Shorter pause before deleting
    const fadeDuration = 250; // Smoother fade effect
  
    useEffect(() => {
      const currentText = texts[index];
  
      if (isDeleting) {
        if (text.length === 0) {
          setOpacity(0); // Start fade-out
          setTimeout(() => {
            setIndex((prev) => (prev + 1) % texts.length);
            setIsDeleting(false);
            setOpacity(1); // Fade-in new text
          }, fadeDuration);
        } else {
          setTimeout(() => setText(text.slice(0, -1)), deletingSpeed);
        }
      } else {
        if (text.length === currentText.length) {
          setTimeout(() => setIsDeleting(true), delayBeforeDelete);
        } else {
          setTimeout(() => setText(currentText.slice(0, text.length + 1)), typingSpeed);
        }
      }
    }, [text, isDeleting, index]);
  

  return (
    <div className='flex justify-between items-center mx-2 md:mx-1 sticky top-0 z-50 bg-white shadow-lg h-32'>
       
        <div className=''>
            <Image src={'/MockItUp.png'} alt="logo" width={160} height={100}/>
        </div>

        <div className='text-md md:text-5xl font-bold bg-gradient-to-r from-orange-500 via-indigo-500 to-green-500 text-transparent bg-clip-text  transition-opacity duration-250 ease-in-out' style={{ opacity }}>
      AI Interviewer {text}
      <span className="animate-[blink_0.5s_infinite]">|</span> 
    
        </div>

        <div className='flex gap-5'>
            <Button className='bg-slate-800' onClick={()=>router.push("/dashboard")}><ArrowRightCircle/> Started</Button>
            <Button className='border hidden lg:block bg-slate-100' variant="ghost"><UserPlus/> SignIn</Button>
        </div>
       
      
    </div>
  )
}

export default Navbar
