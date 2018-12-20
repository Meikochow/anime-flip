import React, { Component } from 'react';
import './App.css';
import TableManager from './components/tableManager';

const narutoLogo = require('./introImages/narutoLogo.png');
const heroLogo = require('./introImages/heroLogo.png');
const onePieceLogo = require('./introImages/onePieceLogo.jpg');
const berserkLogo = require('./introImages/berserkLogo.png');

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      tableSelected:false,
      tableName : ""
    }
  }
  selectTable = (e) => {
    // console.log(e.target.value);
    this.setState({
      tableSelected:true,
      tableName:e.target.value
    })
  }
  render() {
    if(this.state.tableSelected){
          return (
      <div className="App">
        <TableManager tableName={this.state.tableName}/>
      </div>
    );
    }else{
      return (
        <div>
          <div className="logo"></div>
          <h1>Pick one and play</h1>
          <div className="menuButtons">
            <button style={{backgroundImage: 'url('+narutoLogo+')'}} className="menu" value="narutoTable" onClick={this.selectTable}></button>
            <button style={{backgroundImage: 'url('+heroLogo+')'}} className="menu" value="heroTable" onClick={this.selectTable}></button>
            <button style={{backgroundImage: 'url('+onePieceLogo+')'}} className="menu" value="onePieceTable" onClick={this.selectTable}></button>
            <button style={{backgroundImage: 'url('+berserkLogo+')'}} className="menu" value="berserkTable" onClick={this.selectTable}></button>
        </div>
        </div>
      )
    }

  }
}

export default App;
