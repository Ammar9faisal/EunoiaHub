import React, { useState, useEffect } from "react";
import BlogPost from "./BlogPost";
import "../../styles/BlogStyle.css";
import { Sidebar } from '../components/Sidebar.jsx';

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch("/blogPosts.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch blog posts");
        }
        return response.json();
      })
      .then((data) => {
        setPosts(data);
        setSelectedPost(data[0]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="blog-page-container">
        <Sidebar />
        <div className="blog-page-content">
          <h1>Monthly Blog</h1>
          <div className="loading-indicator">Loading blog posts...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="blog-page-container">
        <Sidebar />
        <div className="blog-page-content">
          <h1>Monthly Blog</h1>
          <div className="error-message">Error: {error}</div>
        </div>
      </div>
    );
  }

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
        {posts.length > 1 ? (
          <ul className="blog-page-post-list">
            {posts.slice(1).map((post, index) => (
              <li key={index} className="blog-page-post-item" onClick={() => setSelectedPost(post)}>
                <div className="post-title">{post.title}</div>
                <div className="post-date">{post.date}</div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-posts-message">No previous posts available yet.</p>
        )}
      </div>
    </div>
  );
};

<<<<<<< HEAD
<<<<<<< HEAD
export default BlogPage;
=======
export default BlogPage;
>>>>>>> 7c59e5a (Refactored Css styling from Master/improve Achievements page styling)
=======
export default BlogPage;

>>>>>>> d3f6374 (Revert "Achivements implementation")
