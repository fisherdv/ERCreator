import React from "react";
import Pagination from "react-bootstrap/Pagination";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const ModelListCard = ({
  erModels,
  currentModelKey,
  choiseModel,
  onClickCreate,
  pagination,
  onChangePage
}) => {
  return (
    <Card>
      <Card.Header className="d-flex align-items-center justify-content-between">
        <span>Models</span>
        <Button
          variant="link"
          size="sm"
          className="float-end"
          onClick={onClickCreate}
        >
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      </Card.Header>
      <Card.Body className="p-0">
        <ListGroup variant="flush">
          {erModels.map((e, i) => (
            <ListGroup.Item
              action
              active={i === currentModelKey}
              key={i}
              onClick={() => choiseModel(i)}
            >
              {e.name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
      <Card.Footer>
        <Pagination className="mb-0 float-end" size="sm">
          <Pagination.Prev disabled={!pagination.previous} onClick={() => {onChangePage(pagination.current_page-1)}} />
          <Pagination.Item>{pagination.current_page} / {pagination.num_pages}</Pagination.Item>
          <Pagination.Next disabled={!pagination.next} onClick={() => {onChangePage(pagination.current_page+1)}} />
        </Pagination>
      </Card.Footer>
    </Card>
  );
};

export default ModelListCard;
