import { addDoc, collection } from "firebase/firestore";
import { database, auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { postCheck } from "../pages/main";

interface Props {
  like: postCheck;
}

export const Like = (props: Props) => {
  const { like } = props;

  const [user] = useAuthState(auth);
  const likesRef = collection(database, "likes");

  const addLike = async () => {
    await addDoc(likesRef, {
      userId: user?.uid,
      postId: like.id,
    });
  };
  return (
    <>
      <button className="btn" style={{ border: "none" }} onClick={addLike}>
        <span>
          <i className="bi bi-heart fs-3"></i>
        </span>
      </button>
    </>
  );
};
