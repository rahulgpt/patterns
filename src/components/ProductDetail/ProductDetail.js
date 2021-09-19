import React, { Component } from 'react';
import './ProductDetail.css';
import { connect } from 'react-redux';
import { fetchItem } from '../../actions/productDetailActions';
import loader from '../Loader/Loader';
import { addToCart } from '../../actions/cartActions';
import ImageContainer from '../ImageContainer/ImageConatiner';
// import Lottie from 'react-lottie'
// import TickAnimation from '../Shop/TickAnimation.json'

class ProductDetail extends Component {
    state = {
        loading: true
    }
    componentDidMount() {
        window.scrollTo(0, 0);

        const { match: { params } } = this.props;

        this.props.fetchItem(params.slug);
        this.setState({ loading: false })

    }

    render() {
        // const defaultOptions = {
        //     loop: true,
        //     autoplay: true,
        //     animationData: TickAnimation,
        //     redererSettings: {
        //         preserveAspectRatio: "xMidYMid slice"
        //     }
        // }

        const { item } = this.props;

        return (
            <div className='flex-container-main'>
                <div className='product-img-container' >

                    <ImageContainer
                        src={item.keyimage}
                        height={item.image_height}
                        width={item.image_width}
                        alt={`gallery-image: ${item.title}`}
                        className='pd-product-img'
                    />
                    <img className='pd-product-img' src={item.keyimage} alt="First Image" />


                    <img className='pd-product-img' src={item.subimage1} alt="Second Image" />
                    <img className='pd-product-img' src={item.subimage2} />

                </div>
                <div className='flex-container-description'>
                    <div className='description-wrapper'>

                        <h3 className='title'>{item.title}</h3>

                        <span>
                            <h3 className='price'>${item.discount_price ? item.discount_price : item.price} USD</h3>
                            <h3 className='price' id='pd-discount-price'>{item.discount_price && '$' + item.price + 'USD'}</h3>
                        </span>



                        <button className='add-to-cart-btn' onClick={() => this.props.addToCart(item.slug)} >
                            {/* <img src={AddToCart} id='addtocart-icon' /> */}
                            {/* <Lottie onClick='null' options={defaultOptions} height={50} width={50} /> */}
                        Add to Cart
                    </button>

                        <div className='type-colorbox-container'>
                            {/* <div className='file-type-flex'>
                            <img src={FileType} id='filetype-icon' />
                            <p className='product-type'>{item.file_type}</p>
                        </div> */}
                            {/* Planned to not have color schemes 
                            Can be used in future */}
                            {/* <div className='color-box-container'>
                            <div className='color-box'></div>
                            <div className='color-box'></div>
                            <div className='color-box'></div>
                        </div> */}
                        </div>
                        <div className='more-details'>

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
    addToCart
};

const mapStateToProps = state => ({
    item: state.productDetail.item,
    loading: state.productDetail.loading
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);