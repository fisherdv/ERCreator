import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { updateERModels, createERModels } from "../api/erModels";

const defaultErModel = {
  name: "",
  comment: "",
  entities: [],
};

const ModelDetailCard = ({ model, onSave, onClickCancel }) => {
  const [editModel, setEditModel] = useState(defaultErModel);

  useEffect(() => {
    if (model !== null) {
      setEditModel({ ...model });
    }
  }, [model]);

  const saveModel = (event) => {
    event.preventDefault();
    const func = model !== null ? updateERModels : createERModels;
    func(editModel)
      .then((response) => {
        setEditModel({ ...response.data });
        onSave(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Form onSubmit={saveModel}>
      <Card>
        <Card.Header className="d-flex align-items-center justify-content-between">
          <Form.Control
            size="sm"
            type="text"
            placeholder="name"
            required
            value={editModel.name}
            onChange={(e) => {
              setEditModel({ ...editModel, name: e.target.value });
            }}
          />
          <div className="d-flex ms-3">
            <Button size="sm" variant="light" onClick={onClickCancel}>
              cancel
            </Button>
            <Button size="sm" variant="success" className="ms-1" type="submit">
              save
            </Button>
          </div>
        </Card.Header>
        <Card.Body>
          <Card.Subtitle className="text-muted">Description</Card.Subtitle>
          <Card.Text>
            <Form.Control
              as="textarea"
              className="mt-1"
              rows={5}
              value={editModel.comment}
              onChange={(e) => {
                setEditModel({ ...editModel, comment: e.target.value });
              }}
            />
          </Card.Text>
        </Card.Body>
      </Card>
    </Form>
  );
};

export default ModelDetailCard;
