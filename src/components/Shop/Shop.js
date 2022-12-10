import React, { Component } from "react";
import "../../styles/Shop/Shop.css";
import loader from "../Loader/Loader";
import { fetchItems } from "../../actions/shopActions";
import AddToCart from "../icons/AddToCartIcon.png";
import TickAnimation from "./TickAnimation.json";
import { Link, Redirect } from "react-router-dom";
import Lottie from "react-lottie";
import { connect } from "react-redux";
import { fetchCart, addToCart } from "../../actions/cartActions";
import ImageContainer from "../ImageContainer/ImageContainer";
import { showNotification } from "@mantine/notifications";
import { endpoint } from "../../constants";

class Shop extends Component {
  constructor(props) {
    super(props);
    this.handleSetAnimation();
  }
  componentDidMount() {
    this.props.fetchItems();
  }

  state = {
    cartItems: [],
    redirect: false,
  };

  handleSetAnimation = () => {
    this.props.fetchCart(() => {
      let tempArr = [];
      this.props.cartItems.forEach((cartItem) => {
        tempArr.push(cartItem.item.slug);
      });

      this.setState({ cartItems: tempArr });
    });
  };

  render() {
    const defaultOptions = {
      loop: false,
      autoplay: true,
      animationData: TickAnimation,
      redererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };

    const items = this.props.items.map((item) => (
      <div className="item-container" key={item.id}>
        <Link to={`${endpoint}/shop/${item.slug}/`}>
          <div className="img-wrapper">
            <ImageContainer
              src={item.keyimage}
              height={item.image_height}
              width={item.image_width}
              alt={`gallery-image: ${item.title}`}
            />
          </div>
        </Link>
        <div className="sub-container">
          <div className="title-price">
            <h5 className="item-title">{item.title}</h5>
            <div className="price-container">
              <span className="item-price">
                ${item.discount_price ? item.discount_price : item.price}
              </span>
              <span className="item-discount-price">
                {item.discount_price && "$" + item.price}
              </span>
            </div>
          </div>

          {this.state.cartItems.includes(item.slug) ? (
            <Lottie
              style={{ margin: 0 }}
              onClick="null"
              options={defaultOptions}
              height={50}
              width={50}
            />
          ) : (
            <>
              <img
                onClick={() => {
                  if (localStorage.getItem("_shpuid")) {
                    this.props.addToCart(item.slug, () => {
                      this.handleSetAnimation();
                    });
                  } else {
                    showNotification({
                      title: "Error",
                      color: "red",
                      message: "You need to signin to add items to your cart",
                    });
                    this.setState({ redirect: true });
                  }
                }}
                src={AddToCart}
                className="add-to-cart"
                alt="add-to-cart icon"
              />
              {this.state.redirect && <Redirect to="/signin" />}
            </>
          )}
        </div>
      </div>
    ));

    return (
      <div className="loader-shop-container">
        {this.props.loading && loader}

        <div className="shop-container">{!this.props.loading && items}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  title: state.header.title,
  items: state.shop.items,
  loading: state.shop.loading,
  cartItems: state.cart.items,
});

const mapDispatchToProps = {
  fetchItems,
  addToCart,
  fetchCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
