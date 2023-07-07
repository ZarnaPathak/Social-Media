import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

interface postData {
  title: string;
  discription: string;
}

export const CreatePost = () => {
  const schema = yup.object().shape({
    title: yup.string().required("You should Add Title"),
    discription: yup.string().required("You should Add Discription"),
  });

  const { register, handleSubmit, formState:{errors} } = useForm<postData>({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const createPostForm = (data: postData) => {
    console.log(data);
    navigate("/");
  };

  return (
    <>
      <br />
      <br />
      <div className="row justify-content-center">
        <div
          className="card border border-secondary col-lg-6 justify-content-center"
          style={{ width: 500 }}
        >
          <h2 className="card-title font-monospace">Write Your Post</h2>
          <div className="card-body">
            <form onSubmit={handleSubmit(createPostForm)}>
              <div className="form-outline mb-4">
                <p className="form-label fs-5 text-start">Title</p>
                <input
                  type="text"
                  id="form4Example1"
                  className="form-control"
                  {...register("title")}
                />
                <p style={{color:"red"}}>{errors.title?.message}</p>
              </div>

              <div className="form-outline mb-4">
                <p className="form-label fs-5 text-start">Discription</p>
                <textarea
                  className="form-control"
                  id="form4Example3"
                  {...register("discription")}
                ></textarea>
                <p style={{color:"red"}}>{errors.discription?.message}</p>
              </div>
              <input
                type="submit"
                className="btn btn-secondary"
                value="Post Me!"
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
