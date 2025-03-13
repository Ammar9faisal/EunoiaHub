import React, { useState, useEffect } from "react";
import BlogPost from "./BlogPost";
import "./BlogStyle.css";
import Sidebar from '../components/Sidebar.jsx';

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    fetch("/blogPosts.json")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        setSelectedPost(data[0]);
      })
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  return (
    <div className="blog-page-container">
      <Sidebar />
      <div className="blog-page-content">
        <h1>Monthly Blog</h1>

        {/* Show "View Latest Post" button if a previous post is selected */}
        {selectedPost && selectedPost !== posts[0] && (
          <button className="blog-page-latest-post-btn" onClick={() => setSelectedPost(posts[0])}>
            View Latest Post
          </button>
        )}

        {selectedPost && <BlogPost post={selectedPost} />}

        <h2>Previous Posts</h2>
        <ul className="blog-page-post-list">
          {posts.slice(1).map((post, index) => (
            <li key={index} className="blog-page-post-item" onClick={() => setSelectedPost(post)}>
              {post.title} - {post.date}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BlogPage;

