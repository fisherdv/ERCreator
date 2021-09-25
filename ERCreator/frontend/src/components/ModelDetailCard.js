import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const ModelDetailCard = ({ model }) => {
  return (
    <Card>
      <Card.Header className="d-flex align-items-center justify-content-between">
        <Card.Title className="mb-0">{model.name}</Card.Title>
        <div>
          <Button size="sm">edit</Button>
          <Button size="sm" className="ms-1">
            designer
          </Button>
        </div>
      </Card.Header>
      <Card.Body>
        <Card.Subtitle className="text-muted">Description</Card.Subtitle>
        <Card.Text>{model.comment}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ModelDetailCard;
