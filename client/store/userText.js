
/**
 * ACTION TYPES
 */

const UPDATED_TEXT = 'UPDATED_TEXT'

/**
 * INITIAL STATE
 */
const initialState = ''

/**
 * ACTION CREATORS
 */
export const updateText = text => ({
  type: UPDATED_TEXT,
  text
})

/**
 * THUNK CREATORS
 */

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  console.log('inside reducer with action', action)
  switch (action.type) {
    case UPDATED_TEXT:
      return action.text
    default:
      return state
  }
}
