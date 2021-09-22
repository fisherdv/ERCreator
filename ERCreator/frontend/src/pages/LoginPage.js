import React, { Fragment } from "react";
import LoginForm from "../components/LoginForm";
import Header from "../components/Header";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const LoginPage = () => {
  return (
    <Fragment>
      <Header />
      <Container className="mt-5">
        <Row className="justify-content-md-center">
          <Col lg="6">
            <LoginForm />
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default LoginPage;
