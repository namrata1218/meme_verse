import { useEffect, useState } from "react";
import axios from "axios";

export default function Leaderboard() {
  const [topMemes, setTopMemes] = useState([]);

  useEffect(() => {
    fetchMemes();
  }, []);

  const fetchMemes = async () => {
    try {
      const res = await axios.get("https://api.imgflip.com/get_memes");
      let memes = res.data?.data?.memes || [];

      // Assign random likes (for demo purposes)
      memes = memes.map((meme) => ({
        ...meme,
        likes: Math.floor(Math.random() * 100000), // Simulating likes
      }));

      // Sort by likes and get Top 10
      const sortedMemes = memes.sort((a, b) => b.likes - a.likes).slice(0, 10);

      setTopMemes(sortedMemes);
    } catch (error) {
      console.error("Error fetching memes:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className=" content text-3xl font-bold text-white text-center mb-4">🔥 Top 10 Most Liked Meme</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {topMemes.length > 0 ? (
          topMemes.map((meme, index) => (
            <div key={meme.id} className="border p-4 rounded-lg shadow-lg bg-gray-800">
              <h2 className="text-xl font-bold text-white">#{index + 1} {meme.name}</h2>
              <img src={meme.url} alt={meme.name} className="w-full h-48 object-cover rounded mt-2" />
              <p className="mt-2 text-white">❤️ {meme.likes} Likes</p>
            </div>
          ))
        ) : (
          <p className="text-white text-center">Loading...</p>
        )}
      </div>
    </div>
  );
}
