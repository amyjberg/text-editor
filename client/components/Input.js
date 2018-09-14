import React from 'react'
import {connect} from 'react-redux'
import updateText from '../store/userText'

class Input extends React.Component {
  constructor() {
    super()
    this.state = {
      text: ''
    }
  }



  render() {
    return (
      <div>
        {/* display other components */}
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  updateCode: text => dispatch(updateText(text))
})

export default connect(null, mapDispatch)(Input)
