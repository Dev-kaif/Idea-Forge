

import Background from './Components/Background';
import Sidebar from './Components/sidebar';


const App = () => {


  return (
    <div className='bg-zinc-900 min-h-screen font-janeLight text-white flex overflow-hidden transition-all duration-500'>
      <Sidebar/>
      <Background/>
    </div>
  )
}

export default App
