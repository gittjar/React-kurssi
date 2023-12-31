import React from 'react';

const Blog = ({ blog, toggleImportance }) => {
  const label = blog.important
    ? 'make not important'
    : 'make important';


  return (
    <li className='blog'>
      {blog.author} {/* Näytä kirjoittajan nimi */}
      <button onClick={toggleImportance}>{label}</button>

    </li>
  );
};

export default Blog;
