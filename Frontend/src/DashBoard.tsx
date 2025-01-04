import { useState } from 'react';
import Background from './Dashboard Components/Background';
import CreateContent from './Dashboard Components/CreateContent';
import Sidebar from './Dashboard Components/sidebar';


const DashBoard = ({data,shared}) => {
  const [modelOpen, setModelOpen] = useState(false);
  const [cardRender, setcardRender] = useState(false);

  return (
    <div className='bg-zinc-900 min-h-screen font-janeLight text-white flex overflow-hidden transition-all duration-500'>
      <CreateContent open={modelOpen} onClose={()=>{
        setModelOpen(false)
        setcardRender(prev=>!prev)
      }}/>
      <Sidebar/>
      <Background cardRender={cardRender} shared={shared} data={data} onClickopen={()=>{
        setModelOpen(true)
      }} />
    </div>
  )
}

export default DashBoard
