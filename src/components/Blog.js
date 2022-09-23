import { useState } from 'react';

const Blog = ({ blog, buttonLabel, modifyBlog }) => {
  const [visible, setVisible] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleClickBlogView = () => {
    setVisible(!visible);
  };

  const handleClickLike = () => {
    modifyBlog(blog.id, {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    });
  };

  console.log(blog);

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        {!visible ? (
          <button onClick={handleClickBlogView}>view</button>
        ) : (
          <>
            <button onClick={handleClickBlogView}>hide</button>
            <br />
            {blog.url}
            <br />
            likes {blog.likes} <button onClick={handleClickLike}>like</button>
            <br />
            {blog.user.name}
          </>
        )}
      </div>
    </div>
  );
};

export default Blog;
