import React, { Component } from 'react';


export default class List extends Component {
  render() {
    const { onClickResource } = this.props

    return(
      <div className="buttons-wrapper">
        <button className="api-button" onClick={onClickResource("planets")}>Planets</button>
        <button className="api-button" onClick={onClickResource("starships")}>Starships</button>
        <button className="api-button" onClick={onClickResource("vehicles")}>Vehicles</button>
        <button className="api-button" onClick={onClickResource("people")}>People</button>
        <button className="api-button" onClick={onClickResource("films")}>Films</button>
        <button className="api-button" onClick={onClickResource("species")}>Species</button>
      </div>
    )
  }
}
