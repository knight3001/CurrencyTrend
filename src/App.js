import React, { Component } from 'react';
import './App.css';

import Trend from './trend/Trend';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="panel panel-default">
          <div className="panel-heading"><h3 className="panel-title">Currency Exchange Rate</h3></div>
          <div className="panel-body">
            <div className="row">
              <Trend />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
