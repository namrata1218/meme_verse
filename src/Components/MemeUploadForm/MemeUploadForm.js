import { useState } from "react";

export default function MemeUploadForm() {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="border p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2">Upload Meme</h2>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {image && <img src={image} alt="Meme Preview" className="mt-4 w-full" />}
      <input
        type="text"
        placeholder="Enter a funny caption"
        className="border p-2 mt-2 w-full"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
        Upload
      </button>
    </div>
  );
}
