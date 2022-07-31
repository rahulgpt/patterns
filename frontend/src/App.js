import React, { Component } from "react";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ProductDeatil from "./components/ProductDetail/ProductDetail";
import Shop from "./components/Shop/Shop";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Grid from "./components/Grid/Grid";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import Cart from "./components/Cart/Cart";
import Alerts from "./components/Notification/Notification";
import Checkout from "./components/Checkout/Checkout";
import Dashboard from "./components/Dashboard/Dashboard";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import store from "./store";
import { Provider } from "react-redux";
import { authCheckState } from "./actions/authActions";
import { connect } from "react-redux";
import { fetchCart } from "./actions/cartActions";

class App extends Component {
  componentDidMount() {
    authCheckState();

    if (localStorage.getItem("_shpuid")) this.props.fetchCart();
  }

  render() {
    return (
      <Provider store={store}>
        <MantineProvider withNormalizeCSS withGlobalStyles>
          <NotificationsProvider>
            <React.Fragment>
              <BrowserRouter>
                <Navbar />
                {/* <Header /> */}
                <Alerts />
                <Switch>
                  <Route exact path="/" component={Grid} />
                  <Route exact path="/shop" component={Shop} />
                  <Route exact path="/shop/:slug" component={ProductDeatil} />
                  <Route exact path="/about" component={About} />
                  <Route exact path="/contact" component={Contact} />
                  <Route exact path="/signin" component={SignIn} />
                  <Route exact path="/register" component={SignUp} />
                  <Route exact path="/cart" component={Cart} />
                  <Route exact path="/checkout" component={Checkout} />
                  <Route exact path="/Dashboard" component={Dashboard} />
                  <Route path="*" component={PageNotFound} />
                </Switch>
                <Footer />
              </BrowserRouter>
            </React.Fragment>
          </NotificationsProvider>
        </MantineProvider>
      </Provider>
    );
  }
}

const mapDispatchToProps = {
  authCheckState,
  fetchCart,
};

export default connect(null, mapDispatchToProps)(App);
