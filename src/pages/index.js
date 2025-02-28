import MemeCard from "@/Components/MemeCard/MemeCard";
import "../style/globals.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Upload from "./upload";
export default function Home() {
  const [memes, setMemes] = useState([]);
  const [uploadedMemes, setUploadedMemes] = useState([]);
  useEffect(() => {
    axios.get("https://api.imgflip.com/get_memes").then((res) => {
      const fetchedMemes = res.data.data.memes.slice(0, 10).map((meme) => ({
        ...meme,
        likes: Math.floor(Math.random() * 1000), // Add random likes
        comments: Math.floor(Math.random() * 10000), // Add random comments
      }));

      setMemes(fetchedMemes);
    });
  }, []);

  return (
    <div className="container-box p-6">
      <h1 className="content text-3xl font-bold text-white text-center">
        Trending Memes
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mt-4">
        {memes.map((meme) => (
          <MemeCard
            key={meme.id}
            meme={meme}
            initialLikes={meme.likes}
            initialComments={meme.comments}
          />
        ))}
      </div>
    </div>
  );
}
