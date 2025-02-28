import { useState } from "react";
import { ShapesIcon, Share, Share2Icon } from 'lucide-react';




export default function MemeCard({ meme , initialLikes, initialComments}) {
  const [likes, setLikes] = useState(
    () => JSON.parse(localStorage.getItem(`likes-${meme.id}`)) || initialLikes
  );

  const [comments, setComments]=useState(()=>{
    return JSON.parse(localStorage.getItem(`comments-${meme.id}`))||[];
  });
  const [commentText, setCommentText] = useState("");

  const handleLike = () => {
    const newLikes = likes + 1;
    setLikes(newLikes);
    localStorage.setItem(`likes-${meme.id}`, JSON.stringify(newLikes));
  };

  const handleComment=()=>{
    if(commentText.trim()){
      const newComments=[...comments, commentText];
      setComments(newComments);
      setCommentText("");
    }
  };


  const handleShare=async()=>{
    const memeUrl=meme.url;
    if(navigator.share){
      try {
        await navigator.share({
          title:"check out this meme!",
          text:"I found this hilarious meme! 😂😂",
          url:memeUrl,
        });
        
      } catch (error) {
        console.log("error in sharing", error);
        
      }

      

      }
      
else{
  navigator.clipboard.writeText(memeUrl);
  alert("copied to clipboard!");
}
    }
  

  return (
    <div className="container border p-4 rounded-lg shadow-md">
      <img src={meme.url} alt={meme.name} className=" img-cont w-full h-48 object-cover rounded" />
      <h2 className="content text-lg text-white font-bold mt-2  block
    h-12 overflow-hidden text-ellipsis whitespace-nowrap w-full ">{meme.name}</h2>
      
      <div className="box flex justify-between">
      <button
        onClick={handleLike}
        className=" content mt-2  text-white  rounded"
      >
        ❤️ {likes}
      </button>


      <button onClick={handleShare} className="  border rounded" >< Share2Icon className="share-icon"/></button>

      </div>
      <p>#comments {initialComments+comments.length}</p>
      <div className="mt-4">
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment..."
          className="p-2 border rounded w-full text-black"
        />
        <button
          onClick={handleComment}
          className="mt-2 bg-white px-4 py-2 rounded-lg w-full"
        >
          Add Comment
        </button>
        
        <ul className="mt-2 text-sm text-gray-400">
          {comments.map((comment, index) => (
            <li key={index} className=" hidden border-b py-1">{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
