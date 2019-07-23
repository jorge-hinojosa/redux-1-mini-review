import React, { Component } from 'react';
import store, {INCREMENT, DECREMENT, UNDO, REDO} from './store';

class Counter extends Component {
  constructor(props) {
    super(props);

    const reduxState = store.getState();

    this.state = {
      currVal: reduxState.currVal,
      previousValues: reduxState.previousValues,
      futureValues: reduxState.futureValues,
    };
  }

  componentDidMount() {
    store.subscribe(() => {
      const reduxState = store.getState();
      this.setState({
        currVal: reduxState.currVal,
        previousValues: reduxState.previousValues,
        futureValues: reduxState.futureValues
      })
    })
  }

  increment = amount => {
    store.dispatch({
      type: INCREMENT,
      payload: amount
    })
  }

  decrement = amount => {
    store.dispatch({
      type: DECREMENT,
      payload: amount
    })
  }

  undo = () => {
    store.dispatch({
      type: UNDO
    })
  }

  redo = () => {
    store.dispatch({
      type: REDO
    })
  }

  render() {
    return (
      <div className="app">
        <section className="counter">
          <h1 className="counter__current-value">{this.state.currVal}</h1>
          <div className="counter__button-wrapper">
            <button
              className="counter__button increment-one"
              onClick={() => this.increment(1)}
            >
              +1
            </button>
            <button
              className="counter__button increment-five"
              onClick={() => this.increment(5)}
            >
              +5
            </button>
            <button
              className="counter__button decrement-one"
              onClick={() => this.decrement(1)}
            >
              -1
            </button>
            <button
              className="counter__button decrement-five"
              onClick={() => this.decrement(5)}
            >
              -5
            </button>
            <br />
            <button
              className="counter__button undo"
              onClick={this.undo}
            >
              Undo
            </button>
            <button
              className="counter__button redo"
              onClick={this.redo}
            >
              Redo
            </button>
          </div>
        </section>
        <section className="state">
          <pre>{JSON.stringify(this.state, null, 2)}</pre>
        </section>
      </div>
    );
  }
}

export default Counter;
