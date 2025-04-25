// App.js
import React from 'react';
import FloatingBackground from './FloatingBackground';
import DialogBox from './DialogBox';
import Header from './Header';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <FloatingBackground />
      <Header />
      <DialogBox />
    </div>
  );
};

export default App;
