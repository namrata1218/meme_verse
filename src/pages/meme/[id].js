import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";

export default function MemeDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [meme, setMeme] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get(`https://api.imgflip.com/get_memes`).then((res) => {
        const foundMeme = res.data.data.memes.find((m) => m.id === id);
        setMeme(foundMeme);
      });
    }
  }, [id]);

  if (!meme) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">{meme.name}</h1>
      <img src={meme.url} alt={meme.name} className="w-full max-w-md mx-auto" />
    </div>
  );
}
