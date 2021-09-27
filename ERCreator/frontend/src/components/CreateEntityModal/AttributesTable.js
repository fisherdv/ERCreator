import React, { useEffect, useState } from "react"
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import AttributeTr from "./AttributeTr";

const defaultAttribute = {
  name: "",
  default: "",
  comment: "",
  id: null,
  size: null,
  is_primary_key: null,
  is_unique: null,
  is_nullable: null,
  is_index: null,
  foreign_key: null,
  entity: null,
  type: null,
}

const AttributesTable = ({ entities, types }) => {
  const [editAttributets, setEditAttributets] = useState([])

  const pushNewAttribute = () => {
    setEditAttributets([...editAttributets, { ...defaultAttribute }]);
  }

  return (
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
        {editAttributets.map((e, i) => (
          <AttributeTr key={i} entities={entities} types={types} />
        ))}
        <tr>
          <td colSpan="10" className="px-0">
            <Button size="sm" onClick={pushNewAttribute} >add</Button>
          </td>
        </tr>
      </tbody>
    </Table>
  )
}


export default AttributesTable;