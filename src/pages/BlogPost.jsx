import React from "react";

const BlogPost = ({ post }) => {
  return (
    <div className="blog-post">
      <h2>{post.title}</h2>
      <p><strong>{post.author}</strong> - {post.date}</p>
      <p>{post.content}</p>
    </div>
  );
};

export default BlogPost;