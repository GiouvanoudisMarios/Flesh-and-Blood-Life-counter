import React from "react";
import "./modalpicks.css";
import PropTypes from "prop-types"; // Import PropTypes for validation eslint stuff
import ImageGallery from "../imageGallery/imageGallery";

// Dynamically import all images from the "images" folder
const images = import.meta.glob("/src/images/*.png", { eager: true });

// Create an object to map image names to their paths
const playerImages = Object.keys(images).reduce((acc, path) => {
  const fileName = path.replace("/src/images/", "").replace(".png", "");
  acc[fileName] = images[path].default || images[path];
  return acc;
}, {});

function ModalPicks({
  closeModal,
  topPlayer,
  botPlayer,
  setTopPlayer,
  setBotPlayer,
}) {
  return (
    <div className="modal-container">
      {/* top modal div with chosen hero images */}
      <div className="modal-top">
        <div
          className="modal-top-left"
          style={{
            backgroundImage: `url(${playerImages[topPlayer] || ""})`,
          }}
        ></div>
        <div
          className="modal-top-right"
          style={{
            backgroundImage: `url(${playerImages[botPlayer] || ""})`,
          }}
        ></div>
      </div>
      <div className="modal-mid">
        <button className="close-modal-button" onClick={closeModal}>
          Fight!
        </button>
      </div>
      <div className="modal-bottom">
        <ImageGallery setBotPlayer={setBotPlayer} setTopPlayer={setTopPlayer} />
      </div>
    </div>
  );
}
ModalPicks.propTypes = {
  closeModal: PropTypes.func.isRequired,
  topPlayer: PropTypes.string.isRequired,
  botPlayer: PropTypes.string.isRequired,
  setTopPlayer: PropTypes.func.isRequired,
  setBotPlayer: PropTypes.func.isRequired,
};
export default ModalPicks;
