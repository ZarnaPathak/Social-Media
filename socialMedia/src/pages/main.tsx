import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";
import { database } from "../config/firebase";
import { useEffect, useState } from "react";

interface postCheck {
  id: string;
  userId: string;
  title: string;
  discription: string;
  username: string;
}

export const Main = () => {
  const [user] = useAuthState(auth);
  const postRef = collection(database, "posts");

  const [postList, setPostList] = useState<postCheck[] | null>(null);

  const getPosts = async () => {
    const data = await getDocs(postRef);
    setPostList(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as postCheck[]
    );
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <br />
      <br />
      <h1 className="text-center">Main Page</h1>
      <br />
      <div className="row justify-content-center">
        {postList?.map((post) => (
          <div className="card justify-content-center border border-secondary col-5">
            <div className="justify-content-right col-lg-3">
              <p>{user?.displayName}</p>
            </div>
            <h3 className="card-title">{post.title}</h3>
            <div className="card-body">
              <p className="card-text">{post.discription}</p>
            </div>
            <div className="d-flex justify-content-end">
              <i className="bi bi-heart fs-3"></i>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
