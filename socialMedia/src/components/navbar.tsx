import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import img1 from "../assets/Postech.png";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [user] = useAuthState(auth);
  const signOutUser = async () => {
    await signOut(auth);
    const navigate = useNavigate();
    navigate("/");
  };
  return (
    <>
      <nav className="navbar navbar-expand-md navbar-light bg-light">
        <div className="container-fluid justify-content-between">
          <div className="d-flex">
            <a
              className="navbar-brand me-2 mb-1 d-flex align-items-center"
              href="#"
            >
              <Link to="/" className="navbar-brand">
                <img
                  src={img1}
                  height="29"
                  alt="Logo"
                  loading="lazy"
                  style={{ marginTop: "2px" }}
                />
              </Link>
            </a>
          </div>
          <ul className="navbar-nav flex-row">
            <li className="nav-item me-3">
              <Link
                className="nav-link d-sm-flex align-items-sm-center fs-4"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item me-3 me-lg-1">
              <span>
                {user ? (
                  <>
                    <li className="nav-item">
                      <Link to="/createpost" className="nav-link fs-4">
                        Create Post
                      </Link>
                    </li>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="nav-link d-sm-flex align-items-sm-center fs-4"
                  >
                    Sign In
                  </Link>
                )}
              </span>
            </li>
            &nbsp;&nbsp;&nbsp;&nbsp;
            {user && (
              <div className="d-flex align-items-center">
                <>
                  <img
                    src={user?.photoURL || "not set"}
                    alt="Profile"
                    className="rounded-circle"
                    height="25"
                    loading="lazy"
                  />
                  <button
                    onClick={signOutUser}
                    className="nav-item nav-link fs-5"
                  >
                    Log Out
                  </button>
                </>
              </div>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};
