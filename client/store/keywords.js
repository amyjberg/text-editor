
/**
 * ACTION TYPES
 */

const ADDED_KEYWORD = 'ADDED_KEYWORD'

/**
 * INITIAL STATE
 */
const initialState = {
  'var': 'red',
  'function': 'blue',
  'class': 'purple'
}

/**
 * ACTION CREATORS
 */
const addKeyword = (keyword, color) => ({
  type: ADDED_KEYWORD,
  newKeyword: {
    [keyword]: color
  }
})

/**
 * THUNK CREATORS
 */

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case ADDED_KEYWORD:
      return {
        ...state, ...action.newKeyword
      }
    default:
      return state
  }
}
