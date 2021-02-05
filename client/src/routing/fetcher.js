async function getData(path, setData) {
  const url = `${path}`;
  const response = await fetch(url);
  const jsonRes = await response.json();
  
  if (jsonRes.succes) {
    setData(jsonRes.body);
  }
  else {
    alert(jsonRes.body);
  }
}

export default getData