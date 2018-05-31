import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import "./styles.css";

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

  handleAdd(e) {
    if (this.state.inputValue !== "") {
      const newItem = {
        text: this.state.inputValue,
        key: Date.now()
      };

      this.setState((prevState) => {
        return {
          listItems: prevState.listItems.concat(newItem)
        };
      });

      this.setState({inputValue: ""});
    }

    console.log(this.state.listItems);

    e.preventDefault();
  }

  handleCreate(item) {
    return <li key={item.key}>{item.text}</li>
  }

  render() {
    const todoEntries = this.state.listItems;
    const populatedList = todoEntries.map(this.handleCreate);
    return (
      <div className="App">
        <h1>TO DO</h1>
        <div>
          <ul className="theList">
              {populatedList}
          </ul>
          <form onSubmit={(e)=>this.handleAdd(e)}>
          <input type="text"
              value={this.state.inputValue}
              onChange={(e)=> this.handleInputChange(e)}
          />
          <button>Add to list</button>
          </form>
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
