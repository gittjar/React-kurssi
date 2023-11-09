import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import BlogForm from './BlogForm';

it('should render the form with input fields and handle changes and submission', () => {
  const newBlog = {
    title: 'My Blog Title',
    author: 'John Doe',
    url: 'https://example.com/my-blog',
  };

  const handleBlogChange = jest.fn();
  const addBlog = jest.fn();

  const { getByText, getByLabelText, getByTestId } = render(
    <BlogForm newBlog={newBlog} handleBlogChange={handleBlogChange} addBlog={addBlog} />
  );

  // Check that the form fields are rendered
  const titleInput = getByLabelText('Title');
  const authorInput = getByLabelText('Author');
  const urlInput = getByLabelText('URL');
  const saveButton = getByText('Save');

  // Simulate user input
  fireEvent.change(titleInput, { target: { value: newBlog.title } });
  fireEvent.change(authorInput, { target: { value: newBlog.author } });
  fireEvent.change(urlInput, { target: { value: newBlog.url } });

  // Check that handleBlogChange is called with the correct values
  expect(handleBlogChange).toHaveBeenCalledWith(newBlog);

  // Simulate form submission
  fireEvent.click(saveButton);

  // Check that addBlog is called
  expect(addBlog).toHaveBeenCalled();
});
