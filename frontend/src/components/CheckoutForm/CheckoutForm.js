import React, { Component, createRef } from "react";
import "../../styles/CheckoutForm/Checkout.css";
import { connect } from "react-redux";
import InfoIcon from "../icons/info-icon.svg";
import { authAxios } from "../../utils";
import { paymentIntentURL } from "../../constants";
import { CardElement } from "@stripe/react-stripe-js";
import Popup from "../Popup/Popup.js";

class CheckoutForm extends Component {
  constructor() {
    super();

    this.paypalBtn = createRef();

    this.handleInputChange = this.handleInputChange.bind(this);
    //this.handleSignInSubmit = this.handleSignInSubmit.bind(this);
  }

  state = {
    isProcessing: false,
    checkoutError: null,
    scriptLoaded: true,
    paidFor: false,
  };

  componentDidMount() {
    // const script = document.createElement('script');
    // script.src = 'https://www.paypal.com/sdk/js?client-id=AXAF0iAXFc-R6w72Qh9vlzSNz6HHCdBAqZV9v3JSPNM-c4OpnLgAWPyCYhC35K9O6mVYDSpekqrNe2gX';
    // script.addEventListener('load', () => this.setState({ scriptLoaded: true }));
    // document.body.appendChild(script);

    console.log("Total" + this.props.total);

    window.scrollTo(0, 0);

    setTimeout(() => {
      if (this.state.scriptLoaded) {
        setTimeout(() => {
          window.paypal
            .Buttons({
              createOrder: (data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      description: "Some Desc",
                      amount: {
                        value: 100,
                      },
                    },
                  ],
                });
              },
              funding: {
                disallowed: [window.paypal.FUNDING.CARD],
              },
              onApprove: async (data, actions) => {
                const order = await actions.order.capture();

                this.setState({ paidFor: true });

                console.log(order);
              },
            })
            .render(this.paypalBtn.current);
        });
      }
    });
  }

  handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    const { stripe, elements } = this.props;

    const billingDetails = {
      name: "rahulgpt",
      email: "someone@example.com",
      address: {
        city: "Jaipur",
        line1: "St. 85 Street",
        state: "Rajasthan",
        postal_code: 302020,
      },
    };

    this.setState({ isProcessing: true });

    // Create a Payment Intent on the server
    // client_secret of the payment intent
    const res = await authAxios.post(paymentIntentURL, {
      amount: 10,
    });

    const clientSecret = res.data.clientSecret;
    // Stripe, amount is in the lowest denomination

    const cardElement = elements.getElement(CardElement);

    // need refrence to cardElement
    // create a payment method

    // Confirm the card payments
    // payment method id
    // client_secret

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: billingDetails,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }

    const confirmedCardPayment = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod.id,
    });

    console.log(confirmedCardPayment);
  };

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({ [name]: value });
  }

  render() {
    const { stripe } = this.props;
    const { isProcessing } = this.state;
    return (
      <div className="checkout-container">
        <form onSubmit={this.handleSubmit}>
          <h4>Payment</h4>
          <p>All transactions are secure and encrypted. </p>

          <div className="billing-details">
            <h5>
              Billing Details
              <div class="more-info">
                <img src={InfoIcon} alt="info-icon" />
                <Popup
                  text="Billing details are mandatory according to
                                    Indian export regulation."
                  link={
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://support.stripe.com/questions/requirements-for-india-export-charges"
                    >
                      {" "}
                      More information
                    </a>
                  }
                />

                {/* <span>
                                    Billing details are mandatory according to
                                    Indian export regulation.
                                    <a target="_blank" rel="noopener noreferrer" href='https://support.stripe.com/questions/requirements-for-india-export-charges'> More information</a>
                                </span> */}
              </div>
            </h5>

            <label id="billing-name">
              Name
              <input
                type="text"
                name="billing-name"
                className="checkout-input"
                onChange={this.handleInputChange}
              />
            </label>

            <label id="billing-email">
              Email
              <input
                type="email"
                name="billing-email"
                className="checkout-input"
                onChange={this.handleInputChange}
              />
            </label>

            <label id="billing-state">
              State
              <input
                type="text"
                name="billing-state"
                className="checkout-input"
                onChange={this.handleInputChange}
              />
            </label>

            <label id="billing-city">
              City
              <input
                type="text"
                name="billing-city"
                className="checkout-input"
                onChange={this.handleInputChange}
              />
            </label>

            <label id="billing-address">
              Address
              <input
                type="text"
                name="billing-address"
                className="checkout-input"
                onChange={this.handleInputChange}
              />
            </label>

            <label id="billing-zip">
              ZIP
              <input
                type="text"
                name="billing-zip"
                className="checkout-input"
                onChange={this.handleInputChange}
              />
            </label>

            <label id="billing-remember">
              Remember Billing Details
              <input
                type="checkbox"
                name="billing-remember"
                defaultChecked="true"
                onChange={this.handleInputChange}
              />
            </label>
          </div>

          <CardElement
            className="stripe-cardelement"
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#000000",
                },
                invalid: {
                  color: "#9e2146",
                },
              },
              hidePostalCode: true,
            }}
          />
          <button type="submit" disabled={!stripe || isProcessing}>
            {isProcessing ? "Processing..." : `Pay $${this.props.total}`}
          </button>

          <div className="paypal-container">
            <h4 id="checkout-with-paypal">Or Checkout with Paypal</h4>
            <div ref={this.paypalBtn}></div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  total: state.cart.total,
});

export default connect(mapStateToProps, null)(CheckoutForm);
