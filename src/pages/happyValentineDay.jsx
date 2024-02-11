import React, { useEffect, useRef, useState } from "react";
import { Fade, Zoom } from "react-awesome-reveal";
import { Button, Container, Form } from "react-bootstrap";

const HappyValentineDay = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0); // Aggiungi uno stato per la durata
  const [volume, setVolume] = useState(0.5); // Valore iniziale del volume
  const audioRef = useRef(null);

  // useEffect(() => {
  //   const createHeart = () => {
  //     const heart = document.createElement("div");
  //     heart.classList.add("heart");

  //     heart.style.left = Math.random() * 100 + "vw";
  //     heart.style.animationDuration = Math.random() * 2 + 3 + "s";

  //     heart.innerText = "💗";

  //     document.body.appendChild(heart);

  //     setTimeout(() => {
  //       heart.remove();
  //     }, 5000);
  //   };

  //   const interval = setInterval(createHeart, 300);

  //   return () => clearInterval(interval); // Pulizia dell'intervallo quando il componente viene smontato
  // }, []);

  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = 0.5; // Imposta il volume iniziale qui, se necessario

    const updateProgress = () => {
      const { currentTime } = audio;
      setProgress((currentTime / duration) * 100);
    };

    audio.addEventListener("timeupdate", updateProgress);

    return () => audio.removeEventListener("timeupdate", updateProgress);
  }, [duration]);

  useEffect(() => {
    setDuration(audioRef.current.duration);
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio
        .play()
        .catch((error) => console.error("Error playing audio:", error));
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
  };

  const handleProgressChange = (e) => {
    const newTime = (e.target.value / 100) * duration;
    audioRef.current.currentTime = newTime;
  };

  return (
    <Container
      className="d-flex flex-column justify-content-center align-items-center position-relative"
      style={{ height: "100vh" }}
    >
      <Zoom cascade={true}>
        <h1>Happy Valentine's Day Mob!</h1>
        <img
          className="circle mb-4"
          src="/assets/image/panda/love_00.jpeg"
          alt=""
        />
      </Zoom>
      <div className="custom-audio-player">
        <Button onClick={togglePlay} className="play-pause-btn">
          {isPlaying ? (
            <Fade>
              <img src="/assets/icons/pause.svg" alt="" />
            </Fade>
          ) : (
            <Fade>
              <img src="/assets/icons/play.svg" alt="" />
            </Fade>
          )}
        </Button>

        <div className="progress-container">
          <Form.Control
            type="range"
            value={progress}
            onChange={handleProgressChange}
            className="progress-bar"
          />
        </div>
        {/* <Form.Control
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="volume-slider"
        /> */}
      </div>
      <audio
        ref={audioRef}
        loop
        onLoadedMetadata={() => setDuration(audioRef.current.duration)}
      >
        <source src="/assets/audio/valentine.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
      <Fade cascade={true} delay={1000}>
        <p>I love you toDaMax!</p>
        <p>
          Thank you for everything and I hope u enjoyed this little silly game,
        </p>
        <p>'cauz I enjoyed making it!</p>
      </Fade>
    </Container>
  );
};

export default HappyValentineDay;
