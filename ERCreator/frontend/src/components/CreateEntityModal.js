import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";

function CreateEntityModal({ show, onHide, types, entities }) {   

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
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control size="sm" placeholder="Name" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                size="sm"
                placeholder="Comment"
              />
            </Form.Group>
          </Tab>
          <Tab className="px-3" eventKey="attributes" title="Attributes">
            <Table striped hover>
              <thead>
                <tr>
                  <th>name</th>
                  <th>type</th>
                  <th>size</th>
                  <th>default</th>
                  <th>primary_key</th>
                  <th>unique</th>
                  <th>nullable</th>
                  <th>index</th>
                  <th>foreignKey</th>
                  <th>comment</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-0">
                    <Form.Control size="sm" placeholder="name" />
                  </td>
                  <td>
                    <Form.Select size="sm">
                      {Object.keys(types).map((e) => (
                        <option value={types[e].id}>{types[e].name}</option>
                      ))}
                    </Form.Select>
                  </td>
                  <td className="px-0">
                    <Form.Control type="number" size="sm" placeholder="size" />
                  </td>
                  <td className="px-0">
                    <Form.Control size="sm" placeholder="default" />
                  </td>
                  <td>
                    <Form.Check type="checkbox" />
                  </td>
                  <td>
                    <Form.Check type="checkbox" />
                  </td>
                  <td>
                    <Form.Check type="checkbox" />
                  </td>
                  <td>
                    <Form.Check type="checkbox" />
                  </td>
                  <td>
                    <Form.Select size="sm">
                      <option></option>
                      {
                        entities.map(e => (
                          <option value={e.id}>{e.name}</option>
                        ))
                      }                      
                    </Form.Select>
                  </td>
                  <td className="px-0">
                    <Form.Control size="sm" placeholder="comment" />
                  </td>
                </tr>
                <tr>
                  <td colSpan="10" className="px-0">
                      <Button size="sm">add</Button>
                  </td>                  
                </tr>               
              </tbody>
            </Table>
          </Tab>
        </Tabs>
      </Modal.Body>
      <Modal.Footer className="py-0">
        <Button size="sm" onClick={onHide}>
          Close
        </Button>
        <Button size="sm" variant="success" onClick={onHide}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateEntityModal;
