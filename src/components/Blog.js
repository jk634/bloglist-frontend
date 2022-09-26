import { useState } from 'react';

const Blog = ({ blog, buttonLabel, modifyBlog, removeBlog, user }) => {
  const [visible, setVisible] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const removeButtonStyle = {
    backgroundColor: 'blue',
    color: 'white',
    borderRadius: '5px',
  };

  const handleClickBlogView = () => {
    setVisible(!visible);
  };

  const handleClickRemove = () => {
    removeBlog(blog);
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
            {user.name === blog.user.name ? (
              <>
                <br />
                <button style={removeButtonStyle} onClick={handleClickRemove}>
                  remove
                </button>
              </>
            ) : (
              <></>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Blog;
