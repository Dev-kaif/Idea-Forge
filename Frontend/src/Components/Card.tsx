import { MdDeleteOutline } from "react-icons/md";
import { IoDocumentTextOutline, IoShareSocialOutline} from "react-icons/io5";

const Card = () => {
  return (
    <div className="flex flex-col justify-between bg-zinc-700  h-80 w-64 md:mx-2 my-5 rounded-xl overflow-hidden px-4 outline outline-1 outline-gray-100">
      <div>
        <div className="flex justify-between h-10 mb-2 items-center">
          <div className='flex items-center gap-2'>
            <IoDocumentTextOutline className='text-xl'/>
            <span className='text-base font-bold'>Project Ideas</span>
          </div>
          <div className='text-xl flex gap-3 '>
            <IoShareSocialOutline className='hover:opacity-[100] opacity-75 cursor-pointer' />
            <MdDeleteOutline className='hover:opacity-[100] opacity-75 cursor-pointer ' />
          </div>
        </div>
        <div className=" h-12 font-bold text-2xl">
          Future Projects
        </div>
      </div>
      <div className='h-full overflow-hidden'>
        <ul className='list-inside list-disc'>
          <li>Build a personal knowledge base</li>
          <li>Create a habit tracker</li>
          <li>Design a minimalist todo</li>
        </ul>
      </div>
      <div>
        <div className="text-sm w-full h-10 items-center flex gap-1">
          <div className='bg-purple-300 text-purple-500 w-fit px-3 py-1 rounded-xl'>#productivity</div>
          <div className='bg-purple-300 text-purple-500 w-fit px-3 py-1 rounded-xl'>#ideas</div>
        </div>
        <div className=" h-8 items-center my-1 text-sm opacity-75"> Added on 10/03/2024</div>
      </div>
    </div>
  );
};

export default Card;
