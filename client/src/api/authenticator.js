import jwtdecode from "jwt-decode";

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
      alert("Login success");
    }
    else {
      alert(userRes.body);
    }
  }

  logout() {
    this.removeLoginToken();
  }

  status() {
 
    let token = this.getLoginToken();

    if (token === null) {
        return false;
    }

    let decodedToken = jwtdecode(token);
    if (decodedToken.exp < Math.floor(Date.now()/1000)) {
      this.logout();//removes token... just to be sure.
      alert("Session ran out, please log on again");
      return false;
    }
    else {
      return true;
    }
  }

  getUsername() {
    let token = this.getLoginToken();

    if (token === null) {
      return false;
  }

    let decodedToken = jwtdecode(token);

    return decodedToken.user;
  }

}

export default authenticator;