import Card from "./Card";
import { IoDocumentTextOutline, IoLink } from "react-icons/io5";
import { AiOutlineYoutube } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";
import { MdComputer } from "react-icons/md";

interface CardItem {
  title: string;
  linkType: string;
  link: string;
  description: string;
  tags: string[];
}

interface Dataarray {
  data: CardItem[];
  deleteCard: (id: string) => void;  // Replacing 'any' with appropriate function signature
  shared?: boolean;
}


const Cards = ({data,deleteCard,shared}:Dataarray) => {

    const icons = [
      { name: "Twitter", logo: <FaXTwitter /> },
      { name: "Youtube", logo: <AiOutlineYoutube /> },
      { name: "Documents", logo: <IoDocumentTextOutline /> },
      { name: "Links", logo: <IoLink /> },
      { name: "Other", logo: <MdComputer /> },
    ];

    
  return (
    <div className="mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item)=>{
        const icon =  icons.filter((i)=>i.name==item.linkType)
        return <Card shared={shared} del={deleteCard} title={item.title} key={item._id} id={item._id}  discription={item.description}  type={item.linkType} Src={item.link } icon={icon[0].logo} tags={item.tags}   Date={new Date().toLocaleDateString()}/>
        })}
      </div>
    </div>
  )
}

export default Cards
