import React, {useState} from 'react';

function Login(props) {
  const [msg, setMsg] = useState("Hello");

  return (
    <>
      <h1>Welcome to APP</h1>
      
      <p>{msg}</p> 

    </>
  )
}
export default Login;