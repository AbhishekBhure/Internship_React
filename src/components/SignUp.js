import React, { useState } from "react";
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";
import lap_img from "../3d illu/laptop.png";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const { signUp } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signUp(email, password);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <div className="loginSignUpForm">
        <div className="signup-content">
          <div className="left-signup-content">
            <div className="p-4 box" style={{ border: "none" }}>
              <h2 className="mb-3" style={{ textAlign: "center" }}>
                SIGN UP
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
                    style={{ margin: "0px 90px" }}
                  >
                    Sign up
                  </Button>
                </div>
              </Form>
            </div>
            <div
              className="p-4 box mt-3 text-center"
              style={{ border: "none" }}
            >
              Already have an account? <Link to="/">Log In</Link>
            </div>
          </div>
          <div className="right-signup-content">
            <img src={lap_img} alt="mobile_img" />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
