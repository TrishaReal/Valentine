import React, { useEffect, useRef, useState } from "react";
import { Fade, Zoom } from "react-awesome-reveal";
import { Button, Container, Form } from "react-bootstrap";

const HappyValentineDay = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    const createHeart = () => {
      const heart = document.createElement("div");
      heart.classList.add("heart");

      heart.style.left = Math.random() * 100 + "vw";
      heart.style.animationDuration = Math.random() * 2 + 3 + "s";

      heart.innerText = "💗";

      document.body.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, 5000);
    };

    const interval = setInterval(createHeart, 300);

    return () => clearInterval(interval); 
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = 0.5;

    const updateProgress = () => {
      const { currentTime } = audio;
      setProgress((currentTime / duration) * 100);
      setCurrentTime(currentTime);
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

  const handleProgressChange = (e) => {
    const newTime = (e.target.value / 100) * duration;
    audioRef.current.currentTime = newTime;
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <Container
      className="d-flex flex-column justify-content-center align-items-center position-relative"
      style={{ height: "100vh" }}
    >
      <Zoom cascade={true}>
        <h1>Happy Valentine's Day Mob!</h1>

        <div id="img"></div>

      </Zoom>
      <div className="custom-audio-player">
        <div className="progress-container">
          <Fade cascade={true}>
            <label for="customRange3" className="form-label">
              Maddison B. ft Cody S. - Valentine
            </label>
            <Form.Control
              type="range"
              value={progress}
              onChange={handleProgressChange}
              className="progress-bar"
              id="customRange3"
            />
            <div className="time-info">
              <span className="time-current">{formatTime(currentTime)}</span>

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

              <span className="time-duration">{formatTime(duration)}</span>
            </div>
          </Fade>
        </div>
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
