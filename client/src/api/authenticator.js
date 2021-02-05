// import jwt_decode from "jwt-decode";
// https://stackoverflow.com/questions/49819183/react-what-is-the-best-way-to-handle-login-and-authentication

class authenticator {

  constructor(auth_api_url) {
    this.auth_api_url = auth_api_url;
  }

  setLoginToken(userLoginToken) {
    localStorage.setItem("userLoginToken", userLoginToken);
  }

  getLoginToken() {
    return localStorage.getItem("userLoginToken");
  }

  removeLoginToken() {
    localStorage.removeItem("userLoginToken");
  }

  async login(username, password) {
    const url = `${this.auth_api_url}`;

    let user = {
      username: username,
      password: password
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        'content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }); 

    const userRes = await response.json();

    if (userRes.succes){
      this.setLoginToken(userRes.body);
    }
    else {
      alert(userRes.body);
    }
  }

  logout() {
    this.removeLoginToken();
  }

  status() {
    //check if user is expired here
  }

  getUsername() {
    //returns the username
  }

}

export default authenticator;