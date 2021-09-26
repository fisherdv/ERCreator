import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import styles from "./css/Entity.module.css";
import { indentHeader, moveArrowIndetX, moveArrowIndetY } from "../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsAlt } from "@fortawesome/free-solid-svg-icons";

const Entity = () => { 
  const [isMoving, setIsMoving] = useState(false);
  const [position, setPosition] = useState({
    screenX: 0,
    screenY: indentHeader,
  });

  const onMouseMove = (e) => {
    setPosition({
      screenX: e.pageX - moveArrowIndetX,
      screenY: e.pageY - moveArrowIndetY
    });
  };

  const onMouseUp = (e) => {
    setIsMoving(false);
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  };

  const onMouseDown = (e) => {
    setIsMoving(true);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  return (
    <Card
      border="secondary"
      className={`${styles.entity} ${isMoving ? styles.no_select : null}`}
      style={{
        left: `${position.screenX}px`,
        top: `${position.screenY}px`,
      }}
      
    >
      <Card.Header className="py-0 px-1">
        <Card.Title as="div" className="fw-bold mb-1">
          Card Title
          <icon className='float-end' onMouseDown={onMouseDown}>
            <FontAwesomeIcon icon={faArrowsAlt} />
          </icon>
        </Card.Title>
        <Card.Subtitle as="div" className="text-center fst-italic text-muted">
          Card Subtitle
        </Card.Subtitle>
      </Card.Header>
      <Card.Body className="p-0">
        <Table striped bordered size="sm" className="mb-0">
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td>3</td>
              <td colSpan="2">Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </Table>
      </Card.Body>

      {/*
      <Card.Body className="p-0">
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link>
      </Card.Body>
       */}
    </Card>
  );
};

export default Entity;
