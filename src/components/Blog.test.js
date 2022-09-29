import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Blog from './Blog';

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
});
