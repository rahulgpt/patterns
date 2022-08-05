import React, { Component } from "react";
import "../../styles/Contact/Contact.css";
import { showNotification } from "@mantine/notifications";

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      subject: "",
      message: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.handleInputChange();
    this.setState({ name: "", email: "", subject: "", message: "" });
    showNotification({
      title: "Success",
      message: "Your message has been sent",
      color: "cyan",
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({ [name]: value });

    showNotification();
  }

  validateField() {
    for (const field in this.state) {
      if (!this.state[field].length) {
        showNotification({
          title: "Error",
          message: "All fields are required",
          color: "red",
        });

        return;
      }
    }
  }

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
              <input
                type="text"
                name="name"
                className="contact-input"
                onChange={this.handleInputChange}
                value={this.state.name}
              />
            </label>

            <label id="email" className="contact-label">
              Email
              <input
                type="email"
                name="email"
                className="contact-input"
                onChange={this.handleInputChange}
                value={this.state.email}
              />
            </label>

            <label id="subject" className="contact-label">
              Subject
              <input
                type="text"
                name="subject"
                className="contact-input"
                onChange={this.handleInputChange}
                value={this.state.subject}
              />
            </label>

            <label id="message" className="contact-label">
              Message
              <textarea
                name="message"
                className="contact-textarea"
                onChange={this.handleInputChange}
                value={this.state.message}
              />
            </label>
            <div className="btn-wrapper">
              <input
                id="submit-btn"
                type="submit"
                value="SEND"
                onClick={this.handleSubmit}
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Contact;
