import React, { Fragment } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import Entity from "../components/Entity";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";

const LoginPage = () => {
  return (
    <Fragment>
      <Navbar bg="dark" variant="dark" className="py-0">
        <Container>
          <Navbar.Brand>
            <Link to="/" className="text-decoration-none text-reset">
              ERCreator
            </Link>
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Container fluid className="p-0">
          <Row className="m-0">
              <Col className="m-0 p-0">
                <Entity>

                </Entity>
              </Col>
          </Row>
      </Container>
    </Fragment>
  );
};

export default LoginPage;
