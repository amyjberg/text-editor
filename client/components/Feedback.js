import React from 'react'
import {connect} from 'react-redux'

const Feedback = ({keywords, variables, userText}) => {
  const words = userText.split(' ')

  function mapWordToSpan(word) {
    if (keywords[word]) {
      // it is a keyword, so we want to give it a span with some color
    } else {
      return <span>{word} </span>
    }
  }

  return (
    <div id="feedback">
      <h3>Your code:</h3>
      <span>{userText}</span>
    </div>
  )
}

const mapState = state => ({
  keywords: state.keywords,
  variables: state.variables,
  userText: state.userText
})

export default connect(mapState)(Feedback)
