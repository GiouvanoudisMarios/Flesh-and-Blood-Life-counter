import React from "react";
import PropTypes from "prop-types";
import "./imageGallery.css"; // Add this if you want custom styles

// Dynamically import all images from the "images" folder
const images = import.meta.glob("/src/images/*.png", { eager: true });
//Boolean for toggling player icons
let isTopPlayer = true;

function ImageGallery({ setBotPlayer, setTopPlayer }) {
  // Create an array of image objects with names and URLs
  const imageList = Object.keys(images).map((key) => {
    const name = key.replace("/src/images/", "").replace(".png", ""); // Extract name
    const url = images[key].default || images[key];
    return { name, url };
  });

  // handler to choose player
  const handleClick = (name) => {
    if (isTopPlayer) {
      setTopPlayer(name);
    } else {
      setBotPlayer(name);
    }
    isTopPlayer = !isTopPlayer;
  };

  return (
    <div className="image-gallery">
      {imageList.length > 0 ? (
        imageList.map(({ name, url }) => (
          <img
            key={name}
            src={url}
            alt={`image-${name}`}
            className="gallery-image"
            onClick={() => handleClick(name)}
          />
        ))
      ) : (
        <p>No images found</p>
      )}
    </div>
  );
}
ImageGallery.propTypes = {
  setBotPlayer: PropTypes.func.isRequired,
  setTopPlayer: PropTypes.func.isRequired,
};
export default ImageGallery;
