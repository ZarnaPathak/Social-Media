import { Link } from "react-router-dom";
import { auth } from "../config/firebase";

export const Navbar = () => {
  return (
    <>
      <Link to="/">Home</Link>&nbsp;&nbsp;&nbsp;
      <Link to="/login">Login</Link>
      <h4>{auth.currentUser?.displayName}</h4>
      <img src={auth.currentUser?.photoURL || "not set"} />
    </>
  );
};
