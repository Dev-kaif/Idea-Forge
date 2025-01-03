import { MdDeleteOutline } from "react-icons/md";
import { IoDocumentTextOutline, IoShareSocialOutline} from "react-icons/io5";
import { useEffect } from "react";

interface card{
  YoutubeSrc?:string;
  twitterSrc?:string;
}

const Card = ({YoutubeSrc,twitterSrc}:card) => {  

    useEffect(() => {
      // Load Twitter/X embed script when the component mounts
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      document.body.appendChild(script);
  
      return () => {
        // Cleanup script if necessary
        document.body.removeChild(script);
      };
    }, []);

    const getTwitterUrl = (url: string | undefined) => {
      if (!url) return "";
      return url.replace(/^https:\/\/x\.com/, "https://twitter.com");
    };
  
    const transformedUrl = getTwitterUrl(twitterSrc);

    
    const convertToEmbedUrl = (url: string | undefined) => {
      if (!url) return "";
    
      let videoId = "";
    
      // Check for YouTube Live URL (youtube.com/live/)
      if (url.includes("youtube.com/live/")) {
        videoId = url.split("/live/")[1].split("?")[0];
      } 
      // Check for Shortened URL (youtu.be)
      else if (url.includes("youtu.be")) {
        videoId = url.split("/")[3].split("?")[0];
      } 
      // Standard YouTube URL (youtube.com/watch?v=VIDEO_ID)
      else if (url.includes("youtube.com/watch")) {
        const urlParams = new URL(url).searchParams;
        videoId = urlParams.get("v") || "";
      }
      // Check for YouTube Playlist URL
      else if (url.includes("youtube.com/playlist")) {
        const urlParams = new URL(url).searchParams;
        videoId = urlParams.get("v") || ""; // Extract first video ID
        if (!videoId) {
          const listId = urlParams.get("list");
          if (listId) {
            // Handle playlist differently, maybe embed the first video from the playlist
            videoId = listId.split(",")[0];
          }
        }
      }
    
      // Return embedded URL if video ID was found
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    
      return "";
    };
    
     const embedUrl = convertToEmbedUrl(YoutubeSrc);
  
    return (
      //  min-h-[56vh] min-w-64
      <div className="flex flex-col justify-between bg-zinc-700 w-auto max-h-[56vh] md:mx-2 my-5 rounded-xl overflow-hidden px-4 outline outline-1 outline-gray-100">
        <div>
          <div className="flex justify-between h-10 mb-2 items-center">
            <div className="flex items-center gap-2">
              <IoDocumentTextOutline className="text-xl" />
              <span className="text-base font-bold">Project Ideas</span>
            </div>
            <div className="text-xl flex gap-3">
              <IoShareSocialOutline className="hover:opacity-[100] opacity-75 cursor-pointer" />
              <MdDeleteOutline className="hover:opacity-[100] opacity-75 cursor-pointer" />
            </div>
          </div>
          <div className="h-12 font-bold text-2xl">Future Projects</div>
        </div>
        <div className=" object-cover overflow-hidden items-center">
          {/* Twitter Embed */}
          {twitterSrc &&<blockquote
            className="twitter-tweet"
            data-theme="dark"
            style={{ width: "100%", maxWidth: "500px" }} 
          >
            <a href={transformedUrl}></a>
          </blockquote>}

          {/* YouTube Embed */}
          {YoutubeSrc && (
            <iframe
              src={embedUrl}
              className="w-full h-[100%]"
              style={{ maxWidth: "500px", aspectRatio: "16/9" }} // Limits the iframe size to fit content
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          )}
        </div>

        <div>
          <div className="text-sm w-full h-10 items-center flex gap-1">
            <div className="bg-purple-300 text-purple-500 w-fit px-3 py-1 rounded-xl">#productivity</div>
            <div className="bg-purple-300 text-purple-500 w-fit px-3 py-1 rounded-xl">#ideas</div>
          </div>
          <div className="h-8 items-center my-1 text-sm opacity-75">
            Added on 10/03/2024
          </div>
        </div>
      </div>
    );
  };
  
  export default Card;
  
