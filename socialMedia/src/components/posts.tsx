import { postCheck } from "../pages/main";

interface Props {
  post: postCheck;
}

export const Post = (props: Props) => {
  const { post } = props;
  return (
    <>
      <div className="row">
        <div className="col-lg-6">
          <div className="card">
            <div className="justify-content-right col-lg-3">
              <p>{post.username}</p>
            </div>
            <div className="card-body">
              <h5 className="card-title">{post.title}</h5>
              <p className="card-text">{post.discription}</p>
              <div className="d-flex justify-content-end">
                <i className="bi bi-heart fs-3"></i>
              </div>
            </div>
          </div>
        </div>
      </div>&nbsp;&nbsp;&nbsp;&nbsp;
    </>
  );
};
