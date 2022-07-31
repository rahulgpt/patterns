import React, { Component } from "react";
import "../../styles/Grid/Grid.css";
import { connect } from "react-redux";
import { fetchImages } from "../../actions/gridActions";
import loader from "../Loader/Loader";
import ImageContainer from "../ImageContainer/ImageConatiner";

class Grid extends Component {
  componentDidMount() {
    //setTimeout(() => this.props.fetchImages(), 2000)  // for debug
    this.props.fetchImages();
  }
  render() {
    const gridItem = this.props.grid.map((image) => (
      <div key={image.id} className="grid-img-wrapper">
        <ImageContainer
          src={image.imagesrc}
          height={image.image_height}
          width={image.image_width}
          alt={`gallery-image: ${image.title}`}
        />
        <div className="overlay-text">{image.title}</div>
        <span className="overlay-scrn" />
      </div>
    ));
    return (
      <div className="loader-contianer">
        {this.props.loading && loader}

        {/* <Carousel /> */}

        <div className="grid-container">{!this.props.loading && gridItem}</div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  fetchImages,
};

const mapStateToProps = (state) => ({
  grid: state.grid.images,
  loading: state.grid.loading,
});

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
