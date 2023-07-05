export const CreatePost = () => {
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
            <form>
              <div className="form-outline mb-4">
                <p className="form-label fs-5 text-start">Title</p>
                <input
                  type="text"
                  id="form4Example1"
                  className="form-control"
                />
              </div>

              <div className="form-outline mb-4">
                <p className="form-label fs-5 text-start">Discription</p>
                <textarea
                  className="form-control"
                  id="form4Example3"
                ></textarea>
              </div>
              <button className="btn btn-secondary">Post Me!</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
