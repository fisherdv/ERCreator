import React, { Fragment, useEffect, useState } from "react";
import { getERModels } from "../api/erModels";
import Header from "../components/Header";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ModelListCard from "../components/ModelListCard";
import ModelDetailCard from "../components/ModelDetailCard";
import ModelEditCard from "../components/ModelEditCard";
import { createERModels } from "../api/erModels";

const defaultErModel = {
  name: "",
  comment: "",
  entities: [],
};

const HomePage = () => {
  const [erModels, setErModels] = useState([]);
  const [currentModelKey, setCurrentModelKey] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    getERModels()
      .then((response) => {
        setErModels(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const choiseModel = (index) => {
    setIsEdit(false);
    setCurrentModelKey(index);
  };

  const onEditModel = (data) => {
    setIsEdit(false);
    let newErModels = [...erModels];
    if (currentModelKey !== null) {
      newErModels[currentModelKey] = data;
    } else {
      newErModels.push(data);
    }
    setErModels(newErModels);
  };

  const createModel = () => {
    setIsEdit(true);
    setCurrentModelKey(null);
  };

  return (
    <Fragment>
      <Header />
      <Container className="mt-5">
        <Row className="gx-1 gy-2 gy-sm-0">
          <Col sm="4" lg="2">
            <ModelListCard
              erModels={erModels}
              currentModelKey={currentModelKey}
              choiseModel={choiseModel}
              onClickCreate={createModel}
            />
          </Col>

          <Col sm="8" lg="10">
            {isEdit ? (
              <ModelEditCard
                model={
                  currentModelKey !== null ? erModels[currentModelKey] : null
                }
                onSave={onEditModel}
                onClickCancel={() => {
                  setIsEdit(false);
                }}
              />
            ) : (
              <ModelDetailCard
                model={
                  currentModelKey !== null ? erModels[currentModelKey] : null
                }
                onClickEdit={() => {
                  setIsEdit(true);
                }}
              />
            )}
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default HomePage;
