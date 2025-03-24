"use client"

import React, { useEffect } from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { BookOpenIcon, HelpCircle, Info, LayoutDashboard, LayoutDashboardIcon, TrendingUpIcon, UserRoundSearch } from 'lucide-react'

function Header() {

    const path = usePathname()

    useEffect(()=>{
console.log(path)

    },[])

  return (
    <div className='flex p-2 justify-between items-center bg-slate-100 rounded-lg  shadow-lg'>

     <Image src={'/MockItUp.png'} width={120} height={200} alt='logo'/>

     <ul className='sm:flex gap-6 hidden '>

        <li className={`hover:text-primary hover:font-bold flex gap-1 transition-all cursor-pointer font-bold text-lg border hover:scale-110 bg-slate-200 shadow-md rounded-xl p-2
        ${path=='/dashboard'&&'text-primary font-bold'}`}><LayoutDashboard/>Dashboard</li>

        <li  className={`hover:text-primary flex gap-1 hover:font-bold transition-all cursor-pointer font-bold text-lg border hover:scale-110 bg-slate-200 shadow-md rounded-xl p-2
        ${path=='/Question'&&'text-primary font-bold'}`}><HelpCircle/>Questions</li>

        <li  className={`hover:text-primary hover:font-bold flex gap-1 transition-all cursor-pointer font-bold text-lg border hover:scale-110  bg-slate-200 shadow-md rounded-xl p-2
        ${path=='/Updrade'&&'text-primary font-bold'}`}><TrendingUpIcon/>Upgrade</li>

        <li  className={`hover:text-primary flex gap-1 hover:font-bold transition-all cursor-pointer font-bold text-lg border hover:scale-110  bg-slate-200 shadow-md rounded-xl p-2
        ${path=='/howitswork'&&'text-primary font-bold'}`}><BookOpenIcon/>How Its Works?</li>

     </ul>
     <div>

     <Button  className='p-4 font-bold bg-blue-600 '><UserRoundSearch/> User <UserButton/></Button>
     
     </div>


      
    </div>
  )
}

export default Header
