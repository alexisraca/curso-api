import React, { Component, useState } from 'react';
import logo from './logo.svg';
import List from './components/list';
import Resources from './components/resources';
import './App.css';
import axios from 'axios';
import { connect } from 'react-redux'
import SearchForm from './components/SearchForm';
import ResourceContext from './contexts/ResourceContext';
import ResourceLabel from './components/ResourceLabel';

const App = (props) => {

  const [delaySearch, setDelaySearch] = useState(null)

  const buildResourcesRetrieveOnClick = (apiElement) => {
    return (
      (event) => {
        axios.get(`https://swapi.co/api/${apiElement}`)
          .then((response) => {
            props.updateResourcesTypeAndData(
              apiElement,
              response.data.results,
              true
            )
          })
      }
    )
  }

  const onSearch = async (formValues) => {
    delaySearch && clearTimeout(delaySearch)
    const value = formValues.search
    const searchString = value && `?search=${value}`
    setDelaySearch(() => {
      setTimeout(() => {
        axios.get(`https://swapi.co/api/${props.resourcesType}${searchString}`)
          .then((response) => {
            props.updateResourcesTypeAndData(
              props.resourcesType,
              response.data.results,
              props.resourcesEnabled
            )
          })
          .then((response) => { setDelaySearch(() => null) })
      }, 2000)
    })
  }

  return (
    <div className="App">
      <div>
        <List onClickResource={buildResourcesRetrieveOnClick.bind(this)}/>
      </div>
      { 
        props.resourcesEnabled &&
          <div className="resources-row">
            <div className="search-wrapper">
              <ResourceContext.Provider value={props.resourcesType}>
                <ResourceLabel/>
              </ResourceContext.Provider>
              <div>
                { delaySearch && <label>Buscando...</label>}
                <SearchForm onChange={onSearch.bind(this)} onSubmit={onSearch.bind(this)}></SearchForm>
              </div>
            </div>
            <Resources resourcesList={props.resourcesList} searching={delaySearch}/>
          </div>
      }
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    resourcesList: state.otherStore.resourcesList,
    resourcesType: state.otherStore.resourcesType,
    resourcesEnabled: state.otherStore.resourcesEnabled
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
