import { useState } from 'react';
import Background from './Background';
import CreateContent from './CreateContent';
import Sidebar from './sidebar';

interface FuncProps {
  data?: Card[]; 
  shared?: boolean;
}

interface Card {
  _id: string;
  title: string;
  content: string;
  linkType:string;
  link:string;
  description:string;
  tags:string[];
}

const DashBoard = ({data,shared}:FuncProps) => {
  const [modelOpen, setModelOpen] = useState(false);
  const [cardRender, setcardRender] = useState(false);

  return (
    <div className='bg-zinc-900 min-h-screen font-janeLight text-white flex overflow-hidden transition-all duration-500'>
      <CreateContent open={modelOpen} onClose={()=>{
        setModelOpen(false)
        setcardRender(prev=>!prev)
      }}/>
      <Sidebar/>
      {shared && data? <Background cardRender={cardRender} shared={shared} data={data} onClickopen={()=>{
        setModelOpen(true)
      }} /> :(
        <Background cardRender={cardRender} onClickopen={()=>{
          setModelOpen(true)
        }} />
      )}
    </div>
  )
}

export default DashBoard
