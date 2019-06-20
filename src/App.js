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
      resourcesList: [],
      resourcesEnabled: false,
      resourceType: "",
      delaySearch: null
    }
  }

  buildResourcesRetrieveOnClick(apiElement) {
    return (event) => {
      axios.get(`https://swapi.co/api/${apiElement}`)
        .then((response) => {
          this.setState({
            resourcesList: response.data.results,
            resourceType: apiElement,
            resourcesEnabled: true
          })
        })
    }
  }

  onSearch(event) {
    this.state.timeout && clearTimeout(this.state.resourcesList)
    const value = event.target.value
    const searchString = value && `?search=${value}`
    this.setState({
      delaySearch:  setTimeout(() => {
        axios.get(`https://swapi.co/api/${this.state.resourceType}${searchString}`)
          .then((response) => {
            this.setState({
              resourcesList: response.data.results,
              delaySearch: null
            })
          })
      }, 2000)
    })
  }

  render() {
    return (
      <div className="App">
        <div>
          <List onClickResource={this.buildResourcesRetrieveOnClick.bind(this)}/>
        </div>
        <div className="search-wrapper">
        { 
          (this.state.resourcesEnabled || "") && <div><input onChange={this.onSearch.bind(this)}/></div>
        }
        </div>
        <div className="resources-row">
          <Resources resourcesList={this.state.resourcesList} searching={this.state.delaySearch}/>
        </div>
      </div>
    );
  }
}

export default App;
