import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

export const Navbar = () => {
  const [user] = useAuthState(auth);
  const signOutUser = async () => {
    await signOut(auth);
  };
  return (
    <>
      <Link to="/">Home</Link>&nbsp;&nbsp;&nbsp;
      <Link to="/login">Login</Link>
      {user && (
        <>
          <h4>{user?.displayName}</h4>
          <img src={user?.photoURL || "not set"} alt="Profile" />
          <div>
            <button onClick={signOutUser}>Log Out</button>
          </div>
        </>
      )}
    </>
  );
};
