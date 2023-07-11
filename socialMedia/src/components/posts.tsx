import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { postCheck } from "../pages/main";
import { auth, database } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface Props {
  post: postCheck;
}

interface likeSchema {
  likeId: string;
  userId: string;
}

export const Post = (props: Props) => {
  const { post } = props;
  const [user] = useAuthState(auth);

  const likeRef = collection(database, "likes");

  const [likes, setLikes] = useState<likeSchema[] | null>(null);

  const likeDoc = query(likeRef, where("postId", "==", post.id));

  const getLikes = async () => {
    const data = await getDocs(likeDoc);
    setLikes(
      data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id }))
    );
  };

  const addLike = async () => {
    try {
      const newDoc = await addDoc(likeRef, {
        userId: user?.uid,
        postId: post.id,
      });
      if (user) {
        setLikes((prev) =>
          prev
            ? [...prev, { userId: user.uid, likeId: newDoc.id }]
            : [{ userId: user.uid, likeId: newDoc.id }]
        );
      }
    } catch {
      Swal.fire({
        title: "Login!",
        text: "Do you want to continue? Please Login!!",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  useEffect(() => {
    getLikes();
  }, []);

  const isUserLiked = likes?.find((like) => like.userId === user?.uid);

  const deleteLike = async () => {
    const likeToDeleteQuery = query(
      likeRef,
      where("postId", "==", post.id),
      where("userId", "==", user?.uid)
    );
    const likeToDeleteData = await getDocs(likeToDeleteQuery);
    const likeId = likeToDeleteData.docs[0].id;
    const likeToDelete = doc(database, "likes", likeId);
    await deleteDoc(likeToDelete);
    if (user) {
      setLikes((prev) => prev && prev.filter((like) => like.likeId !== likeId));
    }
  };

  return (
    <>
      <div className="col-5 mt-3 card">
        <span className="text-right" style={{alignSelf:"end"}}>@{post.username}</span>
        <p className="fs-4">{post.title}</p>
        <p className="fs-6">{post.discription}</p>
        <div className="d-flex justify-content-start">
              <button
                className="btn"
                onClick={isUserLiked ? deleteLike : addLike}
                style={{ border: "none" }}
              >
                <span>
                  <i
                    className={
                      isUserLiked ? "bi bi-heart-fill fs-3" : "bi bi-heart fs-3"
                    }
                    style={{ color: "pink", alignSelf: "end"}}
                  ></i>
                </span>
              </button>
              {likes && <p>{likes.length}</p>}
            </div>

      </div>
      &nbsp;&nbsp;&nbsp;&nbsp;
    </>
  );
};
