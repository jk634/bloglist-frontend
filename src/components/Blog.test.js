import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';
import { testBlog, testUser } from '../utils/testHelper';

describe('Blog', () => {
  test('renders title and author by default', () => {
    const blog = {
      title: 'should render title and',
      author: 'Timo Testaaja',
      url: 'www.test.com',
    };

    const { container } = render(<Blog blog={blog} />);
    const div = container.querySelector('.blog');

    expect(div).toHaveTextContent('should render title and Timo Testaaja');
    expect(div).not.toHaveTextContent('www.test.com');
    expect(div).not.toHaveValue(0);
  });

  test('renders title, author, url and likes when show button is clicked', async () => {
    const renderedBlog = render(<Blog blog={testBlog} user={testUser} />);
    const div = renderedBlog.container.querySelector('.blog');

    const user = userEvent.setup();
    const button = renderedBlog.getByText('view');
    await user.click(button);

    expect(div).toHaveTextContent('should render title, author, url and likes');
    expect(div).toHaveTextContent('www.test.com');
    expect(div).toHaveTextContent('likes');
  });

  test('verify that the call has occurred twice when the click button is clicked twice', async () => {
    const likeMock = jest.fn();

    render(<Blog blog={testBlog} user={testUser} modifyBlog={likeMock} />);

    const user = userEvent.setup();
    const showAll = screen.getByText('view');
    await user.click(showAll);

    const likeButton = screen.getByText('like');
    await user.click(likeButton);
    await user.click(likeButton);

    expect(likeMock.mock.calls).toHaveLength(2);
  });
});
