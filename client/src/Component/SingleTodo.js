import React from "react";
import "../css/singletodo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleRight,
  faCheckSquare,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import axios from "axios";

const SingleTodo = ({ t, email, settodoData }) => {
  console.log("s called");

  const taskComplete = async (e) => {
    e.preventDefault();
    if (t._id) {
      const res = await axios.put(`/api/todo_update/${t._id}`, {
        headers: {
          "todo-email": `${email}`,
          "Content-Type": "application/json",
        },
      });
      settodoData(res.data);
    } else {
      alert("Todo can't be Empty!");
    }
  };

  return (
    <>
      <div className="content animate__animated animate__zoomIn">
        <h6>
          <FontAwesomeIcon icon={faAngleDoubleRight}></FontAwesomeIcon> {t.todo}
        </h6>
        <p className="assign_time">{moment(t.todo_add_time).format("lll")}</p>
        <button onClick={taskComplete} className="complete_btn">
          <FontAwesomeIcon icon={faCheckSquare}></FontAwesomeIcon> Complete
        </button>
      </div>
    </>
  );
};

export default SingleTodo;
