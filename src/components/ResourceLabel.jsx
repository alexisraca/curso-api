import React from 'react';
import ResourceContext from './../contexts/ResourceContext';

export default () => {
  return(
    <ResourceContext.Consumer>
      {(value=> {
          return(
            <div><h3>{value}</h3></div>
          )
        }
      )}
    </ResourceContext.Consumer>
  )
}