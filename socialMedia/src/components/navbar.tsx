import {Link} from "react-router-dom"

export const Navbar = () => {
    return (
      <>
        <Link to="/">Home</Link>&nbsp;&nbsp;&nbsp;
        <Link to="/login">Login</Link>
      </>
    );
  };