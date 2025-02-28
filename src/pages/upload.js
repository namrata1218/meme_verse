import { useState } from "react";

export default function Upload({ onMemeUpload }) {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleUpload = () => {
    if (!image) {
      alert("Please upload an image first!");
      return;
    }

    const newMeme = {
      id: Date.now(), 
      url: image,
      name: caption || "Untitled Meme",
      likes: 0,
      comments: [],
    };

    onMemeUpload(newMeme);
    setImage(null);
    setCaption("");
  };

  return (
    <div className="p-6 border rounded-lg shadow-lg bg-gray-800">
      <h1 className="text-2xl font-bold text-white text-center">Upload Your Meme</h1>

      <input type="file" accept="image/*" onChange={handleImageUpload} className="mt-4" />
      {image && <img src={image} alt="Meme Preview" className="mt-4 w-1/2 mx-auto rounded-lg shadow-md" />}

      <input
        type="text"
        placeholder="Add a caption..."
        className="border p-2 mt-2 w-full rounded text-black"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />

      <button onClick={handleUpload} className="mt-2 bg-blue-500 text-white p-2 rounded w-full">
        Upload Meme
      </button>
    </div>
  );
}
