import React, { Component } from 'react'
import db from '../firestore';

export default class Todos extends Component {

  componentDidMount(){
    db.collection('todos').get()
      .then((snapShots) => {
        this.setState({
          items:snapShots.docs.map( doc => {
            return {id: doc.id, ...doc.data()}
          })
        })
      })
  }

  render() {
    return (
      <div>
        
      </div>
    )
  }
}
