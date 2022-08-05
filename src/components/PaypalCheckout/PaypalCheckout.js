import React, { Component, createRef } from 'react';


class PaypalCheckout extends Component {
    componentDidMount() {

    }

    state = {
        paidFor: false,
        loaded: false,
    }
    render() {
        return (
            <div className='checkout-container'>

            </div>
        );
    }
}

export default PaypalCheckout;