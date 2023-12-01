import React from "react";
import { Container, Navbar } from "react-bootstrap";

const Header = () => {
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand href="/">This Header Title</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
