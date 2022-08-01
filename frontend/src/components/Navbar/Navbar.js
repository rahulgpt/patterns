import React, { Component, createRef } from "react";
import "../../styles/Navbar/Navbar.css";
import HamIcon from "../icons/HamIcon.png";
import CloseIcon from "../icons/CloseIcon.png";
import SearchIcon from "../icons/SearchIcon.png";
import SearchIconWhite from "../icons/SearchIconWhite.png";
import PinterestIcon from "../icons/PinterestIcon.png";
import InstaIcon from "../icons/InstaIcon.png";
import RBIcon from "../icons/RBIcon.png";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { toggleMenu, toggleSearchMenu } from "../../actions/navActions";
import { setVisibility } from "../../actions/headerActions";
import { TweenMax, Power3, TimelineLite, gsap } from "gsap";
import { setTitle } from "../../actions/headerActions";
import CartIcon2 from "../icons/CartIcon.svg";
import loader2 from "../Loader/Loader2";
import { authSignIn, authSignUp, authSignOut } from "../../actions/authActions";
import { Overlay } from "@mantine/core";

class Navbar extends Component {
  constructor(props) {
    gsap.config({
      nullTargetWarn: false,
    });

    super(props);
    this.overLay = createRef();
    this.linkContainer = createRef();
    this.infoContainerMain = createRef();
    this.overLayShop = createRef();
    this.overLayStuff = createRef();
    this.overLayContact = createRef();
    this.overLayAbout = createRef();
    this.close = createRef();
    this.overLaySearch = createRef();
    this.searchInput = createRef();
    //this.shopContainer = createRef();
    //this.shopContainerLinks = createRef();

    //document.addEventListener('click', this.handleClick, false);
  }
  componentDidUpdate() {
    var tl = new TimelineLite().from(this.overLay.current, 0.5, {
      opacity: 0.2,
      ease: Power3.easeOut,
    });

    const overlayLinks = [
      this.overLayShop.current,
      this.overLayStuff.current,
      this.overLayContact.current,
      this.overLayAbout.current,
    ];
    if (this.overLay.current !== null) {
      tl.play();

      TweenMax.from(this.infoContainerMain.current, 0.5, {
        opacity: 0.2,
        y: 20,
        ease: Power3.easeOut,
      });

      TweenMax.staggerFrom(
        overlayLinks,
        0.5,
        {
          opacity: 0.2,
          y: 20,
          ease: Power3.easeOut,
        },
        0.05
      );
    }
    if (this.overLaySearch !== null) {
      TweenMax.from(this.overLaySearch.current, 0.5, {
        opacity: 0.2,
        ease: Power3.easeOut,
      });

      TweenMax.from(this.searchInput.current, 0.5, {
        width: 0,
        ease: Power3.easeOut,
      });
    }

    // if (this.shopContainer !== null) {
    //     TweenMax.from(
    //         this.shopContainer.current,
    //         0.3,
    //         {
    //             height: 0,
    //             ease: Power3.easeOut
    //         }
    //     )

    //     TweenMax.from(
    //         this.shopContainerLinks.current,
    //         0.3,
    //         {
    //             delay: 0.3,
    //             opacity: 0
    //         }
    //     )
    // }
  }

  // componentWillUnmount() {
  //     document.removeEventListener('click', this.handleClick, false);
  // }

  // // Function to handle click event
  // handleClick = e => {
  //     if (this.shopContainer.current !== null) {
  //         //if (this.shopContainer.current.contains(e.target))
  //         //this.handleClickOutside();
  //         this.props.toggleShopMenu();
  //     }
  // }

  // Function to handle click outside the target container
  // handleClickOutside = () => {
  //     this.props.toggleShopMenu();
  // }

