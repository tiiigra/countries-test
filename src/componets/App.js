import React from 'react';
import { Normalize } from 'styled-normalize'
import { createGlobalStyle } from "styled-components"
import Customers from '../containers/Customers';

const GlobalStyle = createGlobalStyle`
    body {
        font-family: Roboto, sans-serif;
    }
    
    h2 {
        margin: 0;
    }
    ul {
        margin: 0;
        padding: 0;
    }
    li {
        list-style: none;
        padding: 0
    }
`;

const  App = () => (
    <React.Fragment>
      <Normalize/>
      <GlobalStyle/>
      <Customers/>
    </React.Fragment>
  );


export default App;
