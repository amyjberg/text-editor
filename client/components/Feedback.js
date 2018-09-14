import React from 'react'
import {connect} from 'react-redux'

const Feedback = ({keywords, userText}) => {
  const words = userText.split(' ')

  function mapWordToSpan(word) {
    if (keywords[word]) {
      // it is a keyword, so we want to give it a span with some color
      const color = keywords[word]
      return <span style={{color}}>{word} </span>
    } else {
      return <span>{word} </span>
    }
  }

  return (
    <div id="feedback">
      <h3>Your code:</h3>
      <span>{
        words.map(word => mapWordToSpan(word))
      }</span>
    </div>
  )
}

const mapState = state => ({
  keywords: state.keywords,
  userText: state.userText
})

export default connect(mapState)(Feedback)
