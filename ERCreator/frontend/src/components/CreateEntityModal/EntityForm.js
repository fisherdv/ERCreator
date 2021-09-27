import React from "react";
import Form from "react-bootstrap/Form";

const EntityForm = ({data, onChange}) => {
  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control name="name" value={data.name} onChange={onChange} size="sm" placeholder="Name" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Comment</Form.Label>
        <Form.Control
          as="textarea"
          name="comment"
          rows={3}
          size="sm"
          placeholder="Comment"
          value={data.comment}
          onChange={onChange}
        />
      </Form.Group>
    </Form>
  )
}

export default EntityForm;