import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";
import comp_img from "../3d illu/computer-security-with-login-password.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/onboard");
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <>
      <div className="loginSignUpForm">
        <div className="login-content">
          <div className="left-login-content">
            <div className="p-4 box" style={{ border: "none" }}>
              <h2 className="mb-3" style={{ textAlign: "center" }}>
                LOGIN
              </h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control
                    type="email"
                    placeholder="Email address"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button
                    variant="primary"
                    type="Submit"
                    style={{ margin: "0px 60px" }}
                  >
                    Log In
                  </Button>
                </div>
                <Link to="/phonesignup" style={{ textDecoration: "none" }}>
                  <div className="d-grid gap-2 mt-2">
                    <Button
                      variant="primary"
                      type="Submit"
                      style={{ margin: "0px 58px" }}
                    >
                      LogIn With Phone Number
                    </Button>
                  </div>
                </Link>
              </Form>
              <hr />
            </div>
            <div
              className="p-4 box mt-3 text-center"
              style={{ border: "none" }}
            >
              Don't have an account? <Link to="/signup">Sign up</Link>
            </div>
          </div>
          <div className="right-login-content">
            <img src={comp_img} alt="comp_img" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
