import React from 'react'
import {connect} from 'react-redux'
import {updateText} from '../store/userText'
import {Suggestion} from './index'

const inOpenString = text => {
  const allQuotes = []
  for (let i = 0; i < text.length; i++) {
    if (text[i] === "'") allQuotes.push(text[i])
  }
  // if we are in an open string, the length of allQuotes will be odd
  return !!(allQuotes.length % 2 === 1)
}

const getSuggestions = (keywords, variables, text) => {
  if (inOpenString(text)) return [] // if we're in an open string, don't make suggestions

  const keywordNames = Object.keys(keywords)
  const variableNames = Object.keys(variables)
  // how to deal with obj.foo2.foo3?
  // convert objects in variables to the format obj.foo1, obj.foo2? then store them in an array?
  // but we don't want all the suggestions to pop up right away -- only if they've typed obj do we see the rest of the suggestions
  const allTerms = [...keywordNames, ...variableNames]

  // for now, just base it off of the last word in the text
  const words = text.split(' ')
  const lastWord = words[words.length - 1] // maybe check here to see if there is a period, and if there is, check for the objects that have properties?
  if (!lastWord) return [] // so we don't give suggestions if they haven't started typing out a new word yet

  const suggestions = []

  for (let i = 0; i < allTerms.length; i++) {
    if (allTerms[i].indexOf(lastWord) !== -1) {
      // this is a potential match
      suggestions.push(allTerms[i])
    }
  }

  return suggestions
}


class Input extends React.Component {
  constructor() {
    super()
    this.state = {
      text: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.renderSuggestions = this.renderSuggestions.bind(this)
    this.selectSuggestion = this.selectSuggestion.bind(this)
  }

  selectSuggestion(suggestion) {
    const {text} = this.state
    const lastSpaceIndex = text.lastIndexOf(' ')
    const newText = text.slice(0, lastSpaceIndex + 1) + suggestion

    this.setState({
      text: newText
    })

    this.props.updateCode(newText)
  }

  renderSuggestions() {
    // should renderSuggestions try to figure out if we're inside a string or not?
    // then if we are inside a string, this function can return an empty array?
    const suggestions = getSuggestions(this.props.keywords, this.props.variables, this.state.text)
    return <div>
      {
        suggestions.map(suggestion => <Suggestion suggestion={suggestion} selectSuggestion={this.selectSuggestion}/>)
      }
    </div>
  }

  handleChange(evt) {
    // when user types in the textarea input
    // we want to update the redux store
    // do we need local state at all?
    this.setState({
      text: evt.target.value
    })

    this.props.updateCode(evt.target.value)
  }

  render() {
    return (
      <div id="input-container">
        <h3>Type in the box below:</h3>
        <textarea
          id="input-text"
          value={this.state.text}
          onChange={this.handleChange}

          />
        <h3>Suggestions:</h3>
        { this.renderSuggestions() }
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  updateCode: text => dispatch(updateText(text))
})

const mapState = state => ({
  keywords: state.keywords,
  variables: state.variables
})

export default connect(mapState, mapDispatch)(Input)