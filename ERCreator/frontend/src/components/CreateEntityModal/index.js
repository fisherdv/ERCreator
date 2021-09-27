import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import AttributesTable from "./AttributesTable";
import EntityForm from "./EntityForm";
import { indentHeader } from "../../config";
import { createEntity } from "../../api/entity";
import { useParams } from "react-router";

const defaultEntity = {
  name: "",
  comment: "",
  positionX: 0,
  positionY: indentHeader,
  attributes: []
}

function CreateEntityModal({ show, onHide, types, entities, onSave }) {
  const [entity, setEntity] = useState(defaultEntity);
  const { id } = useParams();

  const changeEntityHandler = (e) => {
    setEntity({
      ...entity,
      [e.target.name]: e.target.value
    })
  }

  const onSaveClick = () => {
    createEntity({...entity, er_model_id: id}).then(response => {
      console.log(response.data);
      onSave(response.data);
    }).catch(error => {
      console.log(error);
    })
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header
        className="py-0 mb-1 border-0 bg-dark justify-content-center"
        id="contained-modal-title-vcenter"
      >
        <Modal.Title as="div" className="text-light">
          Create table
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-0">
        <Tabs
          defaultActiveKey="table"
          transition={false}
          id="noanim-tab-example"
          className="px-3"
        >
          <Tab className="px-3 mt-3" eventKey="table" title="Table">
            <EntityForm data={entity} onChange={changeEntityHandler} />
          </Tab>
          <Tab className="px-3" eventKey="attributes" title="Attributes">
            <AttributesTable entities={entities} types={types} />
          </Tab>
        </Tabs>
      </Modal.Body>
      <Modal.Footer className="py-0">
        <Button size="sm" onClick={onHide}>
          Close
        </Button>
        <Button size="sm" variant="success" onClick={onSaveClick}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateEntityModal;
