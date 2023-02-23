import React, { useState } from "react";
import "./PhoneSignUp.css";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import mobile_img from "../3d illu/secure-login-password.png";

const PhoneSignUp = () => {
  const navigate = useNavigate();
  const { setUpRecaptcha } = useUserAuth();

  const [number, setNumber] = useState("");
  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");
  const [flag, setFlag] = useState(false);
  const [confirmObj, setConfirmObj] = useState("");

  const getOtp = async (e) => {
    e.preventDefault();
    setError("");
    if (number === "" || number === undefined || !number.length === 10)
      return setError("Enter the mobile number");
    try {
      const response = await setUpRecaptcha(number);
      console.log(response);
      setConfirmObj(response);
      setFlag(true);
    } catch (error) {
      alert(error.message);
    }
    console.log(number);
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    if (otp === "" || otp === null) return;
    try {
      setError("");
      await confirmObj.confirm(otp);
      navigate("/onboard");
    } catch (error) {
      setError(error.message);
    }
    console.log(otp);
  };

  return (
    <>
      <div className="loginSignUpForm">
        <div className="phoneLogin-content">
          <div className="left-phone-content">
            <div className="p-4 box">
              <h2 className="mb-3">Login Through Phone Number</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form
                onSubmit={getOtp}
                style={{ display: !flag ? "block" : "none" }}
              >
                <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                  <PhoneInput
                    defaultCountry="IN"
                    value={number}
                    onChange={setNumber}
                    placeholder="Enter Phone Number"
                  />
                  <div id="recaptcha-container"></div>
                </Form.Group>
                <div className="button-right">
                  <Link to="/" style={{ textDecoration: "none" }}>
                    <Button variant="secondary">Cancel</Button> &nbsp;
                  </Link>
                  <Button className="otpbtn" variant="primary" type="submit">
                    Send Otp
                  </Button>
                </div>
              </Form>
              <Form
                onSubmit={verifyOtp}
                style={{ display: flag ? "block" : "none" }}
              >
                <Form.Group className="mb-3" controlId="formBasicOtp">
                  <Form.Control
                    type="text"
                    placeholder="Enter Otp"
                    onChange={(e) => setOtp(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <div className="button-right">
                  <Link to="/" style={{ textDecoration: "none" }}>
                    <Button variant="secondary">Cancel</Button> &nbsp;
                  </Link>
                  <Button className="otpbtn" variant="primary" type="submit">
                    Verify Otp
                  </Button>
                </div>
              </Form>
            </div>
          </div>
          <div className="right-phone-content">
            <img src={mobile_img} alt="mobile_img" />
          </div>
        </div>
      </div>
    </>
  );
};

export default PhoneSignUp;
