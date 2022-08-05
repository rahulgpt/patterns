import React, { Component, createRef } from "react";
import "../../styles/Error/Error.css";
import CloseIcon from "../icons/CloseIcon.png";
import { connect } from "react-redux";
import { fetchImages } from "../../actions/gridActions";
import { TweenMax, Power3, gsap } from "gsap";

class Error extends Component {
  constructor(props) {
    super(props);

    this.errorContainer = createRef();
  }

  handleClose = () => {
    if (this.errorContainer.current !== null)
      this.errorContainer.current.style.display = "none";
  };

  // handleMouseOver = () => {
  //     if (this.errorContainer.current !== null) {
  //             this.errorContainer.current.style.display = 'block'
  //     }
  // }

  // handleMouseOut = () => {
  //     setTimeout(() => {
  //         if (this.errorContainer.current !== null) {
  //             TweenMax.to(
  //                 this.errorContainer.current,
  //                 2,
  //                 {
  //                     opacity: 0,
  //                     display: 'none'
  //                 }
  //             )
  //         }
  //     }, 3000)
  // }

  render() {
    let errorBox;

    if (this.props.error) {
      setTimeout(() => {
        if (this.errorContainer.current !== null) {
          TweenMax.to(this.errorContainer.current, 2, {
            opacity: 0,
            display: "none",
            ease: Power3.easeOut,
          });
        }
      }, 5000);
    }

    if (this.props.error) {
      errorBox = (
        <React.Fragment>
          <div className="error-container" ref={this.errorContainer}>
            <p>{this.props.error}</p>
            <img
              src={CloseIcon}
              className="error-close"
              onClick={this.handleClose}
            />
          </div>
        </React.Fragment>
      );
    }

    return <React.Fragment>{errorBox}</React.Fragment>;
  }
}

const mapDispatchToProps = {
  fetchImages,
};

const mapStateToProps = (state) => ({
  error: state.grid.err,
});

export default connect(mapStateToProps, mapDispatchToProps)(Error);
