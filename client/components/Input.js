import React from 'react'
import {connect} from 'react-redux'
import {updateText} from '../store/userText'

const getSuggestions = (keywords, variables, text) => {
    // look at last word and generate list of keywords that match it
  // we shouldn't make suggestions if we're inside of a string, though...

  const keywordNames = Object.keys(keywords)
  const variableNames = Object.keys(variables)
  // how to deal with obj.foo2.foo3?
  // convert objects in variables to the format obj.foo1, obj.foo2.foo3 recursively? then store them in an array?
  // but we don't want all the suggestions to pop up right away -- only if they've typed obj do we see the rest of the suggestions
  const allTerms = [...keywordNames, ...variableNames]

  // for now, just base it off of the last word in the text
  const words = text.split('')
  const lastWord = words[words.length - 1]
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
  }

  renderSuggestions() {
    const suggestions = getSuggestions(this.props.keywords, this.props.variables, this.state.text)
    return <div>
      {
        suggestions.map(suggestion => <div>{suggestion}</div>)
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
    // we also want to find suggestions, right?
    // right now this happens to late
    // this.getSuggestions()
  }

  render() {
    return (
      <div id="input">
        <h3>Type in your code below:</h3>
        <textarea value={this.state.text} onChange={this.handleChange} />
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
