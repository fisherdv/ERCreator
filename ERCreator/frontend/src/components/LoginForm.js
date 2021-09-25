import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { signIn } from "../api/auth";
import { setTokens } from "../localStorage";
import { useHistory, useLocation } from "react-router-dom";
import { setToken as apiSetToken } from "../api/instance";

const defaultErrors = {
  username: [],
  password: [],
  detail: "",
};

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(defaultErrors);

  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const login = (event) => {
    event.preventDefault();
    signIn(username, password)
      .then((response) => {
        apiSetToken(response.data.access);
        setTokens(response.data.access, response.data.refresh);
        history.replace(from);
      })
      .catch((error) => {
        setErrors({ ...defaultErrors, ...error.response.data });
      });
  };

  return (
    <Form onSubmit={login}>
      <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <ul className="m-0">
          {errors.username.map((v, i) => (
            <li key={i}>
              <Form.Text className="text-danger">{v}</Form.Text>
            </li>
          ))}
        </ul>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <ul className="m-0">
          {errors.password.map((v, i) => (
            <li key={i}>
              <Form.Text className="text-danger">{v}</Form.Text>
            </li>
          ))}
        </ul>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Text className="text-danger">{errors.detail}</Form.Text>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default LoginForm;
