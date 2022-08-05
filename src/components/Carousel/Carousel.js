import React, { Component } from "react";
import "../../styles/Carousel/Carousel.css";
import ArrowIcon from "../icons/DownArrowIcon.png";
import TempImage1 from "../images/5.jpg";
import TempImage2 from "../images/3.jpg";
import TempImage3 from "../images/4.jpg";

class Carousel extends Component {
  state = {};

  render() {
    return (
      <div className="carousel-container">
        <img id="prev-icon" className="carousel-control-icon" src={ArrowIcon} />
        <img className="carousel-img active" src={TempImage1} />
        <img className="carousel-img" src={TempImage2} />
        <img className="carousel-img" src={TempImage3} />
        <img id="next-icon" className="carousel-control-icon" src={ArrowIcon} />

        <ol className="switch">
          <li className="carousel-switch" />
          <li className="carousel-switch" />
          <li className="carousel-switch" />
        </ol>
      </div>
    );
  }
}

export default Carousel;
