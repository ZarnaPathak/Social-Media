import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export const Navbar = () => {
  const [user] = useAuthState(auth);
  return (
    <>
      <Link to="/">Home</Link>&nbsp;&nbsp;&nbsp;
      <Link to="/login">Login</Link>
      <h4>{user?.displayName}</h4>
      <img src={user?.photoURL || "not set"} alt="Profile"/>
    </>
  );
};
