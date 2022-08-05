import React, { Component } from "react";
import DownArrowIcon from "../icons/DownArrowIcon.png";
import CartIcon from "../icons/CartIcon.png";
import UserIcon from "../images/UserAvatar.jpg";
import "../../styles/Header/Header.css";
import { connect } from "react-redux";
import { setTitle, toggleUserMenu } from "../../actions/headerActions";
import { authSignIn, authSignUp, authSignOut } from "../../actions/authActions";
import { Link } from "react-router-dom";
import loader2 from "../Loader/Loader2";
//import Lottie from 'react-lottie';
//import DefaultAvatar from './DefaultAvatar.json'

class Header extends Component {
  componentDidMount() {
    this.props.setTitle();
  }

  render() {
    // const defaultOptions = {
    //     loop: false,
    //     autoplay: true,
    //     animationData: DefaultAvatar,
    //     redererSettings: {
    //         preserveAspectRatio: "xMidYMid slice"
    //     }
    // }

    const userMenu = (
      <div className="user-menu-container">
        <ul>
          <li>Dashboard</li>
          <li>Cart</li>
          <li>{this.props.isAuthenticated ? "SignOut" : "SignIn"}</li>
        </ul>
      </div>
    );

    const signInMenu = (
      <div className="signin-container">
        <div className="cart-badge-container margin">
          <Link to="/cart">
            <img className="cart-icon" src={CartIcon} />
            <div className="wrapper">
              <span>{this.props.count}</span>
            </div>
          </Link>
        </div>
        {localStorage.getItem("_shpuid") ? (
          this.props.loading ? (
            loader2
          ) : (
            <Link
              to="/shop"
              onClick={this.props.authSignOut}
              className="margin"
            >
              Sign Out
            </Link>
          )
        ) : (
          <Link className="margin" to="/signin">
            Sign In
          </Link>
        )}
        <div id="user-menu">
          <img
            className="avatar"
            src={UserIcon}
            onClick={this.props.toggleUserMenu}
          />
          {/* <Lottie onClick='null' options={defaultOptions} height={150} width={150} /> */}
          {this.props.userMenu && userMenu}
        </div>
      </div>
    );

    return (
      <div className="header-container">
        <div>
          <div className="cart-flex">
            <h2 className="page-title">{this.props.title}</h2>
          </div>
          <h4 className="sub-heading">Poppy patterns all over the world.</h4>

          <p className="page-nav">
            Home {" > "} {this.props.title}
          </p>
        </div>

        <div className="signin-filter-container">
          {signInMenu}
          <a href="#" className="filter">
            Filter <img className="down-arrow" src={DownArrowIcon} />
          </a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  title: state.header.title,
  userMenu: state.header.userMenu,
  visibility: state.header.visibility,
  signInMenu: state.header.signInMenu,
  token: state.auth.token,
  loading: state.auth.loading,
  error: state.auth.err,
  isAuthenticated: state.auth.isAuthenticated,
  count: state.cart.itemCount,
});

const mapDispatchToProps = {
  setTitle,
  toggleUserMenu,
  //setVisibility,
  authSignIn,
  authSignUp,
  authSignOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
