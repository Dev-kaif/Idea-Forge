import Button from "./Button";
import { IoShareSocialOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import Cards from "./Cards";

interface func{
  onClickopen:()=>void
}

const Background = ({onClickopen}:func) => {
  return (
    <div id='Background' className='w-full min-h-screen py-12 md:px-10 md:py-12'>
    <div id='nav'  className=' w-full flex justify-between px-1'>
      <div id='text' className='font-bold text-2xl md:text-4xl '>All Notes</div>
      <div className='flex gap-3 w-[19vw]'>
        <Button text="Share Idea " variant={"bg-purple-300 hover:bg-purple-400 text-purple-500  hidden"} sidebar={false} icon={<IoShareSocialOutline />}/>
        <Button onClick={()=>onClickopen()} text="Add Content" variant={"bg-purple-700 hover:bg-purple-600 "} icon={<FaPlus />}/>
      </div>
    </div>
    <div id='cards'>
      <Cards/>
    </div>
  </div>
  )
}

export default Background
