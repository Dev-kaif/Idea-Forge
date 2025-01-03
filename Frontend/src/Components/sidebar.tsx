import { LuBrain } from "react-icons/lu";
import { AiOutlineYoutube } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";
import { IoDocumentTextOutline ,IoLink} from "react-icons/io5";
import { LiaHashtagSolid } from "react-icons/lia"
import { MdOutlineClearAll } from "react-icons/md"
import { FiSidebar } from "react-icons/fi";


import Button from "./Button";
import { useState } from "react";


function Sidebar() {

      const data = [
        {name:"All",logo:MdOutlineClearAll},
        {name:"Tweets",logo:FaXTwitter},
        {name:"Videos",logo:AiOutlineYoutube},
        {name:"Documents",logo:IoDocumentTextOutline},
        {name:"Links",logo:IoLink},
        {name:"Tags",logo:LiaHashtagSolid}
      ]

      const [open,setOpen] = useState(true);


  return (
    <div id='sidebar' className={`bg-zinc-800 min-h-screen py-8 transition-all duration-500 ease-in-out ${open? 'w-48 md:w-[18vw]': "w-20"} `}>
    <div id='Logo' className='w-full px-2'>
      <div className='flex items-center justify-between h-10'>
      {open && <div className="flex items-center text-2xl md:text-3xl gap-2 font-bold">
        <LuBrain className='text-blue-300 text-3xl md:text-4xl ' />
         <div>Idea Forge</div>
         </div>}
        <FiSidebar onClick={()=>setOpen(prev=>!prev)} className="text-xl hover:text-gray-300"/>
      </div>
    </div>
    <div className='mt-10  w-full h-full'>
        {data.map((items,index)=> <Button key={index} sidebar={true} variant="h-14" text={open ? items.name : ''} icon={<items.logo/>} />)}
    </div>
  </div>
  )
}

export default Sidebar
