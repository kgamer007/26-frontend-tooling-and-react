'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import cowsay from 'cowsay-browser';
import Header from './components/header/header';
import './style/main.scss';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      message: 'Hey welcome to my cowSay page',
      first: '',
      second: '',
      firstItems: [],
      secondItems: [],
      map: {},
    };
  }

  handleCounterIncrement = () => {
    this.setState((previousState) => {
      if (typeof previousState.counter === 'string') {
        previousState.counter = parseInt(previousState.counter, 10);
      }
      return {
        counter: previousState.counter + 1,
      };
    });
  }

  handleCounterDecrement() {
    this.setState((previousState) => {
      return {
        counter: previousState.counter - 1,
      };
    });
  }

  setCounter = (event) => {
    const { value } = event.target;

    this.setState({ counter: value });
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState((previousState) => {
      const firstItems = previousState.firstItems.concat(this.state.first);
      const secondItems = previousState.secondItems.concat(this.state.second);
      // TODO: change the message property
      return {
        firstItems,
        secondItems,
        first: '',
        second: '',
      };
    });
  }

  getIntersection = (arr1, arr2) => {
    const a = [1, 2, 3, 4, 5, 6, 7, 8];
    const b = [5, 3, 1, 2, 9, 15, 11];
    const solutionWithObject = () => {
      const map = arr1.reduce((storage, current) => {
        if (!storage[current]) {
          storage[current] = true;
        }
        return storage;
      }, {});
      console.log(map); // eslint-disable-line
    
      return arr2.filter(num => map[num]);
    };
    console.log(solutionWithObject(a, b)); // eslint-disable-line
  }

  render() {
    return (
      <div className="cowsay">
        <Header></Header>
        <form onSubmit={ this.handleSubmit }>
          <label htmlFor="first">Type something here.</label>
          <input 
            type="text"
            name="first"
            onChange={ this.handleInputChange }
            value={ this.state.first }
          />
          <label htmlFor="second">Type something here.</label>
          <input 
            type="text"
            name="second"
            onChange={ this.handleInputChange }
            value={ this.state.second }
          />
          <button type="submit">Submit Form</button>
        </form>
        <ul className="first-list">
            <h2>My First List</h2>
              {
                this.state.firstItems.map((item, index) => <li key={index}>{item}</li>)
              }
          </ul>
          <ul className="second-list">
            <h2>My Second List</h2>
            { 
              this.state.secondItems.map((item, index) => <li key={index}>{item}</li>)
            }
          </ul>
          <pre>
            {
              cowsay.say({
                text: this.state.message,
              })
            }
          </pre>
          <div className="counter">
            <h2>The current value of the counter is: { this.state.counter} </h2>
          {/* Below, we are using native DOM event API's that are abstracted away by React and using our methods we declared above as the new "onClick" and "onChange" handlers. Note that React camel cases all the event handler names, along with the above "class" being changed to "className" */}
            <button onClick={ this.handleCounterIncrement}>Increment Counter!</button>
            <button onClick={ this.handleCounterDecrement}>Decrement Counter!</button>
            <input 
              type="number" onChange={ this.setCounter }
              value={ this.state.counter }
            />
        </div>
      </div>
    );
  }
}

const rootNode = document.createElement('div');
document.body.appendChild(rootNode);
ReactDom.render(<App />, rootNode);
