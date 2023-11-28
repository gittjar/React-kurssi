import { Link } from "react-router-dom";

const Menu = () => {
    const padding = {
      paddingRight: 5,
    };
    return (
      <div className='nav-links'>
        <Link style={padding} to="/">
          Home
        </Link>
        <Link style={padding} to="/createnew">
          Create new
        </Link>
        <Link style={padding} to="/anecdotes">
          Anecdotes
        </Link>
        <Link style={padding} to="/about">
          About
        </Link>
      </div>
    );
  };

export default Menu;