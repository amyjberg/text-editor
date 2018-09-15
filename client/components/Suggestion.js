import React from 'react'

const Suggestion = ({suggestion, selectSuggestion}) => {
  // we want props to have the suggestion included and the listener for updating this.state.text of Input
  return (
    <div onClick={() => selectSuggestion(suggestion)}>{suggestion}</div>
  )

}

export default Suggestion
