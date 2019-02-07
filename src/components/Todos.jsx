import React, { Component } from "react";
import db from "../firestore";
import { Table, Button, Row, Col, InputGroup, Input, Fade } from "reactstrap";

export default class Todos extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      inputValue: "",
      edit: false,
      id: "",
      fadein: false,
      message: ""
    };
  }

  componentDidMount() {
    db.collection("todos").onSnapshot(snapShots => {
      this.setState({
        items: snapShots.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      });
    });
  }

  changeValue = e => {
    this.setState({
      inputValue: e.target.value
    });
  };

  agregar = () => {
    const { inputValue } = this.state;
    db.collection("todos")
      .add({
        item: inputValue
      })
      .then(() => {
        this.message("Agregado");
      })
      .catch(error => {
        this.message(error);
      });
  };

  getTodo = id => {
    let docRef = db.collection("todos").doc(id);

    docRef
      .get()
      .then(doc => {
        if (doc.exists) {
          this.setState({
            inputValue: doc.data().item,
            edit: true,
            id: doc.id
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  update = () => {
    const { id, inputValue } = this.state;

    db.collection("todos")
      .doc(id)
      .update({
        item: inputValue
      })
      .then(() => {
        this.message("Editado");
      })
      .catch(error => {
        this.message(error);
      });

    this.setState({
      edit: false
    });
  };

  delete = id => {
    db.collection("todos")
      .doc(id)
      .delete();
  };

  message = message => {
    this.setState({
      fadein: true,
      message
    });

    setTimeout(() => {
      this.setState({
        fadein: false,
        message: "",
        inputValue: ""
      });
    }, 3000);
  };

  render() {
    const { items, inputValue } = this.state;
    return (
      <div>
        <Row>
          <Col xs="10">
            <InputGroup>
              <Input
                placeholder="Agregar un nuevo item"
                value={inputValue}
                onChange={this.changeValue}
              />
            </InputGroup>
          </Col>
          <Col xs="2">
            <div className="text-right">
              {this.state.edit ? (
                <Button color="info" onClick={this.update}>
                  Editar
                </Button>
              ) : (
                <Button color="info" onClick={this.agregar}>
                  Agregar
                </Button>
              )}
            </div>
          </Col>
        </Row>

        <Fade
          in={this.state.fadein}
          tag="h6"
          className="mt-3 text-center text-success"
        >
          {this.state.message}
        </Fade>

        <Table hover className="text-center">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, key) => (
              <tr key={key}>
                <td>{item.item}</td>
                <td>
                  <Button color="warning" onClick={() => this.getTodo(item.id)}>
                    Editar
                  </Button>
                </td>
                <td>
                  <Button color="danger" onClick={() => this.delete(item.id)}>
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
