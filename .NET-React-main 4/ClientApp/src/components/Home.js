import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;
  state = {
      people:[]
  }

  componentDidMount = () => {
      fetch('/people')
        .then(response => response.json())
        .then(data => {
            this.setState({
                people:data
            })
        });
  }

  createPerson = (event) => {
      event.preventDefault();
      fetch(
          '/people',
          {
              method:'POST',
              headers: {
                  'Accept': 'application/json; charset=utf-8',
                  'Content-Type': 'application/json;charset=UTF-8'
              },
              body: JSON.stringify({
                  Name:this.state.newPersonName,
                  Age:this.state.newPersonAge
              })
          }
      )
      .then(response => response.json())
      .then(
          (data) => {
              this.setState({
                  people:data
              })
          }
      )
  }

  deletePerson = (event) => {
      fetch(
          '/people/' + event.target.value,
          {
              method:'DELETE'
          }
      )
      .then(response => response.json())
      .then(
          (data) => {
              this.setState({
                  people:data
              })
          }
      )
  }


  changeNewPersonAge = (event) => {
      this.setState({
          newPersonAge:event.target.value
      });
  }

  changeNewPersonName = (event) => {
      this.setState({
          newPersonName:event.target.value
      });
  }

  render = () => {
      return <div>
          <h2>Create Person</h2>
          <form onSubmit={this.createPerson}>
              <input onKeyUp={this.changeNewPersonName} type="text" placeholder="name" /><br/>
              <input onKeyUp={this.changeNewPersonAge} type="number" placeholder="age" /><br/>
              <input type="submit" value="Create Person" />
          </form>
          <h2>List of People</h2>
          <ul>
              {
                  this.state.people.map(
                      (person, index) => {
                          return <li key={index}>

                              {person.name}: {person.age}

                              <button value={person.personId} onClick={this.deletePerson}>DELETE</button>

                              <form id={person.personId} onSubmit={this.updatePerson}>
                                  <input onKeyUp={this.changeUpdatePersonName} type="text" placeholder="name"/><br/>
                                  <input onKeyUp={this.changeUpdatePersonAge} type="number" placeholder="age"/><br/>
                                  <input type="submit" value="Update Person"/>
                              </form>
                          </li>
                      }
                  )
              }
          </ul>
      </div>
  }
}
