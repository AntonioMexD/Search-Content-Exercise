import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Home from './components/pages/Home'

function App() {
  return (
    <Router>
      <div>
        <Home>
          Hola
        </Home>
      </div>
    </Router>
  );
}

export default App;
