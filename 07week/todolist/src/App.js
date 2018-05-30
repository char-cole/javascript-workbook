import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
      super(props);
      this.state = {
          listItems: [],
          inputValue: ''
      }
  }


  handleInputChange(e) {
      this.setState({inputValue: e.target.value})
    }

  handleAdd() {
    this.state.listItems.push(this.state.inputValue);
    this.setState({this.state.listItems});
  }

  render() {
    return (
      <div className="App">
        <h1>To Do:</h1>
        <div>
        <input type="text"
            value={this.state.inputValue}
            onChange={(e)=> this.handleInputChange(e)}
        />
        <button onClick={()=> this.handleAdd()}>Add to list</button>
        </div>
      </div>
    );
  }
}

export default App;

// Write out the user events that you’ll be using
// Write out what you’ll be storing in the state
// Write out where you’ll update the state and with what data

// Events: add item to list, check off item
  // onChange (text entry), onClick (submit button), onClick (check off)

// State will store inputValue, listItems as array of strings

// onChange will update state.inputValue, onClick / submit will .push() items to listItems, onClick / complete will strikethrough items

// ----

// This is the example code given in class
/*
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
      super(props);
      this.state = {
          count: 0,
          inputValue: ''
      }
  }

  // state = {
  //     count: 0
  // };
  handleClick(){
     const count = this.state.count + 1;
     this.setState({count: count})
  }
  handleInputChange(e) {
      this.setState({inputValue: e.target.value})
  }
  handleClearInput(){
      this.setState({inputValue: ''})
  }
  render() {
    return (
        <div>
            <h2>Counter {this.state.count}</h2>
            <button onClick={()=> this.handleClick()}>Increase the count</button>
            <input type="text"
                value={this.state.inputValue}
                onChange={(e)=> this.handleInputChange(e)}
            />
            <button onClick={()=> this.handleClearInput()}>Clear your input</button>
        </div>
    )
  }
}

export default App;
*/
