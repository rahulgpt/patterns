import React, { Component } from "react";
import AboutImage from "../images/AboutImage.jpg";
import "../../styles/About/About.css";

class About extends Component {
  render() {
    return (
      <div className="about-container">
        <img src={AboutImage} className="about-img" alt="profilepic" />
        <span>
          <h1 className="diff-font">Hey there !</h1>
          <h1 className="intro-name">I am Aaron</h1>
          <p>
            I am a surface pattern designer based in India. I create repeat
            patterns experimenting with every skill that I can put my hand on.
            The fact that I love creating patterns is totally because of the
            freedom to get inspired by the most obvious objects and the ability
            to interpret them with the most creative techniques into great
            artworks.
          </p>
          <p>
            At this point, I am starting my career as a surface pattern designer
            by making new art everyday and making my work available out there.
          </p>
          <p>
            I developed an interest in pattern design working as an intern for a
            brand selling traditional block prints of India. I worked a
            freelance project right after that involved the development of
            Indian traditional patterns. Working for a few months got me to the
            realisation that I was more interested towards modern print
            patterns.{" "}
          </p>
          <p className="light">
            So, here I am with a lot of prints and patterns to offer and looking
            for great career opportunities.
          </p>
        </span>
      </div>
    );
  }
}

export default About;
