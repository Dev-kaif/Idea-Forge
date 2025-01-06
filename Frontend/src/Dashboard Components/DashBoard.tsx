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
  linkType: string;
  link: string;
  description: string;
  tags: string[];
}

const DashBoard: React.FC<FuncProps> = ({ data, shared }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isCardUpdated, setCardUpdated] = useState(false);
  const token = localStorage.getItem('token');

  const handleModalClose = () => {
    setModalOpen(false);
    setCardUpdated((prev) => !prev);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };


  if (!token && !shared) {
    return (
      <div className="flex items-center justify-center min-h-screen  bg-zinc-900">
        <div className="text-center p-6 bg-zinc-800 shadow-lg rounded-lg outline outline-white">
          <h1 className="text-2xl font-semibold text-red-500">Access Denied</h1>
          <p className="mt-4 text-white">
            You are not authorized to view this page. Please log in to continue.
          </p>
          <button
            onClick={() => (window.location.href = '/')}
            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 min-h-screen font-janeLight text-white flex overflow-hidden transition-all duration-500">
      <CreateContent shared={shared} open={isModalOpen} onClose={handleModalClose} />
      <Sidebar shared={shared}/>
      <Background
        cardRender={isCardUpdated}
        shared={shared}
        data={data}
        onClickopen={handleModalOpen}
      />
    </div>
  );
};

export default DashBoard;
