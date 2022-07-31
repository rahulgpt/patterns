import React, { Component } from "react";
import "../../styles/Dashboard/Dashboard.css";
import dummyImage from "../images/4.jpg";
import dummyImage1 from "../images/5.jpg";
import dummyImage2 from "../images/6.jpg";

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard-container">
        <h4 className="title-line d-margin">Dashboard</h4>

        <div className="dashboard">
          <div className="dashboard-nav">
            <span>
              <h4>My Products</h4>
              <h4>Account Info</h4>
              <h4>Billing Details</h4>
            </span>
          </div>

          <div className="nav-detail">
            <div className="dashboard-item">
              <span className="grp">
                <img
                  className="product-img"
                  src={dummyImage}
                  alt="product-img"
                />
                <h3 className="p-title">Bats and Bunting</h3>
              </span>

              <button className="auth-btn reg-btn download-btn">
                Download
              </button>
            </div>
            <div className="dashboard-item">
              <span className="grp">
                <img
                  className="product-img"
                  src={dummyImage1}
                  alt="product-img"
                />
                <h3 className="p-title">Dummy Product</h3>
              </span>

              <button className="auth-btn reg-btn download-btn">
                Download
              </button>
            </div>
            <div className="dashboard-item">
              <span className="grp">
                <img
                  className="product-img"
                  src={dummyImage2}
                  alt="product-img"
                />
                <h3 className="p-title">Another</h3>
              </span>

              <button className="auth-btn reg-btn download-btn">
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
