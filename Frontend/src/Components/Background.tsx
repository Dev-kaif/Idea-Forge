import Button from "./Button";
import { IoShareSocialOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";

const Background = () => {
  return (
    <div id='Background' className='md:w-[82vw] w-72 min-h-screen px-1 py-12 md:px-10 md:py-12'>
    <div id='nav'  className=' w-full flex justify-between'>
      <div id='text' className='font-bold text-2xl md:text-4xl '>All Notes</div>
      <div className='flex gap-3'>
      <Button text="Share Idea" variant={"bg-blue-50 hover:bg-blue-100 text-blue-600  hidden"} sidebar={false} icon={<IoShareSocialOutline />}/>
      <Button text="Add Content" variant={"bg-blue-600 hover:bg-blue-500 "} icon={<FaPlus />}/>
      </div>
    </div>
    <div id='cards'></div>
  </div>
  )
}

export default Background
