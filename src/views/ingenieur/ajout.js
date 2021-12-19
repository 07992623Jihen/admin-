import { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import ErrorModel from "../../models/error-model";
import SuccessModel from "../../models/success-model";
import axios from "axios";
import { useParams } from "react-router-dom";

const AjoutIngenieure = (props) => {
  const [nom, setNom] = useState();
  const [prenom, setPrenom] = useState();
  const [email, setEmail] = useState();
  const [tel, setTel] = useState();

  const [error, seterror] = useState(null);
  const [success, setsuccess] = useState(null);

  const onchange = (e) => {
    if (e.target.name === "nom") {
      setNom(e.target.value);
    } else if (e.target.name === "prenom") {
      setPrenom(e.target.value);
    } else if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "tel") {
      setTel(e.target.value);
    }
  };

  const id = useParams().id;

  const submit = async (e) => {
    e.preventDefault();

    console.log(nom, prenom, email, tel);

    try {
      let response = await fetch("http://localhost:5000/api/ingenieur/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nom,
          prenom: prenom,
          email: email,
          tel: tel,
        }),
      });
      let responsedata = await response.json();
      if (!response.ok) {
        throw new Error(responsedata.message);
      }
      setsuccess("ajouter ingenieur");
    } catch (err) {
      console.log(err);
      seterror(err.message || "probleme!!");
    }
  };
  return (
    <div>
      <Container>
        <Row>
          <ErrorModel error={error} />
          <SuccessModel success={success} />
          <Form onSubmit={submit}>
            <Form.Group controlId="formGridAddress2">
              <Form.Label>Nom</Form.Label>
              <Form.Control
                placeholder=""
                name="nom"
                onChange={onchange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formGridAddress2">
              <Form.Label>Prenom</Form.Label>
              <Form.Control
                placeholder=""
                name="prenom"
                onChange={onchange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formGridAddress2">
              <Form.Label>Tel</Form.Label>
              <Form.Control
                placeholder=""
                name="tel"
                onChange={onchange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formGridAddress2">
              <Form.Label>email</Form.Label>
              <Form.Control
                placeholder=""
                name="email"
                onChange={onchange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Ajouter
            </Button>
          </Form>
        </Row>
      </Container>
    </div>
  );
};

export default AjoutIngenieure;
