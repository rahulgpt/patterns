import React, { Component } from 'react';
import './Shop.css'
import loader from '../Loader/Loader';
import { fetchItems } from '../../actions/shopActions';
import AddToCart from '../icons/AddToCartIcon.png';
import TickAnimation from './TickAnimation.json';
import TickAnimation2 from './TickAnimation2.json';
import { Link } from 'react-router-dom';
import Lottie from 'react-lottie'
import { connect } from 'react-redux';
import { motion } from 'framer-motion';
import { fetchCart, addToCart } from '../../actions/cartActions';
import ImageContainer from '../ImageContainer/ImageConatiner';

class Shop extends Component {
    constructor(props) {
        super(props);
        this.handleSetAnimation();
    }
    componentDidMount() {
        //setTimeout(() => this.props.fetchItems(), 2000)
        this.props.fetchItems();
        //this.props.fetchCart();
    }

    state = {
        cartItems: []
    }

    handleSetAnimation = async () => {
        this.props.fetchCart(() => {
            let tempArr = [];
            this.props.cartItems.forEach((cartItem) => {
                tempArr.push(cartItem.item.slug);
            })

            this.setState({ cartItems: tempArr });
        });
    }


    render() {
        const defaultOptions = {
            loop: false,
            autoplay: true,
            animationData: TickAnimation,
            redererSettings: {
                preserveAspectRatio: "xMidYMid slice"
            }
        }


        const items = this.props.items.map(item => (
            <div className='item-container'>
                <Link to={`shop/${item.slug}/`}>
                    <div className='img-wrapper'>
                        <ImageContainer
                            src={item.keyimage}
                            height={item.image_height}
                            width={item.image_width}
                            alt={`gallery-image: ${item.title}`}
                        />
                        {/* <motion.img
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.3 }}
                            src={item.keyimage} className='item-image'
                            alt='product-img'
                        /> */}

                    </div>
                </Link>
                <div className='sub-container'>
                    <div className='title-price'>
                        <h5 className='item-title'>{item.title}</h5>
                        <div className='price-container'>
                            <span className='item-price'>
                                ${item.discount_price ? item.discount_price : item.price}
                            </span>
                            <span className='item-discount-price'>{item.discount_price && '$' + item.price}</span>
                        </div>
                    </div>

                    {this.state.cartItems.includes(item.slug) ?
                        <Lottie style={{ margin: 0 }} onClick='null' options={defaultOptions} height={50} width={50} />
                        :
                        <img onClick={() => {
                            if (localStorage.getItem('_shpuid')) {
                                this.props.addToCart(item.slug, () => {
                                    this.handleSetAnimation();
                                });
                            }
                        }} src={AddToCart} className="add-to-cart" />
                    }

                </div>
            </div>
        ))

        return (
            <div className='loader-shop-container'>
                {this.props.loading && loader}

                <div className='shop-container'>
                    {!this.props.loading && items}
                    {/* <div className='item-container'>
                    <Link to='productdetail'>
                        <img src={Image2} className='item-image' />
                    </Link>
                    <div className='sub-container'>
                        <div className='title-price'>
                            <h5 className='item-title'>The Bird Bard</h5>
                            <span className='item-price'>$8.00</span>
                        </div>
                        <img src={AddToCart} className="add-to-cart" />
                        
                    </div>
                </div> */}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    title: state.header.title,
    items: state.shop.items,
    loading: state.shop.loading,
    cartItems: state.cart.items
});

const mapDispatchToProps = {

    fetchItems,
    addToCart,
    fetchCart,

}



export default connect(mapStateToProps, mapDispatchToProps)(Shop);


