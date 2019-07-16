import React from 'react';

let defaultState = {
  resourcesList: [],
  resourceType: "",
  resourcesEnabled: false
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'LOAD_ELEMENTS':
      return Object.assign({}, state, {
        resourcesList: action.resourcesList,
        resourcesType: action.resourcesType,
        resourcesEnabled: action.resourcesEnabled
      })
    case 'SET_ELEMENT_TYPE':
      return Object.assign({}, state, {
        resourcesType: action.resourcesType
      })
    default:
      return state
  }
}