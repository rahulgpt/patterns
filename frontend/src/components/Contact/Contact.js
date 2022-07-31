import React, { Component } from "react";
import "../../styles/Contact/Contact.css";

class Contact extends Component {
  render() {
    return (
      <div className="contact-container">
        <h1>Let's get in touch!</h1>

        <div className="form-wrapper">
          <p className="contact-line">
            If you want to have a custom pattern or illustration or want to work
            together on a project, send a message below. I am excited to have
            projects where I can put my work to great use. Let’s create
            something amazing!
          </p>
          <form>
            <label id="name" className="contact-label">
              Full Name
              <input type="text" name="name" className="contact-input" />
            </label>

            <label id="email" className="contact-label">
              Email
              <input type="email" name="email" className="contact-input" />
            </label>

            <label id="subject" className="contact-label">
              Subject
              <input type="text" name="subject" className="contact-input" />
            </label>

            <label id="message" className="contact-label">
              Message
              <textarea className="contact-textarea" />
            </label>
            <div className="btn-wrapper">
              <input id="submit-btn" type="submit" value="SEND" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Contact;
