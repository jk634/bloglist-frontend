import { useState } from 'react';

const NewBlog = ({ createBlog }) => {
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const handleAuthorChange = (event) => setAuthor(event.target.value);
  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleUrlChange = (event) => setUrl(event.target.value);

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: title,
      author: author,
      url: url,
    });

    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            type='text'
            value={title}
            name='title'
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author
          <input
            type='text'
            value={author}
            name='author'
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url
          <input
            type='text'
            value={url}
            name='url'
            onChange={handleUrlChange}
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </>
  );
};

export default NewBlog;
