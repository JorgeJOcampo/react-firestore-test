import React, { Component } from 'react'
import db from '../firestore';
import { Table, Button, Row, Col, InputGroup, Input } from 'reactstrap'

export default class Todos extends Component {

  constructor(){
    super();
    this.state = {
      items : [],
      inputValue: ''
    }
  }

  componentDidMount(){
    db.collection('todos').onSnapshot((snapShots) => {
        this.setState({
          items: snapShots.docs.map(
            doc => ({id: doc.id, ...doc.data()})
          )
        })
      })
  }

  changeValue = (e) => {
    this.setState({
      inputValue:e.target.value
    })
  }

  agregar = () => {
    const {inputValue} = this.state;
    db.collection('todos').add({
      item: inputValue
    }).then(() => {
      console.log('Agregado');
    }).catch((error) => {
      console.log(error);
    })
  }

  render() {
    const {items, inputValue} = this.state;
    return (
      <div>
        <Row>
          <Col xs="10">
            <InputGroup>
              <Input 
                placeholder="Agregar un nuevo item"
                value={inputValue}
                onChange={this.changeValue}/>
            </InputGroup>
          </Col>
          <Col xs="2">
            <div className="text-right">
              <Button color="info" onClick={this.agregar}>
                Agregar
              </Button>
            </div>
          </Col>
        </Row>
        
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
                <td><Button color="warning">Editar</Button></td>
                <td><Button color="danger">Eliminar</Button></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    )
  }
}
