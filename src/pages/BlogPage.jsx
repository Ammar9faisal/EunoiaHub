// src/BlogPage.jsx
import React, { useState, useEffect } from "react";
import BlogPost from "./BlogPost";
import "./BlogStyle.css";

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    fetch("/BlogPosts.json")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        setSelectedPost(data[0]); // Show latest post by default
      })
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  return (
    <div className="blog-container">
      <h1>Monthly Blog</h1>

      {/* Show "View Latest Post" button if a previous post is selected */}
      {selectedPost && selectedPost !== posts[0] && (
        <button className="latest-post-btn" onClick={() => setSelectedPost(posts[0])}>
          View Latest Post
        </button>
      )}

      {selectedPost && <BlogPost post={selectedPost} />}

      <h2>Previous Posts</h2>
      <ul>
        {posts.slice(1).map((post, index) => (
          <li key={index} onClick={() => setSelectedPost(post)}>
            {post.title} - {post.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogPage;
