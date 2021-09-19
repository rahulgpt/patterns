import React, { Component } from 'react';
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';

class Alert extends Component {
    componentDidUpdate(prevProps) {
        const { gridError, alert, shopSuccess,
            shopError
        } = this.props;

        if (gridError !== prevProps.gridError) {
            alert.error(`${gridError}`)
        }

        if (shopError !== prevProps.shopError) {
            alert.error(`${shopError}`)
        }

        if (shopSuccess !== prevProps.shopSuccess) {
            alert.success(`${shopSuccess}`)
        }

    }

    render() {
        return (
            <React.Fragment />
        );
    }
}

const mapStateToProps = state => ({
    gridError: state.grid.err,
    shopError: state.shop.error,
    shopSuccess: state.cart.successMessage,
    shopError: state.shop.error
})



export default connect(mapStateToProps, null)(withAlert()(Alert));