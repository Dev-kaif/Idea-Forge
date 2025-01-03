import Button from "./Button";
import { IoShareSocialOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import Cards from "./Cards";

const Background = () => {
  return (
    <div id='Background' className='md:w-[82vw] w-72 min-h-screen py-12 md:px-10 md:py-12'>
    <div id='nav'  className=' w-full flex justify-between px-1'>
      <div id='text' className='font-bold text-2xl md:text-4xl '>All Notes</div>
      <div className='flex gap-3'>
      <Button text="Share Idea" variant={"bg-purple-300 hover:bg-purple-400 text-purple-500  hidden"} sidebar={false} icon={<IoShareSocialOutline />}/>
      <Button text="Add Content" variant={"bg-purple-700 hover:bg-purple-600 "} icon={<FaPlus />}/>
      </div>
    </div>
    <div id='cards' className="h-full px-5 flex flex-wrap ">
      <Cards/>
    </div>
  </div>
  )
}

export default Background
