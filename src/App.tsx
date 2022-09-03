import * as React from 'react';
import { Component } from 'react';

import { BrowserRouter } from 'react-router-dom';
import Router from './router/Router';

function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
