import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import AttributeTr from "./AttributeTr";

const AttributesTable = ({ entities, types, attributes, onChange }) => {
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
        {attributes.map((e, i) => (
          <AttributeTr key={i} entities={entities} types={types} attribute={e} onChange={(e) => {onChange(e, i)}}/>
        ))}
        <tr>
          <td colSpan="10" className="px-0">
            <Button name="addAtribute" size="sm" onClick={onChange}>
              add
            </Button>
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

export default AttributesTable;
