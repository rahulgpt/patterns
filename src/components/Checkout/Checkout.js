import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { ElementsConsumer, Elements } from "@stripe/react-stripe-js";
import { connect } from 'react-redux';
import CheckoutForm from '../CheckoutForm/CheckoutForm';

const InjectedCheckoutForm = () => {
    return (
        <ElementsConsumer>
            {({ elements, stripe }) => (
                <CheckoutForm elements={elements} stripe={stripe} />
            )}
        </ElementsConsumer>
    );
};

const stripePromise = loadStripe('pk_test_51H86G9FdqMSGpvwf4YK3Mxrn7l0mPW1We4zWrg8qUIWMaR8c3TqeqA2J9tBp3XWMhlL8XKOPSuktFZQe5ecHNlwu00gMCVNkXh');

const Checkout = () => {
    return (
        <Elements stripe={stripePromise}>
            <InjectedCheckoutForm />
        </Elements>
    )
}


const mapStateToProps = state => ({
    total: state.cart.total,
})


export default connect(mapStateToProps, null)(Checkout);
