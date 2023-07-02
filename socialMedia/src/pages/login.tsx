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
      <h1>Login</h1>
      <p>SignIn with Google to Continue</p>
      <button onClick={signInWithGoogle}>SignIn with Google</button>
    </>
  );
};
