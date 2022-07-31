import React, { Component } from "react";
import { showNotification } from "@mantine/notifications";
import { connect } from "react-redux";

class Alert extends Component {
  showSuccess(message) {
    return showNotification({
      title: "Success",
      message,
      color: "cyan",
    });
  }

  showError(message) {
    return showNotification({
      title: "Error",
      message,
      color: "red",
    });
  }

  componentDidUpdate(prevProps) {
    const { gridError, shopSuccess, shopError } = this.props;

    if (gridError !== prevProps.gridError) {
      this.showError(gridError);
    }

    if (shopError !== prevProps.shopError) {
      this.showError(shopError);
    }

    if (shopSuccess !== prevProps.shopSuccess) {
      this.showSuccess(shopSuccess);
    }
  }

  render() {
    return <React.Fragment />;
  }
}

const mapStateToProps = (state) => ({
  gridError: state.grid.err,
  shopError: state.shop.error,
  shopSuccess: state.cart.successMessage,
});

export default connect(mapStateToProps, null)(Alert);
