//liberaries
import React from 'react';
import { Router } from "@reach/router";
//Pages
import {AlbumList, Album, Login} from "./pages";
//auth
import auth from "./api/authenticator";

const API_URL = process.env.REACT_APP_API;

const auther = new auth(`${API_URL}`);

function App() {

  return (
    <>
      <h1>Musiclious</h1>
      <Router>
        <AlbumList path="/" url={API_URL} auther={auther}/>
        <Album path="/:id" url={API_URL} auther={auther}/>
        <Login path="/login" url={API_URL} auther={auther}/>
      </Router>
    </>
  );
}

export default App;
