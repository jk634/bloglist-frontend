import { useState } from 'react';

const Blog = ({ blog, buttonLabel }) => {
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
            likes {blog.likes} <button>like</button>
            <br />
            {blog.user.name}
          </>
        )}
      </div>
    </div>
  );
};

export default Blog;
