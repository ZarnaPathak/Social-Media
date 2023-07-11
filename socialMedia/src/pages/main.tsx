import { getDocs, collection } from "firebase/firestore";
import { database } from "../config/firebase";
import { useEffect, useState } from "react";
import { Post } from "../components/posts";


export interface postCheck {
  id: string;
  userId: string;
  title: string;
  discription: string;
  username: string;
}

export const Main = () => {
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
      <br /><br />
      <div className="row justify-content-center">
      {postList?.map((post) => (
        <Post post={post} />
        ))}
      </div>
      
    </>
  );
};
