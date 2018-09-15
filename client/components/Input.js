import React from 'react'
import {connect} from 'react-redux'
import {updateText} from '../store/userText'
import {Suggestion} from './index'
import { getSuggestions, getLastWord } from '../helpers'

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
    const lastWord = getLastWord(text)
    let indexCutoff;
    if (lastWord.indexOf('.') !== -1) {
      // we don't want to go all the way back to the space to replace, we just want to go back to the period
      indexCutoff = text.lastIndexOf('.')
    } else {
      // we want to replace at the start of the word, i.e. the space
      indexCutoff = text.lastIndexOf(' ')
    }

    const newText = text.slice(0, indexCutoff + 1) + suggestion

    this.setState({
      text: newText
    })

    this.props.updateCode(newText)
  }

  renderSuggestions() {
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
