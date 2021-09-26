import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faLink, faInfo } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { faUmbraco } from "@fortawesome/free-brands-svg-icons";

const Attribute = ({ data, types }) => {
  return (
    <>
      {data.comment ? (
        <tr className="comment">
          <td colSpan="4" className="text-muted fst-italic text-end py-0">
            {data.comment}
          </td>
        </tr>
      ) : null}

      <tr>
        <td>
          <div className="d-flex align-items-center justify-content-start">
            {data.is_primary_key ? (
              <i className="pe-1">
                <FontAwesomeIcon icon={faKey} size="xs" fixedWidtd />
              </i>
            ) : null}
            {data.foreign_key ? (
              <i className="pe-1">
                <FontAwesomeIcon icon={faLink} size="xs" fixedWidtd />
              </i>
            ) : null}
            {data.is_nullable ? (
              <i className="pe-1">
                <FontAwesomeIcon icon={faCircle} size="xs" fixedWidtd />
              </i>
            ) : null}
            {data.is_index ? (
              <i className="pe-1">
                <FontAwesomeIcon icon={faInfo} size="xs" fixedWidtd />
              </i>
            ) : null}
            {data.is_unique ? (
              <i className="pe-1">
                <FontAwesomeIcon icon={faUmbraco} size="xs" fixedWidtd />
              </i>
            ) : null}
          </div>
        </td>
        <td>{data.name}</td>
        <td>
          {types[data.type].name} 
          {data.size ? ` (${data.size})` : null}          
        </td>
        <td className="fst-italic fw-lighter">{data.default}</td>
      </tr>
    </>
  );
};

export default Attribute;
