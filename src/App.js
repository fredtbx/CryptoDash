import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';

const CustomElement = styled.div`
color: green
`;

class App extends Component {
  render() {
    
    return (
      <div className="App">
        <CustomElement>
          Hello
        </CustomElement>
      </div>
    );
  }
}

export default App;
