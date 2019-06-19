import React, { Component } from 'react';
import logo from './logo.svg';
import List from './components/list';
import Resources from './components/resources';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor() {
    super()
    this.state = {
      resourcesList: []
    }
  }

  buildResourcesRetrieveOnClick(apiElement) {
    return (event) => {
      axios.get(`https://swapi.co/api/${apiElement}`)
        .then((response) => {
          this.setState({
            resourcesList: response.data.results
          })
        })
    }
  }

  render() {
    return (
      <div className="App">
        <div>
          <List onClickResource={this.buildResourcesRetrieveOnClick.bind(this)}/>
        </div>
        { 
          this.state.resourcesList.length && <div>searchbar</div>
        }
        <div className="resources-row">
          <Resources resourcesList={this.state.resourcesList}/>
        </div>
      </div>
    );
  }
}

export default App;
