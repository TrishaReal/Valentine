import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import { Bounce, Fade, Hinge, Zoom } from "react-awesome-reveal";

function Intro() {
  const [stage, setStage] = useState(1);
  const [greeting, setGreeting] = useState("Good morning!");
  const [background, setBackground] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour >= 2 && hour < 14) {
        setGreeting("Good morning!");
      } else if (hour >= 14 && hour < 18) {
        setGreeting("Good afternoon!");
      } else {
        setGreeting("Good evening!");
      }
    };

    updateGreeting();

    if (stage === 1) {
      const timer = setTimeout(() => setStage(2), 3500);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  const handleFirstButton = () => setStage(3);
  const handleContinue = () => navigate("/be-my-valentine");
  const handleRetry = () => setStage(2);
  const handleSecondButton = () => setStage(4);

  return (
    <Container
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      {stage === 1 && (
        <Fade>
          <h2>Hello my love, {greeting}</h2>{" "}
        </Fade>
      )}
      {stage === 2 && (
        <>
          <Fade>
            <h2>Do you love me?</h2>
          </Fade>
          <div>
            <Bounce cascade={true}>
              <Button
                variant="primary"
                onClick={handleFirstButton}
                className="m-2"
              >
                Sure, I love you maab
              </Button>
              <Button
                variant="secondary"
                onClick={handleSecondButton}
                className="m-2"
              >
                Yes
              </Button>
            </Bounce>
          </div>
        </>
      )}
      {stage === 3 && (
        <Zoom cascade={true}>

          <h2>
            Awww.. <b>I love you more</b> amore mio
          </h2>
       
          <img
            className="circle mb-4"
            src="/assets/image/panda/panda_00.gif"
            alt=""
          />
          <Button variant="primary" onClick={handleContinue} className="m-2">
            Continue
          </Button>
        </Zoom>
      )}
      {stage === 4 && (
        <>
        <Hinge triggerOnce={true} duration={5000} delay={1000}>
          <h2>Nah, you don't love me!</h2>
        </Hinge>
        <Fade>
          <img
            className="circle mb-4"
            src="/assets/image/panda/sad_02.gif"
            alt=""
          />
          <Button variant="secondary" onClick={handleRetry} className="m-2">
            Retry
          </Button>
        </Fade>
        </>
      )}
    </Container>
  );
}

export default Intro;
