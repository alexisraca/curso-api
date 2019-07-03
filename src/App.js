import React, { Component } from 'react';
import logo from './logo.svg';
import List from './components/list';
import Resources from './components/resources';
import './App.css';
import axios from 'axios';
import { connect } from 'react-redux'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      delaySearch: null,
    }
  }

  buildResourcesRetrieveOnClick(apiElement) {
    return (event) => {
      axios.get(`https://swapi.co/api/${apiElement}`)
        .then((response) => {
          this.props.updateResourcesTypeAndData(
            apiElement,
            response.data.results,
            true
          )
        })
    }
  }

  onSearch(event) {
    this.state.delaySearch && clearTimeout(this.state.delaySearch)
    const value = event.target.value
    const searchString = value && `?search=${value}`
    this.setState({
      delaySearch:  setTimeout(() => {
        axios.get(`https://swapi.co/api/${this.props.resourcesType}${searchString}`)
          .then((response) => {
            this.props.updateResourcesTypeAndData(
              this.props.resourcesType,
              response.data.results,
              this.props.resourcesEnabled
            )
          })
          .then((response) => { this.setState({ delaySearch: null }) })
      }, 2000)
    })
  }

  render() {
    return (
      <div className="App">
        <div>
          <List onClickResource={this.buildResourcesRetrieveOnClick.bind(this)}/>
        </div>
        { 
          this.props.resourcesEnabled &&
            <div className="resources-row">
              <div className="search-wrapper">
                <div>{ this.state.delaySearch && <label>Buscando...</label>}<input onChange={this.onSearch.bind(this)} /></div>
              </div>
              <Resources resourcesList={this.props.resourcesList} searching={this.state.delaySearch}/>
            </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    resourcesList: state.resourcesList,
    resourcesType: state.resourcesType,
    resourcesEnabled: state.resourcesEnabled
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateResourcesTypeAndData: (type, data, resourcesEnabled) => {
      dispatch({
        type: 'LOAD_ELEMENTS',
        resourcesType: type,
        resourcesList: data,
        resourcesEnabled: resourcesEnabled
      })
    }
  }
}

const connectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)


export default connectedApp;
