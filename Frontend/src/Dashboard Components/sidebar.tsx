import { useState, useEffect } from "react";
import { LuBrain } from "react-icons/lu";
import { AiOutlineYoutube } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";
import { IoDocumentTextOutline ,IoLink} from "react-icons/io5";
import { LiaHashtagSolid } from "react-icons/lia"
import { MdOutlineClearAll } from "react-icons/md"
import { FiSidebar } from "react-icons/fi";
import Button from "./Button";

function Sidebar() {
  const [open, setOpen] = useState(true);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    setOpen(width > 1380); // Adjust breakpoint
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  const data = [
    { name: "All", logo: <MdOutlineClearAll /> },
    { name: "Tweets", logo: <FaXTwitter /> },
    { name: "Videos", logo: <AiOutlineYoutube /> },
    { name: "Documents", logo: <IoDocumentTextOutline /> },
    { name: "Links", logo: <IoLink /> },
    { name: "Tags", logo: <LiaHashtagSolid /> },
  ];

  return (
    <div
      id="sidebar"
      className={`bg-zinc-800 min-h-screen py-8 transition-all duration-100 ease-in-out ${
        open ? "w-[20vw]" : "w-20"
      }`}
    >
      <div id="Logo" className="w-full px-2">
        <div className="flex items-center justify-between h-10">
          {open && (
            <div className="flex items-center text-2xl md:text-3xl gap-2 font-bold">
              <LuBrain className="text-blue-300 text-3xl md:text-4xl" />
              <div>IdeaForge</div>
            </div>
          )}
          <FiSidebar
            onClick={() => setOpen((prev) => !prev)}
            className="cursor-pointer text-xl hover:text-gray-300"
          />
        </div>
      </div>
      <div className="mt-10 w-full h-full">
        {data.map((item, index) => (
          <Button
            key={index}
            sidebar={true}
            variant="h-14"
            text={open ? item.name : ""}
            icon={item.logo}
          />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
