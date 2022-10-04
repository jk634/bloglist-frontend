import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NewBlog from './NewBlog';

describe('NewBlog', () => {
  test('the content is right when it is called', async () => {
    const addBlogMock = jest.fn();
    const { container } = render(<NewBlog createBlog={addBlogMock} />);

    const title = container.querySelector('#title');
    const author = container.querySelector('#author');
    const url = container.querySelector('#url');
    const create = container.querySelector('#create');

    const user = userEvent.setup();

    await user.type(title, 'testing a form...');
    await user.type(author, 'Tom Tester');
    await user.type(url, 'www.testing.com');

    await user.click(create);

    expect(addBlogMock.mock.calls).toHaveLength(1);
    expect(addBlogMock.mock.calls[0][0].title).toBe('testing a form...');
    expect(addBlogMock.mock.calls[0][0].url).toBe('www.testing.com');
  });
});
