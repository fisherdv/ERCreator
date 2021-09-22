import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { removeTokens, getAccessToken } from "../localStorage";
import { useHistory } from "react-router-dom";

function Header() {
  const history = useHistory();
  const isAuth = !!getAccessToken();

  const logout = () => {
    removeTokens();
    history.push("/login");
  };

  const LogoutButton = () => (
    <Nav className="justify-content-end">
      <Nav.Link onClick={logout}>Logout</Nav.Link>
    </Nav>
  );

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <Link to="/" className="text-decoration-none text-reset">
            ERCreator
          </Link>
        </Navbar.Brand>
        {isAuth ? <LogoutButton /> : ""}
      </Container>
    </Navbar>
  );
}

export default Header;
