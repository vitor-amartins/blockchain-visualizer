import React from 'react';

import { ToastContainer } from 'react-toastify';

import './App.css';

import 'react-toastify/dist/ReactToastify.css';
import Blockchain from './components/Blockchain';
import { blocks } from './blocks';

function App() {
  return (
    <div className="App">
      <Blockchain blocks={blocks} />
      <ToastContainer position="bottom-right" />
      <div className="attribution">
        <a href="https://www.freepik.com/free-photos-vectors/background">
          Background vector created by starline - www.freepik.com
        </a>
      </div>
    </div>
  );
}

export default App;
