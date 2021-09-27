import React, { Fragment, useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import Entity from "../components/Entity";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { getERModel } from "../api/erModels";
import { getTypes } from "../api/types";
import { useParams } from "react-router";
import CreateEntityModal from "../components/CreateEntityModal/index";

const defaultErModel = {
  entities: [],
};

const LoginPage = () => {
  const { id } = useParams();
  const [erModel, setErModel] = useState(defaultErModel);
  const [modalShow, setModalShow] = useState(false);
  const [types, setTypes] = useState({});

  useEffect(() => {
    (async () => {
      const [erModelResponse, typesResponse] = await Promise.all([
        getERModel(id),
        getTypes(),
      ]);

      setTypes(
        typesResponse.data.reduce((a, x) => {
          a[x.id] = x;
          return a;
        }, {})
      );
      setErModel(erModelResponse.data);
    })();
  }, [id]);

  const createEntityHandler = (data) => {
    let newErModel = { ...erModel };
    newErModel.entities.push(data)
    setErModel(newErModel);
  }


  return (
    <Fragment>
      <Navbar bg="dark" variant="dark" className="py-0">
        <Container>
          <Navbar.Brand>
            <Link to="/" className="text-decoration-none text-reset">
              ERCreator
            </Link>
          </Navbar.Brand>
          <Navbar.Collapse>
            <Nav>
              <NavDropdown title="Menu" id="basic-nav-dropdown">
                <NavDropdown.Item
                  onClick={() => {
                    setModalShow(true);
                  }}
                >
                  Add table
                </NavDropdown.Item>
                <NavDropdown.Item>
                  Save model
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container fluid className="p-0">
        <Row className="m-0">
          <Col className="m-0 p-0">
            {erModel.entities.map((e) => (
              <Entity types={types} data={e} />
            ))}
          </Col>
        </Row>
      </Container>
      {modalShow ?
        <CreateEntityModal types={types} onSave={createEntityHandler} entities={erModel.entities} show={modalShow} onHide={() => setModalShow(false)} />
        : null}

    </Fragment>
  );
};

export default LoginPage;
