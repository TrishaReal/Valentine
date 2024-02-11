import React, { useState } from "react";
import { Bounce, Fade, Zoom } from "react-awesome-reveal";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const pandaImages = [
  "/assets/image/panda/curious_00.png", // Immagine iniziale del panda curioso
  "/assets/image/panda/sad_01.png", // Immagine del panda triste
  "/assets/image/panda/angry_00.png", // Immagine del panda arrabbiato
  "/assets/image/panda/angry_02.png", // Un'altra immagine del panda arrabbiato
];

const BeMyValentine = ({ onBack }) => {
  const [pandaIndex, setPandaIndex] = useState(0);
  const [message, setMessage] = useState("Will you be my Valentine?");
  const [showHappyPanda, setShowHappyPanda] = useState(false);

  const navigate = useNavigate();

  const goToHappyValentine = () => {
    navigate("/happy-valentine-day");
  };

  const handleMoveButton = (e) => {
    if (showHappyPanda) return;

    const newX = Math.floor(
      Math.random() * (window.innerWidth - e.target.offsetWidth)
    );
    const newY = Math.floor(
      Math.random() * (window.innerHeight - e.target.offsetHeight)
    );
    e.target.style.position = "fixed";
    e.target.style.left = `${newX}px`;
    e.target.style.top = `${newY}px`;

    const nextIndex = pandaIndex + 1 < pandaImages.length ? pandaIndex + 1 : 1;
    setPandaIndex(nextIndex);
  };

  const handleYesClick = () => {
    setMessage(
      <Zoom>
        <h2>
          Yeeeeeyy! <b>I love you</b> my Valentine.
        </h2>
      </Zoom>
    );
    setShowHappyPanda(true);
  };

  return (
    <Container
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: "100vh", position: "relative" }}
    >
      <Fade cascade={true}>
        <h2>{message}</h2>
        {showHappyPanda ? (
          <>
            <Zoom>
              <img
                src="/assets/image/panda/love_01.gif"
                alt="Panda felice"
                style={{
                  width: "300px",
                  maxWidth: "300px",
                  marginBottom: "20px",
                }}
              />
            </Zoom>
            <Bounce>
              <Button variant="primary" onClick={goToHappyValentine}>
                Continue
              </Button>
            </Bounce>
          </>
        ) : (
          <img
            src={pandaImages[pandaIndex]}
            alt="Panda expression"
            style={{ width: "250px", maxWidth: "250px", marginBottom: "20px" }}
          />
        )}
        <div>
          <Button
            variant="primary"
            onClick={handleYesClick}
            className="m-2"
            style={{ display: showHappyPanda ? "none" : "inline-block" }}
          >
            Yes, sure!
          </Button>
          <Button
            variant="secondary"
            onMouseOver={handleMoveButton}
            onTouchStart={handleMoveButton}
            className="m-2"
            style={{
              // position: "absolute",
              transition: "0.5s ease",
              display: showHappyPanda ? "none" : "inline-block",
            }}
          >
            No
          </Button>
        </div>
      </Fade>
    </Container>
  );
};

export default BeMyValentine;
