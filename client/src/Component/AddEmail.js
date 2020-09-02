import React, { useState } from "react";
import "../css/addEmail.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";

const AddEmail = () => {
  const [email, setemail] = useState("");
  const [emailError, setemailError] = useState("");

  let history = useHistory();
  const validateEmail = () => {
    let isError = false;
    var regx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regx.test(email);
  };

  const storeEmailLocal = async () => {
    await localStorage.setItem("todo-email", email);
    //alert("email stored");

    history.push("/");
  };

  const submitEmail = (e) => {
    e.preventDefault();
    let validateEmailBoolean = validateEmail();
    if (!validateEmailBoolean) {
      setemailError("Please Enter a valid Email address, Try again");
    } else {
      setemailError("");
      storeEmailLocal();
    }
  };
  return (
    <>
      <div className="add_email">
        <Container>
          <Row className="justify-content-center">
            <Col lg="5" md="8" sm="12" xs="12">
              <form className="add_email_form" onSubmit={submitEmail}>
                <h1 className="header_addEmail mb-4 animate__animated animate__pulse">
                  Enter Your Email
                </h1>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => {
                    setemail(e.target.value.trim());
                  }}
                  className="input_add_email"
                  placeholder="Your Email"
                  style={{ border: emailError ? "2px solid red" : "" }}></input>
                {emailError ? <p className="errorText">{emailError}</p> : <></>}
                <div>
                  <button
                    type="submit"
                    className="button_addEmail mt-5 mb-5 animate__animated animate__heartBeat">
                    <FontAwesomeIcon icon={faUserPlus}></FontAwesomeIcon> Add
                    Email
                  </button>
                </div>
              </form>
              <p className="p_text">
                Site request to enter your Email just one time on this browser,
                so the system can identify your todos uniquely.
              </p>
              <p className="ty_text">Thank You!!</p>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default AddEmail;
