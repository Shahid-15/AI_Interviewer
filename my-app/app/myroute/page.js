"use client"

import React from 'react'

export default function page() {

let data = {
  id:102,
  jsonMockResponse:"Helloword",
  jobPosition:"Developer",
  jobDescription:"I am new to this",
  jobExperience:5
}

const handleClick = async ()=>{

  fetch(`api/store`,{
    method:"POST",
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify(data)
  }).then(r=>{r.json().then(res=>{console.log(res)})})
}
  return (
    <div>
   
   <button onClick={handleClick}>Click to store to the database</button>

      
    </div>
  )
}
