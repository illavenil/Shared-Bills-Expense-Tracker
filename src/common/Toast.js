const Toast = ({ message }) => {
  // Use this style in line main className <div> container
  // let style = "bg-primary"
  // if (type === "error") {
  //     style = "bg-danger"
  // } else if (type === "success") {
  //     style = "bg-success"
  // }
  return (
    <>
      <div className="toast-container">
        {/* <div className="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
                    <div id="liveToast" className="toast hide" role="alert" aria-live="assertive" aria-atomic="true">
                        <div className="toast-header">
                            <strong className="me-auto">{header}</strong>
                            <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                        </div>
                        <div className="toast-body">
                            {message}
                        </div>
                    </div>
                </div> */}
        <div
          className="toast align-items-center text-white bg-primary border-0"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="d-flex">
            <div className="toast-body">{message}</div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Toast;
