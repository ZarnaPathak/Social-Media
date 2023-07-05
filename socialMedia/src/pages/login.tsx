import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
    navigate("/");
  };

  return (
    <>
      <br /><br />
     <div className="row justify-content-center">
      <div className="card justify-content-center border border-secondary col-lg-6" style={{width:500}}>
        <h3 className="card-title">Login</h3>
        <div className="card-body">
          <p className="card-text">SignIn with Google to Continue</p>
          <button onClick={signInWithGoogle} className="btn btn-secondary">
            SignIn with Google
          </button>
        </div>
      </div>
      </div>
    </>
  );
};
