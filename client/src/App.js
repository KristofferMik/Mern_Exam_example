//liberaries
import React, {useEffect, useState} from 'react';
import { Router } from "@reach/router";
//Pages
import {AlbumList, Album, Login} from "./pages";
//Components
// import { ComponentExample } from './components'

const API_URL = process.env.REACT_APP_API;

function App() {

//loginManager={loginManager}
  return (
    <>
      <h1>Musiclious</h1>
      <Router>
        <AlbumList path="/" url={API_URL}/>
        <Album path="/:id" url={API_URL} />
        <Login path="/login" url={API_URL}/>
      </Router>
    </>
  );
}

export default App;
