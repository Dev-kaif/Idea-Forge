import { LuBrain } from "react-icons/lu";
// import { FaPlus } from "react-icons/fa6";
import { AiOutlineYoutube } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";
import { IoDocumentTextOutline ,IoLink} from "react-icons/io5";
import { LiaHashtagSolid } from "react-icons/lia"
import { MdOutlineClearAll } from "react-icons/md"


import Button from "./Button";


function Sidebar() {

      const data = [
        {name:"All",logo:MdOutlineClearAll},
        {name:"Tweets",logo:FaXTwitter},
        {name:"Videos",logo:AiOutlineYoutube},
        {name:"Documents",logo:IoDocumentTextOutline},
        {name:"Links",logo:IoLink},
        {name:"Tags",logo:LiaHashtagSolid}
      ]


  return (
    <div id='sidebar' className='bg-zinc-800 w-48 md:w-[18vw] min-h-screen py-8 '>
    <div id='Logo' className='w-full px-2'>
      <div className='flex items-center text-2xl md:text-3xl gap-2 font-bold'>
        <LuBrain className='text-blue-300 text-3xl md:text-4xl ' />
        <div>Idea Forge</div>
      </div>
    </div>
    <div className='mt-10  w-full h-full'>
        {data.map((items,index)=> <Button key={index} sidebar={true} text={items.name} icon={<items.logo/>} />)}
    </div>
  </div>
  )
}

export default Sidebar
