import React from 'react'
import {connect} from 'react-redux'

const Feedback = () => {
  return (
    <div>
      {/* display other components */}
    </div>
  )
}

const mapState = state => ({
  keywords: state.keywords,
  variables: state.variables,
  userText: state.userText
})

export default connect(mapState)(Feedback)
