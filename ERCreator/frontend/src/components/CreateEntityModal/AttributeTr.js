import React from "react";
import Form from "react-bootstrap/Form";

const AttributeTr = ({ entities, types, attribute, onChange }) => {
  return (
    <tr>
      <td className="px-0">
        <Form.Control
          name="name"
          value={attribute.name}
          onChange={onChange}
          size="sm"
          placeholder="name"
        />
      </td>
      <td>
        <Form.Select
          name="type"
          value={attribute.type}
          onChange={onChange}
          size="sm"
        >
          <option></option>
          {Object.keys(types).map((e) => (
            <option value={types[e].id}>{types[e].name}</option>
          ))}
        </Form.Select>
      </td>
      <td className="px-0">
        <Form.Control
          name="size"
          value={attribute.size}
          onChange={onChange}
          type="number"
          size="sm"
          placeholder="size"
        />
      </td>
      <td className="px-0">
        <Form.Control
          name="default"
          value={attribute.default}
          onChange={onChange}
          size="sm"
          placeholder="default"
        />
      </td>
      <td>
        <Form.Check
          name="is_primary_key"
          checked={attribute.is_primary_key}
          onChange={onChange}
          type="checkbox"          
        />
      </td>
      <td>
        <Form.Check
          name="is_unique"
          checked={attribute.is_unique}
          onChange={onChange}
          type="checkbox"          
        />
      </td>
      <td>
        <Form.Check
          name="is_nullable"
          checked={attribute.is_nullable}
          onChange={onChange}
          type="checkbox"               
        />
      </td>
      <td>
        <Form.Check
          name="is_index"
          checked={attribute.is_index}
          onChange={onChange}
          type="checkbox"         
        />
      </td>
      <td>
        <Form.Select
          name="foreign_key"
          value={attribute.foreign_key}
          onChange={onChange}
          size="sm"
        >
          <option></option>
          {entities.map((e, i) => (
            <option key={i} value={e.id}>
              {e.name}
            </option>
          ))}
        </Form.Select>
      </td>
      <td className="px-0">
        <Form.Control
          name="comment"
          value={attribute.comment}
          onChange={onChange}
          size="sm"
          placeholder="comment"
        />
      </td>
    </tr>
  );
};

export default AttributeTr;
