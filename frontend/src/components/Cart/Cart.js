import React, { Component } from "react";
import CloseIcon from "../icons/CloseIcon.svg";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchCart, removeCart } from "../../actions/cartActions";
import { authAxios } from "../../utils";
import { removeFromCartURL } from "../../constants";

import "../../styles/Cart/Cart.css";

class Cart extends Component {
  componentDidMount() {
    this.props.fetchCart();
  }

  state = {
    loading: true,
    items: [],
    coupon: null,
    total: 0,
    itemCount: 0,
  };

  handleRemoveItem = (itemId) => {
    authAxios
      .delete(removeFromCartURL + `${itemId}/delete/`)
      .then((res) => {
        this.props.fetchCart();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const items = this.props.orderItems.map((orderItem) => (
      <tr>
        <td className="flex">
          <img
            className="product-img"
            src={`${process.env.REACT_APP_BACKEND_URL}${orderItem.item.keyimage}`}
            alt="product"
          />
          <h3>{orderItem.item.title}</h3>
        </td>

        <td>
          <span>
            ${orderItem.item.discount_price || orderItem.item.price} USD
          </span>
        </td>

        <td>
          {/* <img id='cart-file-type' src={FileType} /> */}
          <h4 style={{ fontWeight: 400 }}>Jpeg, Png</h4>
          <img
            src={CloseIcon}
            onClick={() => this.handleRemoveItem(orderItem.id)}
            className="cart-remove"
            alt="close-icon"
          />
        </td>
      </tr>
    ));

    return (
      <div className="cart-container">
        <h4 className="title-line">Cart</h4>

        {this.props.count === 0 ? (
          localStorage.getItem("_shpuid") ? (
            <p className="cart-empty">
              Your cart is empty.{" "}
              <Link id="continue-shopping" to="/shop">
                Continue shopping.
              </Link>
            </p>
          ) : (
            <p className="cart-empty">
              Please{" "}
              <Link id="continue-shopping" to="/signin">
                Sign in
              </Link>{" "}
              to view your cart.
            </p>
          )
        ) : (
          <React.Fragment>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>FileType</th>
                </tr>
              </thead>

              <tbody>{items}</tbody>
            </table>

            <div className="cart-tools">
              <span id="cart-total">${this.props.total} USD</span>
              <Link to="/checkout">
                <button className="auth-btn" id="checkout-btn">
                  CHECKOUT
                </button>
              </Link>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  orderItems: state.cart.items,
  coupon: state.cart.coupon,
  total: state.cart.total,
  count: state.cart.itemCount,
  loading: state.cart.loading,
});

const mapDispatchToProps = {
  fetchCart,
  removeCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
