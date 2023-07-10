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
import Swal from 'sweetalert2'

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
    try{
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
    }}
    catch{
      Swal.fire({
        title: 'Login!',
        text: 'Do you want to continue? Please Login!!',
        icon: 'error',
        confirmButtonText: 'OK'
      })
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
      <div className="col-lg-5">
        <div className="card">
          <div className="justify-content-right col-lg-3">
            <p>{post.username}</p>
          </div>
          <div className="card-body">
            <h5 className="card-title">{post.title}</h5>
            <p className="card-text">{post.discription}</p>
            <div className="d-flex justify-content-end">
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
                  ></i>
                </span>
                {likes && <p>{likes.length}</p>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
