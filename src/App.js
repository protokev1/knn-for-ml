import './App.css';
import React from 'react';
import { BrowserRouter, Route , Redirect} from 'react-router-dom';
import LoadData from './pages/loadData.js';
import Main from './pages/main.js';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/loaddata" component={LoadData}></Route>
        <Route path="/main" component={Main}></Route>
        <Route path="/" component={this}></Route>
        <Redirect to='/loaddata' />
      </BrowserRouter>
    </div>
  );
}

export default App;