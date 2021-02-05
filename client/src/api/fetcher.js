async function getData(path, setData) {
  const url = `${path}`;
  const response = await fetch(url, {
    method: "GET"
  });
  const jsonRes = await response.json();
  
  if (jsonRes.succes) {
    setData(jsonRes.body);
  }
  else {
    alert(jsonRes.body);
  }
}

async function putData(path, setData, sendData, auth) {
  console.log(path);
  console.log(sendData);
  const url = `${path}`;
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      'content-Type': 'application/json',
      'Authorization': `Bearer ${auth.getLoginToken()}`
    },
    body: JSON.stringify(sendData)
  });
  const jsonRes = await response.json();
  
  if (jsonRes.succes) {
    setData(jsonRes.body);
  }
  else {
    alert(jsonRes.body);
  }
}

export {getData, putData} 