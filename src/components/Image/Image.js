import React from "react";
import "./Image.css";

const Image = props => {
    const [isLoaded, setIsLoaded] = React.useState(false);
    return (
        <React.Fragment>
            <img
                onLoad={() => {
                    setIsLoaded(true);
                }}
                className="image full"
                style={{ opacity: isLoaded ? 1 : 0 }}
                alt={props.alt}
                src={props.src}
            />
        </React.Fragment>
    );
};

export default Image;