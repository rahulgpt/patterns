import React, { Component } from "react";
import "../../styles/ProductDetail/ProductDetail.css";
import { connect } from "react-redux";
import { fetchItem } from "../../actions/productDetailActions";
import { addToCart } from "../../actions/cartActions";
import ImageContainer from "../ImageContainer/ImageConatiner";
import { fetchCart } from "../../actions/cartActions";

class ProductDetail extends Component {
  state = {
    loading: true,
    isItemInCard: !!this.props.cartItems.find(
      (cartItem) => cartItem.item.id === this.props.item.id
    ),
  };

  componentDidMount() {
    window.scrollTo(0, 0);

    const {
      match: { params },
    } = this.props;

    this.props.fetchItem(params.slug);
    this.setState({ ...this.state, loading: false });
  }

  render() {
    const { item, cartItems } = this.props;

    return (
      <div className="flex-container-main">
        <div className="product-img-container">
          <ImageContainer
            src={item.keyimage}
            height={item.image_height}
            width={item.image_width}
            alt={`gallery-image: ${item.title}`}
            className="pd-product-img"
          />
          <img className="pd-product-img" src={item.keyimage} alt="First" />
          <img className="pd-product-img" src={item.subimage1} alt="Second" />
          {item.subimage2 && (
            <img className="pd-product-img" src={item.subimage2} alt="third" />
          )}
        </div>
        <div className="flex-container-description">
          <div className="description-wrapper">
            <h3 className="title">{item.title}</h3>

            <span>
              <h3 className="price">
                ${item.discount_price ? item.discount_price : item.price} USD
              </h3>
              <h3 className="price" id="pd-discount-price">
                {item.discount_price && "$" + item.price + "USD"}
              </h3>
            </span>

            {this.state.isItemInCard ? (
              <button
                className="add-to-cart-btn"
                style={{
                  background: "#efefef",
                  color: "#000",
                  cursor: "initial",
                }}
              >
                This item is already in your cart
              </button>
            ) : (
              <button
                className="add-to-cart-btn"
                onClick={() => {
                  this.props.addToCart(item.slug);

                  this.setState({
                    ...this.state,
                    isItemInCard: cartItems.find(
                      (cartItem) => cartItem.item.id === item.id
                    ),
                  });
                }}
              >
                Add to Cart
              </button>
            )}

            <div className="more-details">
              <span>{item.description}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  fetchItem,
  addToCart,
  fetchCart,
};

const mapStateToProps = (state) => ({
  item: state.productDetail.item,
  loading: state.productDetail.loading,
  cartItems: state.cart.items,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
