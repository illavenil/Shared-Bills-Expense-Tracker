import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { postAPICall } from "../api/apiService";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";
const Signup = () => {
  const navigate = useNavigate();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const response = await postAPICall("/users", data);
    console.log("response from signup", response);

    if (response != null) {
      Cookies.set("userID", response._id, { expires: 7, secure: true });
      console.log("into this");
      // Cookies.set('userName', response.userName, { expires: 7, secure: true });
      // Cookies.set('userEmail', response.userEmail, { expires: 7, secure: true });
      navigate("/home");
    }
  };

  const onCancel = () => {
    reset();
  };
  const onLogin = () => {
    navigate("/Login");
  };

  return (
    <div className="signup" id="signup-container">
      <div
        style={{
          borderRadius: "8px",
          border: "1.5px solid grey",
          padding: "80px",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div id="signup-header">
            <h3>Create account</h3>
          </div>
          <hr />
          <div id="signup-body" className="login-main">
            <FloatingLabel controlId="floatingInput" label="Name">
              <Form.Control
                type="text"
                placeholder="Enter your userName"
                {...register("userName", { required: "Name is required" })}
                userName="userName"
                className="form-control"
              />
              {errors?.userName && (
                <p style={{ color: "red" }}>{errors.userName.message}</p>
              )}
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="Email address">
              <Form.Control
                type="text"
                placeholder="userName@example.com"
                {...register("userEmail", {
                  required: "Email id is required",
                  pattern: {
                    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                    message: "Invalid Email id",
                  },
                })}
                userName="userEmail"
                className="form-control"
              />
              {errors?.userEmail && (
                <p style={{ color: "red" }}>{errors.userEmail.message}</p>
              )}
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Password">
              <Form.Control
                type="password"
                placeholder="Password"
                {...register("userPassword", {
                  required: "Password is required",
                  minLength: { value: 4, message: "Minimum length is 8" },
                  maxLength: { value: 15, message: "Maximum length is 15" },
                })}
                userName="userPassword"
              />
              {errors?.userPassword && (
                <p style={{ color: "red" }}>{errors.userPassword?.message}</p>
              )}
            </FloatingLabel>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              columnGap: "24px",
              paddingTop: "15%",
              rowGap: "16px",
            }}
            id="login-footer"
          >
            {/* Cancel and Create account in one row */}
            <Button variant="light" size="lg" onClick={onCancel}>
              Cancel
            </Button>
            <Button variant="primary" size="lg" type="submit">
              Create account
            </Button>
            {/* Spacer for the second row */}
            <div style={{ gridColumn: "span 2" }}></div>
            {/* Login Button taking full width */}
            <Button
              variant="primary"
              size="lg"
              onClick={onLogin}
              style={{ gridColumn: "span 2" }}
            >
              Login
            </Button>
          </div>
        </form>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
};

Signup.displayName = "Signup";

export default Signup;
