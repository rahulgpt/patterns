import React, { Component } from "react";
import "../../styles/Footer/Footer.css";
import PinterestIcon from "../icons/PinterestIcon.png";
import InstaIcon from "../icons/InstaIcon.png";
import EtsyIcon from "../icons/EtsyIcon.png";
import FacebookIcon from "../icons/FacebookIcon.png";

class Footer extends Component {
  render() {
    return (
      <div className="footer-container">
        <div className="social-container">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://in.pinterest.com/patternmyriad/boards/"
            className="social-icons-a"
          >
            <img
              id="pinterest-icon"
              className="social-icons"
              src={InstaIcon}
              alt="instagram"
            />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.instagram.com/patternmyriad"
            className="social-icons-a"
          >
            <img
              id="insta-icon"
              className="social-icons"
              src={PinterestIcon}
              alt="pintrest"
            />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.redbubble.com/people/patternmyriad/shop?asc=u"
            className="social-icons-a"
          >
            <img
              id="etsy-icon"
              className="social-icons"
              src={EtsyIcon}
              alt="etsy"
            />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.redbubble.com/people/patternmyriad/shop?asc=u"
            className="social-icons-a"
          >
            <img
              id="etsy-icon"
              className="social-icons"
              src={FacebookIcon}
              alt="etsy"
            />
          </a>
        </div>

        <p className="copyright-label">
          © 2020, Patterns. All rights reserved.{" "}
        </p>
      </div>
    );
  }
}

export default Footer;
