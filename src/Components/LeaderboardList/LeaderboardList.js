import { useEffect, useState } from "react";

export default function LeaderboardList() {
  const [memes, setMemes] = useState([]);

  useEffect(() => {
    // Fetch memes from API
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => {
        const sortedMemes = data.data.memes
          .map((meme) => ({
            ...meme,
            likes: JSON.parse(localStorage.getItem(`likes-${meme.id}`)) || 0,
          }))
          .sort((a, b) => b.likes - a.likes)
          .slice(0, 10);
        setMemes(sortedMemes);
      });
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">🏆 Leaderboard</h2>
      {memes.map((meme, index) => (
        <div key={meme.id} className="border p-2 rounded-lg flex items-center">
          <span className="text-lg font-bold mr-4">#{index + 1}</span>
          <img src={meme.url} alt={meme.name} className="w-16 h-16 mr-4" />
          <div>
            <p className="text-lg font-semibold">{meme.name}</p>
            <p className="text-gray-500">❤️ {meme.likes}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
