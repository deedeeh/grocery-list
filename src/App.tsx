import React from 'react';
import './styles/App.css';
import { Form } from './components/Form';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Grocery List</h1>
      </header>
      <Form />
    </div>
  );
}

export default App;
