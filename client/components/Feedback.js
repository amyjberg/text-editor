import React from 'react'
import {connect} from 'react-redux'

const findWordsAndStrings = text => {
  const words = []
  let insideString = false
  let currentWord = ''
  for (let i = 0; i < text.length; i++) {
    // only worrying about single quotes for now
    if (text[i] === "'") {
      // either at beginning or end of string
      insideString = !insideString
      currentWord += text[i]
    } else if (text[i] === ' ' && !insideString) {
      // we are at the end of a word
      words.push(currentWord)
      currentWord = ''
    } else {
      // keep adding characters to the current word
      currentWord += text[i]
    }
  }
  // at end of loop, if we still have a currentWord that hasn't been added
  if (currentWord) {
    words.push(currentWord)
  }
  return words
}

const Feedback = ({keywords, userText}) => {
  const words = findWordsAndStrings(userText)

  function mapWordToSpan(word) {
    if (keywords[word]) {
      // it is a keyword, so we want to give it a span with some color
      const color = keywords[word]
      return <span style={{color}}>{word} </span>
    } else if (word[0] === "'") {
      // we are in a string, so we will highlight it
      return <span style={{color: 'white', backgroundColor: 'green'}}>{word} </span>
    } else {
      return <span>{word} </span>
    }
  }

  return (
    <div id="feedback-container">
      <h3>Your code:</h3>
      <span id="feedback-code">{
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
