import React, { Component } from "react";
import FacebookLogin from "react-facebook-login";
import axios from "axios";
import "../../styles/FacebookAuth/FacebookAuth.css";

class FacebookAuth extends Component {
  state = {
    isLoggedIn: false,
    userID: "",
    name: "",
    email: "",
  };

  responseFacebook = (response) => {
    console.log(response);
    this.setState({
      isLoggedIn: true,
      userID: response.userID,
      name: response.name,
      email: response.email,
    });

    axios.post("http://127.0.0.1:8000/api/auth/facebook/", {
      access_token: response.accessToken,
    });
  };

  componentClicked = () => {
    console.log("clicked");
  };

  render() {
    let fbContent;

    if (this.state.isLoggedIn) {
      fbContent = null;
    } else {
      fbContent = (
        <FacebookLogin
          appId="330676858211949"
          autoLoad={false}
          fields="name,email"
          onClick={this.componentClicked}
          callback={this.responseFacebook}
          icon="fa-facebook"
        />
      );
    }

    return <div>{fbContent}</div>;
  }
}

export default FacebookAuth;