  render() {
    const overlayMenu = (
      <div ref={this.overLay} className="overlay-menu">
        <button
          ref={this.close}
          className="close-btn"
          onClick={this.props.toggleMenu}
        >
          <img id="close-icon" src={CloseIcon} alt="close-icon" />
        </button>
        <div ref={this.linkContainer} className="link-container">
          <Link to="/">
            <h5 ref={this.overLayShop} onClick={this.props.toggleMenu}>
              Gallery
            </h5>
          </Link>
          <Link to="/shop">
            <h5 ref={this.overLayStuff} onClick={this.props.toggleMenu}>
              Shop
            </h5>
          </Link>
          <Link to="/about">
            <h5 ref={this.overLayContact} onClick={this.props.toggleMenu}>
              About
            </h5>
          </Link>
          <Link to="/contact">
            <h5 ref={this.overLayAbout} onClick={this.props.toggleMenu}>
              Contact
            </h5>
          </Link>
        </div>
        <div ref={this.infoContainerMain}>
          <div className="info-container-main">
            <div className="info-container">
              <h3>Say Hi</h3>
              <p>info@patterns.com</p>
              <p>Ph: +3834423408</p>
            </div>
            <div className="info-container" id="two">
              <h3>Say Hi</h3>
              <p>info@patterns.com</p>
              <p>Ph: +3834423408</p>
            </div>
          </div>

          {/* <form class='form-container' id='newsletter-container'>
                        <h5 id='newsletter-banner'>Newsletter</h5>
                        <div className='newsletter-flex'>
                            <input placeholder='Enter your email' type='email' id='newsletter-input' />
                            <button className='suscribe-btn' id='newsletter-btn'>Suscribe</button>
                        </div>
                        <p id='newsletter-note'>We will let you know when new prints arrive
                        as well as new offers and discounts.</p>
                    </form> */}
          <div className="info-container-main reimagined">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://in.pinterest.com/patternmyriad/boards/"
              className="social-media-a"
            >
              <img
                id="pinterest-icon"
                class="social-media"
                src={PinterestIcon}
                alt="pinterest-link"
              />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.instagram.com/patternmyriad"
              className="social-media-a"
            >
              <img
                id="insta-icon"
                class="social-media"
                src={InstaIcon}
                alt="insta-link"
              />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.redbubble.com/people/patternmyriad/shop?asc=u"
              className="social-media-a"
            >
              <img
                id="rb-icon"
                class="social-media"
                src={RBIcon}
                alt="redbubble-link"
              />
            </a>
          </div>
        </div>
      </div>
    );

    const searchMenu = (
      <div ref={this.overLaySearch} className="overlay-menu overlay-search">
        <div className="search-flex">
          <button
            className="close-btn-search"
            onClick={this.props.toggleSearchMenu}
          >
            <img id="close-icon" src={CloseIcon} alt="close-icon" />
          </button>
        </div>
        <div className="search-container">
          <input
            ref={this.searchInput}
            className="search-input"
            placeholder="Search..."
          />
          <button className="searchmenu-btn">
            <img id="searchmenu-icon" src={SearchIconWhite} alt="search-icon" />
          </button>
        </div>
      </div>
    );

    return (
      <div className="position">
        {this.props.overlayMenu && <Overlay opacity={1}>{overlayMenu}</Overlay>}
        {this.props.overlaySearchMenu && (
          <Overlay opacity={1}>{searchMenu}</Overlay>
        )}

        <div id="announcement-container"></div>

        <div id="top-container">
          <div className="cart-badge-container">
            <Link to="/cart">
              <img className="cart-icon" src={CartIcon2} alt="cart-icon" />
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
                onClick={this.props.authSignOut}
                className="top-container-link-margin"
                to="#"
              >
                Sign Out
              </Link>
            )
          ) : (
            <Link className="top-container-link-margin" to="/signin">
              Sign In
            </Link>
          )}

          {localStorage.getItem("_shpuid") ? (
            <Link to="/dashboard">Dashboard</Link>
          ) : (
            <Link to="/register">Register</Link>
          )}
        </div>

        <nav className="nav-container">
          <div className="logo-ham-container">
            <button
              className="icon-btn"
              id="Hamburgur"
              onClick={this.props.toggleMenu}
            >
              <img id="ham-icon" src={HamIcon} alt="hamburger-icon" />
            </button>

            <Link id="logo-sm" onClick={this.props.setTitle} to="/">
              <p className="logo">Pattterns</p>
            </Link>
            {/* <Link id='logo-link' to='/' onClick={this.props.setTitle}><img src={logo} className='logo-img' /></Link> */}

            <button className="icon-btn" onClick={this.props.toggleSearchMenu}>
              <img
                className="search-icon"
                id="s1"
                src={SearchIcon}
                alt="search-icon"
              />
            </button>
          </div>

          <ul className="nav">
            <Link id="logo-link" onClick={this.props.setTitle} to="/">
              <p className="logo">Pattterns</p>
            </Link>
            <div className="navigation-menu">
              <li>
                <Link to="/">GALLERY</Link>
              </li>
              <li id="shop-menu-btn">
                <Link to="/shop">SHOP </Link>
                {/* {this.props.shopMenu && shopMenu} */}
              </li>
              <li>
                <Link to="/about">ABOUT</Link>
              </li>
              <li>
                <Link to="/contact">CONTACT</Link>
              </li>

              <button
                className="icon-btn"
                onClick={this.props.toggleSearchMenu}
              >
                <img
                  className="search-icon"
                  id="s2"
                  src={SearchIcon}
                  alt="search-icon"
                />
              </button>
            </div>
          </ul>
        </nav>
      </div>
    );
  }
}

const mapDispatchToProps = {
  toggleMenu,
  setTitle,
  toggleSearchMenu,
  setVisibility,
  authSignIn,
  authSignUp,
  authSignOut,
};

const mapStateToProps = (state) => ({
  overlayMenu: state.nav.overlayMenu,
  overlaySearchMenu: state.nav.overlaySearchMenu,
  count: state.cart.itemCount,
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
