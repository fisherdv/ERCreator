import React, { Fragment } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

const ModelDetailCard = ({ model, onClickEdit }) => {
  return (
    <Card>
      {model === null ? (
        <Card.Header className="d-flex align-items-center justify-content-between">
          Model not selected
        </Card.Header>
      ) : (
        <Fragment>
          <Card.Header className="d-flex align-items-center justify-content-between">
            <Card.Title className="mb-0">{model.name}</Card.Title>
            <div>
              <Button size="sm" onClick={onClickEdit}>
                edit
              </Button>
              <Link
                className="ms-1 btn btn-sm btn-primary"
                to={`/designer/${model.id}`}
              >
                designer
              </Link>
            </div>
          </Card.Header>
          <Card.Body>
            <Card.Subtitle className="text-muted">Description</Card.Subtitle>
            <Card.Text>{model.comment}</Card.Text>
          </Card.Body>
        </Fragment>
      )}
    </Card>
  );
};

export default ModelDetailCard;
