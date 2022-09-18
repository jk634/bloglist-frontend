import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import NewBlog from './components/NewBlog';
import Notification from './components/Notification';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      setBlogs(blogs);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  const handleAuthorChange = (event) => setAuthor(event.target.value);
  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleUrlChange = (event) => setUrl(event.target.value);

  const notify = (msg) => {
    console.log(msg);
    setMessage(msg);
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log('logging in with', username, password);

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
      notify('Logged in');
    } catch (exception) {
      console.log();
      notify(exception.response.data.error);
    }
  };

  const handleNewBlog = async (event) => {
    event.preventDefault();

    try {
      const newBlog = {
        title: title,
        author: author,
        url: url,
      };
      const response = await blogService.create(newBlog);
      setTitle('');
      setAuthor('');
      setUrl('');
      setBlogs(blogs.concat(response));
      console.log(response.title);
      notify(`a new blog ${response.title} by ${response.author} added`);
    } catch (exception) {
      notify(exception.response.data.error);
    }
  };

  const handleClickLogout = () => {
    window.localStorage.clear();
    console.log('logged out');
    setUser(null);
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type='text'
              value={username}
              name='Username'
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type='password'
              value={password}
              name='Password'
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      <p style={{ display: 'inline' }}>{user.name} logged in</p>
      <button onClick={handleClickLogout}>logout</button>
      <NewBlog
        handleNewBlog={handleNewBlog}
        handleAuthorChange={handleAuthorChange}
        handleTitleChange={handleTitleChange}
        handleUrlChange={handleUrlChange}
        author={author}
        title={title}
        url={url}
      />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
