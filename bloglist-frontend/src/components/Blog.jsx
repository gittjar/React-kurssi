import blogs from "../services/blogs"

const Blog = ({ blog, toggleImportance }) => {
  const label = blog.important
    ? 'make not important' : 'make important'

  return (
    <li className='blog'>
      {blogs.author} 
      <button onClick={toggleImportance}>{label}</button>
    </li>
  )
}

export default Blog