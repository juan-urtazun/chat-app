import React from 'react'
import { BrowserRouter as Router, Route, useLocation, Redirect } from "react-router-dom";
import "./i18n";

import "normalize.css";

import Join from './components/Join/Join';
import ChatRoom from './components/ChatRoom/ChatRoom';
const App = () => (
  <Router>
    <Route path="/" exact component={Join} />
    <Route path="/room/:room" component={Join} />
    <Route path="/chat" component={ChatRoom} />
  </Router>
);

export default App;