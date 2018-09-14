import React from 'react'
import {connect} from 'react-redux'
import {updateText} from '../store/userText'

class Input extends React.Component {
  constructor() {
    super()
    this.state = {
      text: ''
    }
    this.handleChange = this.handleChange.bind(this)
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
      <div id="input">
        <h3>Type in your code below:</h3>
        <textarea value={this.state.text} onChange={this.handleChange} />
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  updateCode: text => dispatch(updateText(text))
})

export default connect(null, mapDispatch)(Input)
