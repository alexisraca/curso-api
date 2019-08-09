import React from 'react';
import { Field, reduxForm } from 'redux-form';

let SearchForm = props => {
  const { handleSubmit } = props
  return (
    <h3>
      <form onSubmit={handleSubmit}>
        <Field name="search" component="input" type="text" />
      </form>
    </h3>
  )
}

export default SearchForm = reduxForm({
  // a unique name for the form
  form: 'contact'
})(SearchForm)