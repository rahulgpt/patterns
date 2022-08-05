import React, { Component } from "react";
import "../../styles/Popup/Popup.css";

class Popup extends Component {
  render() {
    return (
      <span id="pop-up">
        {this.props.text} {this.props.link}
      </span>
    );
  }
}

export default Popup;
