import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import styles from "./css/Entity.module.css";
import { indentHeader, moveArrowIndetX, moveArrowIndetY } from "../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsAlt } from "@fortawesome/free-solid-svg-icons";
import Attribute from "./Attribute";

const Entity = ({ data, types }) => {
  const [isMoving, setIsMoving] = useState(false);
  const [position, setPosition] = useState({
    screenX: 0,
    screenY: indentHeader,
  });

  const onMouseMove = (e) => {
    setPosition({
      screenX: e.pageX - moveArrowIndetX,
      screenY: e.pageY - moveArrowIndetY,
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
          {data.name}
          <icon className="float-end" onMouseDown={onMouseDown}>
            <FontAwesomeIcon icon={faArrowsAlt} />
          </icon>
        </Card.Title>
        <Card.Subtitle as="div" className="text-center fst-italic text-muted">
          {data.comment}
        </Card.Subtitle>
      </Card.Header>
      <Card.Body className="p-0">
        <Table bordered size="sm" className="mb-0">
          <tbody>
            {data.attributes.map((e) => (
              <Attribute types={types} data={e} />
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default Entity;
