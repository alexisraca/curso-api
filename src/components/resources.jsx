import React, { Component } from 'react';
import axios from 'axios';

export default class Resources extends Component {
  constructor(props) {
    super(props)

    this.state = {
      resourcesList: this.props.resourcesList,
      searching: this.props.searching,
      resource: null,
      resourceApiData: null
    }
  }

  onClickResource(resource) {
    return (event) => {
      axios.get(resource.url)
        .then((response) => {

          this.setState({
            resource: resource,
            resourceApiData: response.data
          })
        })
    }
  }

  render() {
    let { resourcesList } = this.props;
    return(
      <div className="resources-wrapper">
        <div className="resources-column">
          {
            resourcesList.map((resource, index) => {
              return <button key={index} className="api-button" onClick={this.onClickResource(resource)}>{resource.title || resource.name}</button>
            })
          }
        </div>

        

        <div className="resource-viewport-column">
          <code>{(this.state.resourceApiData && JSON.stringify(this.state.resourceApiData) || "Click arriba")}</code>
        </div>
      </div>
    )
  }
}