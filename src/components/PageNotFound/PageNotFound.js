import React, { Component } from "react";
import { Link } from "react-router-dom";
import image404 from "../images/404.svg";

class PageNotFound extends Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          gap: "4rem",
          padding: "0 1rem",
        }}
      >
        <img src={image404} alt="404 - page not found" style={{ width: 400 }} />
        <div>
          <h3>The page you are looking for doesn't exist</h3>
          <Link
            to=""
            style={{ color: "palevioletred", textDecoration: "underline" }}
          >
            Go back to home
          </Link>
        </div>
      </div>
    );
  }
}

export default PageNotFound;
