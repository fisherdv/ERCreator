import React, { Fragment, useEffect, useState } from "react";
import { getERModels } from "../api/erModels";
import Header from "../components/Header";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ModelListCard from "../components/ModelListCard";
import ModelDetailCard from "../components/ModelDetailCard";

const defaultCurrentModel = {
  key: null,
  name: "",
  comment: "",
};

const HomePage = () => {
  const [erModels, setErModels] = useState([]);
  const [currentModel, setCurrentModel] = useState(defaultCurrentModel);

  useEffect(() => {
    getERModels()
      .then((response) => {
        console.log(response.data);
        setErModels(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const choiseModel = (index) => {
    setCurrentModel({ key: index, ...erModels[index] });
  };

  return (
    <Fragment>
      <Header />
      <Container className="mt-5">
        <Row className="gx-1 gy-2 gy-sm-0">
          <Col sm="2">
            <ModelListCard
              erModels={erModels}
              currentModel={currentModel}
              choiseModel={choiseModel}
            />
          </Col>
          <Col sm="10">
            <ModelDetailCard model={currentModel} />
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default HomePage;
