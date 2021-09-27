import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import styles from "./css/Entity.module.css";
import { indentHeader, moveArrowIndetX, moveArrowIndetY } from "../config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import Attribute from "./Attribute";
import { changePosition } from "../api/entity";

const Entity = ({ data, types, onEdit }) => {
  const [didMount, setDidMount] = useState(false)
  const [isMoving, setIsMoving] = useState(false);
  const [position, setPosition] = useState({
    screenX: 0,
    screenY: indentHeader,
  });

  useEffect(() => setDidMount(true), [])

  useEffect(() => {
    setPosition({
      screenX: data.positionX,
      screenY: data.positionY,
    })
  }, [data])

  useEffect(() => {
    if (didMount && !isMoving) {
      changePosition(data.id, position.screenX, position.screenY).then(response => {
        
      }).catch(error => {
        console.log(error)
      })
    }
  }, [isMoving])

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
          <i className="float-end" onMouseDown={onMouseDown}>
            <FontAwesomeIcon icon={faArrowsAlt} />
          </i>
          <i className="float-end me-2" onClick={onEdit}>
            <FontAwesomeIcon icon={faEdit} />
          </i>
        </Card.Title>
        <Card.Subtitle as="div" className="text-center fst-italic text-muted">
          {data.comment}
        </Card.Subtitle>
      </Card.Header>
      <Card.Body className="p-0">
        <Table bordered size="sm" className="mb-0">
          <tbody>
            {data.attributes.map((e, i) => (
              <Attribute key={i} types={types} data={e} />
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default Entity;
