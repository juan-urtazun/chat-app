import React from 'react'
import { BrowserRouter as Router, Route, useLocation, Redirect } from "react-router-dom";
import queryString from "query-string";
import "normalize.css";

import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';
function RoomChat() {
  const location = useLocation();
  const { name, room } = queryString.parse(location.search);
  return name && room ? <Chat location={location} /> : <Redirect to="/" />;
}

const App = () => (
  <Router>
    <Route path="/" exact component={Join} />
    <Route path="/chat" component={RoomChat} />
  </Router>
);

export default App;