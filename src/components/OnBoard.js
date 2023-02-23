import React, { useState } from "react";
import "./OnBoard.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useUserAuth } from "../context/UserAuthContext";
import { Button } from "react-bootstrap";
import gene_info from "../3d illu/gene_info.png";
import sys_img from "../3d illu/creative-copywriting.png";
import cal_img from "../3d illu/calendar.png";

const OnBoard = () => {
  const [userData, setUserData] = useState({
    fName: "",
    lName: "",
    email: "",
    skills: "",
    exp: "",
    pTitle: "",
    pUrl: "",
    pDes: "",
    start_date: "",
    end_date: "",
  });
  const { user, logOut } = useUserAuth();

  const handleLogOut = async () => {
    try {
      await logOut();
    } catch (error) {}
  };
  let name, value;
  const postUserData = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUserData({ ...userData, [name]: value });
  };

  // connect firebase database
  const submitData = async (e) => {
    e.preventDefault();
    const {
      fName,
      lName,
      email,
      skills,
      exp,
      pTitle,
      pUrl,
      pDes,
      start_date,
      end_date,
    } = userData;
    if (
      fName &&
      lName &&
      email &&
      skills &&
      exp &&
      pTitle &&
      pUrl &&
      pDes &&
      start_date &&
      end_date
    ) {
      const res = await fetch(
        "https://internship-67bff-default-rtdb.firebaseio.com/onBoardDatas.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fName,
            lName,
            email,
            skills,
            exp,
            pTitle,
            pUrl,
            pDes,
            start_date,
            end_date,
          }),
        }
      );
      if (res) {
        setUserData({
          fName: "",
          lName: "",
          email: "",
          skills: "",
          exp: "",
          pTitle: "",
          pUrl: "",
          pDes: "",
          start_date: "",
          end_date: "",
        });
        alert("data Submitted");
      } else {
        alert("Fill the data");
      }
    } else {
      alert("Fill the data");
    }
  };
  return (
    <div>
      <Navbar bg="light" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand href="#home" className="pl-2">
            Internship
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <span className="nav-mb-top pl-2">Hi, {user && user.email}</span>
              <Button
                style={{ backgroundColor: "#3684d6" }}
                className="ml-2 logoutbtn nav-mb-top"
                onClick={handleLogOut}
                variant="primary"
                type="Submit"
              >
                Log Out
              </Button>
            </Nav>
          </Navbar.Collapse>
          <span className="nav-top">Hi, {user && user.email}</span>
        </Container>
      </Navbar>
      <div className="container1">
        <h1 className="mt-5">Onboarding Form</h1>
        <div className="form_container">
          <div className="container-left">
            <form className="form1" method="POST">
              <h4>General Info</h4>
              <label htmlFor="name">First Name:</label>
              <input
                type="text"
                id="name"
                name="fName"
                placeholder="enter first name"
                value={userData.fName}
                onChange={postUserData}
                required
              />
              <label htmlFor="name">Last Name:</label>
              <input
                type="text"
                id="name"
                name="lName"
                placeholder="enter last name"
                value={userData.lName}
                onChange={postUserData}
                required
              />

              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="enter email"
                value={userData.email}
                onChange={postUserData}
                required
              />

              <label htmlFor="position">Skills:</label>
              <select
                id="position"
                name="skills"
                value={userData.skills}
                onChange={postUserData}
              >
                <option value="software_engineer">Software Engineer</option>
                <option value="ui_ux_designer">UI/UX Designer</option>
                <option value="product_manager">Product Manager</option>
              </select>

              <label htmlFor="position">Year of Experience:</label>
              <input
                type="number"
                id="exp"
                name="exp"
                value={userData.exp}
                onChange={postUserData}
                required
              />
            </form>
          </div>
          <div className="container-right">
            <img src={gene_info} alt="illu" />
          </div>
        </div>
        <hr />
        <div className="form_conatiner">
          <h4>Add Project</h4>
          <form method="POST">
            <label htmlFor="projectTitle">Project Title:</label>
            <input
              type="text"
              id="name"
              name="pTitle"
              placeholder="enter project name"
              value={userData.pTitle}
              onChange={postUserData}
              required
            />
            <label htmlFor="projectURL">Project URL:</label>
            <input
              type="url"
              id="name"
              name="pUrl"
              placeholder="enter project URL"
              value={userData.pUrl}
              onChange={postUserData}
              required
            />
            <div className="content">
              <div className="right-content">
                <label htmlFor="projectDes">Project Description:</label>
                <div className="mb-textArea">
                  <textarea
                    style={{
                      position: "relative",
                      display: "block",
                      outline: "none",
                      padding: "10px",
                      border: "1px solid #ccc",
                      width: "100%",
                    }}
                    name="pDes"
                    id=""
                    cols="60"
                    rows="5"
                    onChange={postUserData}
                    value={userData.pDes}
                  ></textarea>
                </div>
              </div>
              <div className="left-content">
                <img src={sys_img} alt="sys_img" />
              </div>
            </div>

            <div className="date-content">
              <div className="left">
                <label htmlFor="start_date">Start Date:</label>
                <input
                  type="date"
                  id="start_date"
                  name="start_date"
                  placeholder="enter start date"
                  value={userData.start_date}
                  onChange={postUserData}
                  required
                />
              </div>
              <div className="mid">
                <img src={cal_img} alt="cal_img" />
              </div>
              <div className="right">
                <label htmlFor="end_date">End Date:</label>
                <input
                  type="date"
                  id="end_date"
                  name="end_date"
                  placeholder="enter end date"
                  value={userData.end_date}
                  onChange={postUserData}
                  required
                />
              </div>
            </div>
          </form>
        </div>
        <button
          className="onboardsubmitbtn mt-2"
          type="submit"
          onClick={submitData}
        >
          Save Data
        </button>
      </div>
    </div>
  );
};

export default OnBoard;
