import {createStore} from 'redux'

const initialState = {
  currVal: 0,
  previousValues: [],
  futureValues: []
}

export const INCREMENT = "INCREMENT"
export const DECREMENT = "DECREMENT"
export const UNDO = "UNDO"
export const REDO = "REDO"


function counterReducer(state = initialState, action) {
  const {type, payload} = action;
  switch (type) {
    case INCREMENT:
      return { 
        ...state, 
        currVal: state.currVal + payload,
        previousValues: [state.currVal, ...state.previousValues],
        futureValues: []
      }
    case DECREMENT:
      return {
        ...state, 
        currVal: state.currVal - payload,
        previousValues: [state.currVal, ...state.previousValues],
        futureValues: []
      }
    case UNDO:
      return {
        ...state,
        currVal: state.previousValues[0],
        previousValues: state.previousValues.slice(1),
        futureValues: [state.currVal, ...state.futureValues]
      }
    case REDO:
      return {
        ...state,
        currVal: state.futureValues[0],
        previousValues: [state.currVal, ...state.previousValues],
        futureValues: state.futureValues.slice(1)
      }
    default:
      return state;
  }
}

export default createStore(counterReducer);