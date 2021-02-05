import React, {useState} from 'react';
import {LinkTo, InputsWIthSubmit} from '../components';

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function LoginUser(e) {
    //async login function here
    props.auther.login(username, password);
    setUsername("");
    setPassword("");
  }

  return (
    <>
      <LinkTo to="/" text="Home"/>
      <InputsWIthSubmit list={[
        {name: "Username", type: "text", value: username, onchangefunc: (e) => setUsername(e.target.value)},
        {name: "Password", type: "password", value: password, onchangefunc: (e) => setPassword(e.target.value)}
      ]}
      buttonText="Login" buttonFunction={LoginUser}
      />

    </>
  )
}
export default Login;//list objekter: name, type, value, onchangefunc