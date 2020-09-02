import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import SingleTodo from "./SingleTodo";
import SingleCompleteTodo from "./SingleCompleteTodo";
import "../css/home.css";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [email, setemail] = useState("");
  const [todoData, settodoData] = useState([]);
  const [dataLoading, setdataLoading] = useState(true);
  const [todo, settodo] = useState("");
  const [todoCompleteData, settodoCompleteData] = useState([]);

  const onchangeInput = (e) => {
    settodo(e.target.value);
  };
  const submitTodo = async (e) => {
    e.preventDefault();
    if (todo.length >= 1) {
      let trimTodo = todo.trim();
      const res = await axios.post(
        "/api/todo",
        { todo: `${trimTodo}` },
        {
          headers: {
            "todo-email": `${email}`,
            "Content-Type": "application/json",
          },
        }
      );
      settodoData(res.data);
      settodo("");
    } else {
      alert("Todo can't be Empty!");
    }
  };

  let history = useHistory();

  useEffect(() => {
    const checkEmail = () => {
      let storedEmail = localStorage.getItem("todo-email");
      if (!storedEmail) {
        //console.log("if called");
        history.push("/add-email");
      } else {
        setemail(storedEmail);
      }
    };
    checkEmail();
  }, [history]);

  useEffect(() => {
    const fetchTodo = async () => {
      console.log(email);
      let res = await axios.get("/api/todo", {
        headers: {
          "todo-email": `${email}`,
          "Content-Type": "application/json",
        },
      });
      settodoData(res.data);
      setdataLoading(false);
      console.log(res.data);
    };
    fetchTodo();
  }, [email]);

  useEffect(() => {
    const fetchCompletedTodo = async () => {
      let resComplete = await axios.get("/api/todo_update/", {
        headers: {
          "todo-email": `${email}`,
          "Content-Type": "application/json",
        },
      });
      settodoCompleteData(resComplete.data);
      console.log(resComplete.data);
    };
    fetchCompletedTodo();
  }, [email, todoData]);

  return (
    <>
      <div className="main_background">
        <Container>
          <h2
            style={{ wordWrap: "break-word" }}
            className="animate__animated animate__jackInTheBox">
            <span>{email}</span>'s Todo List
          </h2>

          <Row className="justify-content-center">
            <Col lg="5" md="8" sm="12" xs="12">
              <form className="form">
                <input
                  type="text"
                  className="todo_input"
                  onChange={onchangeInput}
                  placeholder="Enter Todo"
                  value={todo}
                />
                <button
                  className="add_button"
                  type="submit"
                  onClick={submitTodo}>
                  <FontAwesomeIcon icon={faPlusSquare} /> Add Todo
                </button>
              </form>
            </Col>
          </Row>

          {!dataLoading ? (
            todoData.length ? (
              <div className="mt-5">
                <div className="sticky_content">
                  <h4 className="todolist_header">Todo List</h4>
                </div>

                <Row className="justify-content-center">
                  <Col lg="7" md="8" sm="12" xs="12">
                    {todoData.map((t) => (
                      <SingleTodo
                        key={t._id}
                        t={t}
                        email={email}
                        settodoData={settodoData}
                      />
                    ))}
                  </Col>
                </Row>
              </div>
            ) : (
              <div className="notodo">
                <h3>You have not added any Todo to remind</h3>
                <p>
                  Write any todo in the above text input field and click on the
                  Add Todo Button
                </p>
              </div>
            )
          ) : (
            <Spinner
              animation="border"
              className="loading_spinner"
              role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          )}
          {todoCompleteData.length ? (
            <div className="mt-5">
              <div className="sticky_content">
                <h4 className="todolist_header">Completed Todo List</h4>
              </div>
              <Row className="justify-content-center">
                <Col lg="7" md="8" sm="12" xs="12">
                  {todoCompleteData.map((t) => (
                    <SingleCompleteTodo key={t._id} t={t} email={email} />
                  ))}
                </Col>
              </Row>
            </div>
          ) : (
            <></>
          )}
        </Container>
      </div>
    </>
  );
};

export default Home;
