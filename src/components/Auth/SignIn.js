import React, { Component, createRef } from "react";
import { authSignIn, authSignUp } from "../../actions/authActions";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { fetchCart } from "../../actions/cartActions";
import "../../styles/Auth/Auth.css";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authUsername: "rahulgpt",
      authPassword: "dayzgone",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSignInSubmit = this.handleSignInSubmit.bind(this);

    this.signInUsername = createRef();
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

  handleSignInSubmit(event) {
    event.preventDefault();
    this.props.authSignIn(this.state.authUsername, this.state.authPassword);
  }

  // focus() {
  //     if (this.signInUsername.current !== null) {
  //         this.signInUsername.current.focus()
  //         window.scrollTo(0, this.signInUsername.current.offsetTop - 310)
  //     }

  // }

  render() {
    return (
      <div className="auth-container">
        <div className="auth-wrapper">
          <h4 className="title-line">Sign in</h4>

          <form className="auth-form" onSubmit={this.handleSubmit}>
            <label id="auth-username">
              Username or Email
              <input
                ref={this.signInUsername}
                type="text"
                name="authUsername"
                className="auth-input"
                onChange={this.handleInputChange}
                value={this.state.authUsername}
              />
            </label>
            <label id="auth-password">
              Password
              <input
                type="password"
                name="authPassword"
                onChange={this.handleInputChange}
                value={this.state.authPassword}
              />
              <p>{this.props.error ? this.props.error : " "}</p>
            </label>
            <div className="auth-btn-wrapper">
              {this.props.loading ? (
                <button className="auth-btn" type="submit">
                  LOADING
                </button>
              ) : (
                <button
                  className="auth-btn"
                  type="submit"
                  onClick={this.handleSignInSubmit}
                >
                  SIGN IN
                </button>
              )}

              {this.props.isAuthenticated && <Redirect to="/shop" />}

              <Link id="forgot-password" to="/">
                Forgot your password?
              </Link>
            </div>
          </form>

          <h1 className="signin-h1">New Here?</h1>
          <p id="reg-benefit">
            Sign up for an account to take advantage of order tracking and
            history as well as pre-filled forms during checkout on subsequent
            orders.
          </p>
          <Link to="/register">
            <button className="auth-btn reg-btn">REGISTER</button>
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
  fetchCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
