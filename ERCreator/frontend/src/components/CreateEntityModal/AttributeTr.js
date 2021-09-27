import React from "react";
import Form from "react-bootstrap/Form";

const AttributeTr = ({entities, types}) => {
  return (
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
            entities.map((e, i) => (
              <option key={i} value={e.id}>{e.name}</option>
            ))
          }
        </Form.Select>
      </td>
      <td className="px-0">
        <Form.Control size="sm" placeholder="comment" />
      </td>
    </tr>
  )
}

export default AttributeTr;