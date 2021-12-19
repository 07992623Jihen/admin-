import { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import ErrorModel from "../../models/error-model";
import SuccessModel from "../../models/success-model";
import axios from "axios";
import { useParams } from "react-router-dom";

const UpdateIngenieure = (props) => {
  const [nom, setNom] = useState();
  const [email, setEmail] = useState();
  const [tel, setTel] = useState();

  const [error, seterror] = useState(null);
  const [success, setsuccess] = useState(null);

  const onchange = (e) => {
    if (e.target.name === "nom") {
      setNom(e.target.value);
    } else if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "tel") {
      setTel(e.target.value);
    }
  };

  const id = useParams().id;

  const submit = async (e) => {
    e.preventDefault();

    try {
      let response = await fetch(`http://localhost:5000/api/ingenieur/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nom,
          email: email,
          tel: tel,
        }),
      });
      let responsedata = await response.json();
      if (!response.ok) {
        throw new Error(responsedata.message);
      }
      setsuccess("Ingénieure modifié");
    } catch (err) {
      console.log(err);
      seterror(err.message || "probleme!!");
    }
  };

  const [list, setList] = useState();

  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/ingenieur/${id}`
        );

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setList(responseData.ingenieur);
        setNom(responseData.ingenieur.name);
        setEmail(responseData.ingenieur.email);
        setTel(responseData.ingenieur.tel);
      } catch (err) {
        seterror(err.message);
      }
    };

    sendRequest();
  }, []);
  return (
    <div>
      <Container>
        <Row>
          <Col></Col>
          <Col xs={9}>
            <ErrorModel error={error} />
            <SuccessModel success={success} />
            <Form onSubmit={submit}>
              <Form.Group controlId="formGridAddress2">
                <Form.Label>Nom</Form.Label>
                <Form.Control
                  value={nom}
                  placeholder=""
                  name="nom"
                  onChange={onchange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formGridAddress2">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  value={email}
                  placeholder=""
                  name="email"
                  onChange={onchange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formGridAddress2">
                <Form.Label>Téléphone</Form.Label>
                <Form.Control
                  value={tel}
                  placeholder=""
                  name="tel"
                  onChange={onchange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Modifier
              </Button>
            </Form>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
};

export default UpdateIngenieure;
