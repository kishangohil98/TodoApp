import React from "react";
import "../css/singleCompleteTodo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckDouble,
  faClock,
  faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

const SingleCompleteTodo = ({ t }) => {
  return (
    <>
      <div className="c_content animate__animated animate__zoomIn">
        <h6>
          <FontAwesomeIcon icon={faCheckDouble}></FontAwesomeIcon>
          {"  "}
          {t.todo}
        </h6>
        <p className="assign_time">
          {" "}
          <FontAwesomeIcon icon={faClock}></FontAwesomeIcon>{" "}
          {moment(t.todoAssignTime).format("lll")}--
          {moment(t.todoCompleteTime).format("lll")}{" "}
          <FontAwesomeIcon icon={faCalendarCheck}></FontAwesomeIcon>
        </p>
      </div>
    </>
  );
};

export default SingleCompleteTodo;
