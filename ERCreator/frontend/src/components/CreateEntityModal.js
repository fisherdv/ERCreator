import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";

function CreateEntityModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
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
            <Table striped  hover>
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
          </Tab>
        </Tabs>
      </Modal.Body>
      <Modal.Footer className="py-0">
        <Button size="sm" onClick={props.onHide}>
          Close
        </Button>
        <Button size="sm" variant="success" onClick={props.onHide}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateEntityModal;
