const NewBlog = (p) => (
  <>
    <h2>create new</h2>
    <form onSubmit={p.handleNewBlog}>
      <div>
        title
        <input
          type='text'
          value={p.title}
          name='title'
          onChange={p.handleTitleChange}
        />
      </div>
      <div>
        author
        <input
          type='text'
          value={p.author}
          name='author'
          onChange={p.handleAuthorChange}
        />
      </div>
      <div>
        url
        <input
          type='text'
          value={p.url}
          name='url'
          onChange={p.handleUrlChange}
        />
      </div>
      <button type='submit'>create</button>
    </form>
  </>
);

export default NewBlog;
