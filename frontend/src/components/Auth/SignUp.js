import React, { Component } from "react";
import { authSignIn, authSignUp } from "../../actions/authActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import loader2 from "../Loader/Loader2";
import "../../styles/Auth/Auth.css";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSignUpSubmit = this.handleSignUpSubmit.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({ [name]: value });
  }

  handleSignUpSubmit(event) {
    event.preventDefault();
    const { authUsername, authEmail, authPassword1, authPassword2 } =
      this.state;
    this.props.authSignUp(
      authUsername,
      authEmail,
      authPassword1,
      authPassword2
    );
  }

  render() {
    return (
      <div className="auth-container" ref={this.authMenu}>
        <div
          className="auth-wrapper"
          ref={this.authWrapper}
          onClick={this.handleClick}
        >
          <h4 className="title-line">Sign Up</h4>
          <form className="auth-form" onSubmit={this.handleSubmit}>
            <label id="auth-username">
              Username
              <input
                type="text"
                name="authUsername"
                className="auth-input"
                onChange={this.handleInputChange}
              />
            </label>
            <label id="auth-username">
              Email
              <input
                type="email"
                name="authEmail"
                className="auth-input"
                onChange={this.handleInputChange}
              />
            </label>
            <label id="auth-password">
              Password
              <input
                type="password"
                name="authPassword1"
                onChange={this.handleInputChange}
              />
            </label>
            <label id="auth-password">
              Confirm Password
              <input
                type="password"
                name="authPassword2"
                onChange={this.handleInputChange}
              />
              <p>{this.props.error ? this.props.error.message : ""}</p>
            </label>
            <div className="auth-btn-wrapper">
              {this.props.loading ? (
                <button id="loader-btn" type="submit">
                  {loader2}
                </button>
              ) : (
                <button
                  className="auth-btn"
                  type="submit"
                  onClick={this.handleSignUpSubmit}
                >
                  REGISTER
                </button>
              )}
            </div>
          </form>

          <h1 className="signin-h1">Already have an account?</h1>
          <Link to="/signin">
            <button className="auth-btn reg-btn">SIGN IN</button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.auth.token,
  loading: state.auth.loading,
  error: state.auth.err,
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = {
  authSignIn,
  authSignUp,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
