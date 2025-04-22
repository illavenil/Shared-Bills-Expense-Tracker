import { Button, FloatingLabel, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate,useLocation } from "react-router-dom";
import { postAPICall } from "../api/apiService";
import Cookies from "js-cookie";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const response = await postAPICall("/signin", data);
    if (response != null) {
      // toast.success("Password validated");
      // Cookies.set('token', response.token, { expires: 7, secure: true });
      Cookies.set("userID", response._id, { expires: 7, secure: true });
      // Cookies.set('userName', response.userName, { expires: 7, secure: true });
      // Cookies.set('userEmail', response.userEmail, { expires: 7, secure: true });
      // navigate("/home");
      navigate(from, { replace: true });
    }
  };
  const handleSignUp = () => {
    // Perform any sign-up logic here

    // Redirect to another page
    navigate("/Signup");
  };

  const onCancel = () => {
    reset();
  };

  return (
    <div className="login" id="login-container">
      <div
        style={{
          borderRadius: "8px",
          border: "1.5px solid grey",
          padding: "80px",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div id="login-header">
            <h3>Sign in</h3>
          </div>
          <hr />
          <div id="login-body" className="login-main">
            <FloatingLabel controlId="floatingInput" label="Email address">
              <Form.Control
                type="text"
                placeholder="Enter your Email id"
                {...register("userEmail", {
                  required: "Email id is required",
                  pattern: {
                    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                    message: "Invalid Email id",
                  },
                })}
                name="userEmail"
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
                // className='form-control'
                name="userPassword"
                {...register("userPassword", {
                  required: "Password is required",
                })}
              />
              {errors?.userPassword && (
                <p style={{ color: "red" }}>{errors.userPassword.message}</p>
              )}
            </FloatingLabel>
          </div>
          <div
            style={{
              paddingTop: "10%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
            }}
            id="login-footer"
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                columnGap: "24px",
                width: "100%",
                maxWidth: "400px",
              }}
            >
              <Button variant="light" size="lg" onClick={onCancel}>
                Cancel
              </Button>
              <Button variant="primary" size="lg" type="submit">
                Sign in
              </Button>
            </div>

            {/* Information Text */}
            <p
              style={{
                marginTop: "20px",
                fontSize: "16px",
                color: "#6c757d",
                textAlign: "center",
              }}
            >
              Don't have an account? Please sign up below
            </p>

            {/* Sign Up Button */}
            <Button
              variant="primary"
              onClick={handleSignUp}
              size="lg"
              type="submit"
              style={{ width: "100%", maxWidth: "400px" }}
            >
              Sign Up
            </Button>
          </div>
        </form>
        {/* <ToastContainer /> */}
      </div>
    </div>
  );
};

Login.displayName = "Login";

export default Login;
