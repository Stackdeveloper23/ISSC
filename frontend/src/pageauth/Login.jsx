import { useEffect, useState } from "react";
import AuthUser from "./AuthUser";
import { Link, useNavigate } from "react-router-dom";
import Config from "../Config";
import axios from "axios";

const Login = () => {
  const { setToken, getToken } = AuthUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (getToken()) {
      navigate("/");
    }
  }, []);

  const submitLogin = async (e) => {
    e.preventDefault();
    await axios.get("/santum/csrf-cookie").then(() => {
      Config.getLogin({ email, password }).then(({ data }) => {
        if (data.success) {
          console.log(data);
          setToken(data.user, data.token, data.user.roles[0].name);
        } else {
          setMessage(data.message || "Incorrect username or password");
        }
      })
      .catch(error => {
        console.error('Error logging in:', error);
        setMessage('Incorrect username or password.');
    });
});
  };

  const viewport = {
    height: "100vh",
  };
  return (
    <div className="container">
      <div
        className="row justify-content-center align-items-center"
        style={viewport}
      >
        <div className="col-sm-4">
          <div className="card mt-5 mb-5 rounded-4">
            <div
              className="card-body rounded-4"
              style={{ backgroundColor: "#ff6e4b" }}
            >
              <div className="svg-container mt-3 mb-5" id="logo">
                <img
                  src="https://www.intraway.com/wp-content/uploads/2023/08/intraway-logo.png"
                  alt="logo"
                />
              </div>
              <h1 className="text-center fw-bolder mb-5">Login</h1>
              {message && (
                <div className="text-center text-wrap alert alert-danger">
                  <span className="material-symbols-outlined">error</span>
                  {message}
                </div>
              )}
              <form onSubmit={submitLogin}>
                <input
                  type="email"
                  className="form-control mt-3"
                  placeholder="Email:"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <input
                  type="password"
                  className="form-control mt-3"
                  placeholder="Password:"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Link to="/reset-password">Forgot Password?</Link>
                <button type="submit" className="btn btn-primary w-100 mt-3">
                  {" "}
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
