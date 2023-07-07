import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import img1 from "../assets/Postech.png";

export const Navbar = () => {
  const [user] = useAuthState(auth);
  const signOutUser = async () => {
    await signOut(auth);
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <Link to="/" className="nav-link fs-4 navbar-brand mt-2 mt-lg-0">
              <img src={img1} height="29" alt="Logo" loading="lazy" />
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link fs-4">
                  Home
                </Link>
              </li>
              &nbsp;&nbsp;&nbsp;
              {!user ? (
                <li className="nav-item">
                  <Link to="/login" className="nav-link fs-4">
                    Login
                  </Link>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to="/createpost" className="nav-link fs-4">
                      Create Post
                    </Link>
                  </li>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <div className="d-flex align-items-center">
                    {user && (
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
                    )}
                  </div>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
