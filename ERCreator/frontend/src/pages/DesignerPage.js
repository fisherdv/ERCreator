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
import { indentHeader } from "../config";
import { createEntity } from "../api/entity";

const defaultErModel = {
  entities: [],
};

const defaultEntity = () => {
  return {
    name: "",
    comment: "",
    positionX: 0,
    positionY: indentHeader,
    attributes: [],
  };
};

const defaultAttribute = () => {
  return {
    name: "",
    default: "",
    comment: "",
    size: null,
    is_primary_key: false,
    is_unique: false,
    is_nullable: false,
    is_index: false,
    foreign_key: null,
    entity: null,
    type: null,
  };
};

const LoginPage = () => {
  const { id } = useParams();
  const [erModel, setErModel] = useState(defaultErModel);
  const [modalShow, setModalShow] = useState(false);
  const [types, setTypes] = useState({});
  const [editedEntity, setEditedEntity] = useState(defaultEntity());

  useEffect(() => {
    (async () => {
      try {
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
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);

  const onChangeEditedEntity = (event, key) => {
    if (key !== undefined) {
      const value =
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value;

      const attribute = editedEntity.attributes[key];
      editedEntity.attributes[key] = {
        ...attribute,
        [event.target.name]: value,
      };
      setEditedEntity({ ...editedEntity });
    } else if (event.target.name === "addAtribute") {
      editedEntity.attributes.push(defaultAttribute());
      setEditedEntity({ ...editedEntity });
    } else {
      setEditedEntity({
        ...editedEntity,
        [event.target.name]: event.target.value,
      });
    }
  };

  const onSaveEditedEntity = () => {
    createEntity({ ...editedEntity, er_model_id: id })
      .then((response) => {
        erModel.entities.push(response.data);
        setErModel({ ...erModel });
        setModalShow(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const hideModal = () => {
    setModalShow(false);
    setEditedEntity(defaultEntity());
  };

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
                <NavDropdown.Item>Save model</NavDropdown.Item>
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
      <CreateEntityModal
        entity={editedEntity}
        onChange={onChangeEditedEntity}
        onSave={onSaveEditedEntity}
        types={types}
        entities={erModel.entities}
        show={modalShow}
        onHide={hideModal}
      />
    </Fragment>
  );
};

export default LoginPage;
