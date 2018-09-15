import React from 'react'

const Suggestion = ({suggestion, selectSuggestion}) => {
  return (
    <div
      onClick={() => selectSuggestion(suggestion)}
      className="suggestion"
    >
      {suggestion}
    </div>
  )
}

export default Suggestion
