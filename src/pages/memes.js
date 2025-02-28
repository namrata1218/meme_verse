import { useState, useEffect, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import MemeCard from "@/Components/MemeCard/MemeCard.js";
import { debounce } from "lodash";
export default function MemeExplorer() {
  const [memes, setMemes] = useState([]);
  const [filteredMemes, setFilteredMemes] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("likes");
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchMemes();
  }, []);

  const fetchMemes = async () => {
    try {
      console.log("Fetching memes...");
      const res = await axios.get("https://api.imgflip.com/get_memes");
      let fetchedMemes = res.data?.data?.memes || [];

      if (!fetchedMemes.length) {
        console.warn("No memes found!");
        setHasMore(false);
        return;
      }

      
      fetchedMemes = fetchedMemes.map((meme) => ({
        ...meme,
        likes: Math.floor(Math.random() * 100000),
        comments: Math.floor(Math.random() * 10000),
      }));

      console.log("Fetched Memes:", fetchedMemes);

      setMemes(fetchedMemes);
      setFilteredMemes(fetchedMemes); 
    } catch (error) {
      console.error("Error fetching memes:", error);
      setHasMore(false);
    }
  };


  const sortMemes = (memesList) => {
    return [...memesList].sort((a, b) =>
      sortOption === "likes" ? b.likes - a.likes : b.comments - a.comments
    );
  };

  
  const filterAndSortMemes = useCallback(() => {
    let updatedMemes = memes;

    if (searchQuery.trim()) {
      updatedMemes = memes.filter((meme) =>
        meme.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }


    updatedMemes = sortMemes(updatedMemes);

    setFilteredMemes(updatedMemes);
  }, [memes, searchQuery, sortOption]);


  const handleSearchChange = useCallback(
    debounce((e) => {
      setSearchQuery(e.target.value);
    }, 500),
    []
  );


  useEffect(() => {
    filterAndSortMemes();
  }, [searchQuery, sortOption]);

  return (
    <div className="p-6">
      <h1 className="content text-4xl font-bold text-white text-center p-4">
        Meme Explorer
      </h1>

     
      <div className="flex justify-between items-center mb-4">
        
        <input
          type="text"
          placeholder="Search Memes"
          onChange={handleSearchChange}
          className="p-2 border rounded"
        />

        
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="likes">Sort by Likes</option>
          <option value="comments">Sort by Comments</option>
        </select>
      </div>

      
      <InfiniteScroll
        dataLength={filteredMemes.length}
        next={() => setPage((prev) => prev + 1)}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mt-4">
          {filteredMemes.length > 0 ? (
            filteredMemes.map((meme) => <MemeCard key={meme.id} meme={meme} initialLikes={meme.likes} initialComments={meme.comments} />)
          ) : (
            <p className="text-white text-center col-span-4">No memes found!</p>
           
          )}
          
        </div>
      </InfiniteScroll>
    </div>
  );
}
