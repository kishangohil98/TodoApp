import React from "react";
import "../css/footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer_bg">
      <span className="copy">&copy; </span>
      <a
        href="https://github.com/kishangohil98"
        className="git_link"
        target="_blank">
        Kishan Gohil <FontAwesomeIcon icon={faGithub}></FontAwesomeIcon>
      </a>
    </div>
  );
};

export default Footer;
