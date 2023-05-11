"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);

  const handleSearch = async () => {
    const response = await fetch(`/api/search/${searchText}`);
    const data = await response.json();
    setPosts(data);
  };
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleTagClick = (post) => {
    console.log(post)
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={(e) => handleSearchChange(e)}
          required
          className="search_input peer mr-2"
        />
        <button type="button" className="search_btn" onClick={handleSearch}>
          Search
        </button>
      </form>
      <PromptCardList data={posts} handlerTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
