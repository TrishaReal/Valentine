import React from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Page404 = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/'); // Navigate back to the homepage
  };

  return (
    <Container
      className="d-flex flex-column justify-content-center align-items-center position-relative"
      style={{ height: "100vh" }}
    >
      <h2 className="m-0">Page Not Found</h2>
      <div className="notFound">
        <span>4</span>
        <span>
          <img src="/assets/image/panda/404.gif" alt="" />
        </span>
        <span>4</span>
      </div>

      <Button variant="primary" className="m-2 mx-4" onClick={handleBackClick}>
        Back
      </Button>
    </Container>
  );
};

export default Page404;
