import React, {useState} from 'react';
import {LinkTo, InputsWIthSubmit} from '../components';

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameCreate, setUsernameCreate] = useState("");
  const [passwordCreate, setPasswordCreate] = useState("");

  function LoginUser(e) {
    props.auther.login(username, password);
    setUsername("");
    setPassword("");
  }
  function CreateUser(e) {
    props.auther.registerUser({username: usernameCreate, password: passwordCreate});
    setUsernameCreate("");
    setPasswordCreate("");
  }

  return (
    <>
      <LinkTo to="/" text="Home"/>
      <p>Please log in</p>
      <InputsWIthSubmit list={[
        {name: "Username", type: "text", value: username, onchangefunc: (e) => setUsername(e.target.value)},
        {name: "Password", type: "password", value: password, onchangefunc: (e) => setPassword(e.target.value)}
      ]}
      buttonText="Login" buttonFunction={LoginUser}
      />

      <p>Alternativly you can create a user</p>
      <InputsWIthSubmit list={[
        {name: "Username", type: "text", value: usernameCreate, onchangefunc: (e) => setUsernameCreate(e.target.value)},
        {name: "Password", type: "password", value: passwordCreate, onchangefunc: (e) => setPasswordCreate(e.target.value)}
      ]}
      buttonText="Create user" buttonFunction={CreateUser}
      />

    </>
  )
}
export default Login;//list objekter: name, type, value, onchangefunc