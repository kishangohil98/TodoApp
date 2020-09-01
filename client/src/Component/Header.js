import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";

const Header = () => {
  return (
    <>
      <Jumbotron style={{ padding: 0, marginBottom: 0 }}>
        <h1
          style={{
            textAlign: "center",
            padding: "20px 0",
            marginBottom: 0,
            fontFamily: "Dancing Script, cursive",
          }}>
          Todo App
        </h1>
      </Jumbotron>
    </>
  );
};

export default Header;
