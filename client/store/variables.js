/**
 * ACTION TYPES
 */

const ADDED_VARIABLE = 'ADDED_VARIABLE'

/**
 * INITIAL STATE
 */
const initialState = {
  'obj': {
    'foo1': 'some value',
    'foo2': {
      'foo3': 'some value'
    }
  }
}

/**
 * ACTION CREATORS
 */
const addVariable = (name, value) => ({
  type: ADDED_VARIABLE,
  name,
  value
})

/**
 * THUNK CREATORS
 */

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case ADDED_VARIABLE:
      return {
        ...state,
        [action.name]: action.value
      }
    default:
      return state
  }
}
