import React from "react";

const BlogPost = ({ post }) => {
  // Function to format the content with paragraph breaks
  const formatContent = (content) => {
    return content.split('\n\n').map((paragraph, index) => (
      <p key={index}>{paragraph}</p>
    ));
  };

  return (
    <div className="blog-post">
      <h2>{post.title}</h2>
      <p>
        <strong>{post.author}</strong> - {post.date}
      </p>
      {formatContent(post.content)}
    </div>
  );
};

export default BlogPost;