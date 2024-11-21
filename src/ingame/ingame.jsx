import React, { useState } from "react";
import "./ingame.css";
import ReactModal from "react-modal";
ReactModal.setAppElement("#root");
import ModalPicks from "../modalpicks/modalpicks";
import Count from "../count/count";
import hamburger from "../assets/hamburger.png";

// Dynamically import all images from the "images" folder
const images = import.meta.glob("/src/images/*.png", { eager: true });

// Create an object to map image names to their paths
const playerImages = Object.keys(images).reduce((acc, path) => {
  const fileName = path.replace("/src/images/", "").replace(".png", "");
  acc[fileName] = images[path].default || images[path];
  return acc;
}, {});

function Ingame() {
  const [topPlayer, setTopPlayer] = useState("bravo");
  const [botPlayer, setBotPlayer] = useState("boltyn");

  // manage count states for both players
  const [topCount, setTopCount] = useState(40);
  const [bottomCount, setBottomCount] = useState(40);
  // manage modal sates
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <div className="container" style={{ opacity: modalIsOpen ? 0.1 : 1 }}>
      <div
        className="top"
        style={{ backgroundImage: `url(${playerImages[topPlayer]})` }}
      >
        <Count
          count={topCount}
          onIncrement={() => setTopCount(topCount + 1)}
          onDecrement={() => setTopCount(topCount - 1)}
        />
      </div>

      <div
        className="bottom"
        style={{ backgroundImage: `url(${playerImages[botPlayer]})` }}
      >
        <Count
          count={bottomCount}
          onIncrement={() => setBottomCount(bottomCount + 1)}
          onDecrement={() => setBottomCount(bottomCount - 1)}
        />
        <button className="modal-button" onClick={openModal}>
          <img src={hamburger} alt="modal"></img>
        </button>
      </div>
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={{
          content: {
            position: "absolute",
            top: "2.5vh", // Align with the top position of the container
            left: "0",
            height: "95vh", // Match the height of .container
            width: "20%", // Match the width of .container
            border: "none",
            borderRadius: "0", // Remove border-radius to match container
            backgroundColor: "var(--modal-bg-color)", // Optional background color
            padding: "0", // No extra padding to match container
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
            display: "flex",
            alignItems: "flex-start", // Align overlay content to the top
            justifyContent: "flex-start", // Align overlay content to the left
          },
        }}
      >
        <ModalPicks
          closeModal={closeModal}
          topPlayer={topPlayer}
          botPlayer={botPlayer}
          setTopPlayer={setTopPlayer}
          setBotPlayer={setBotPlayer}
        />
      </ReactModal>
    </div>
  );
}
export default Ingame;
