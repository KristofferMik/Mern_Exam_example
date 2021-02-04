import React, {useState, useEffect} from 'react';
import {ListLinks} from "../components"

function AlbumList(props) {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    async function getAlbums() {
      const url = `${props.url}/albums`;
      const response = await fetch(url);
      const albumsRes = await response.json();

      if (albumsRes.succes) {
        setAlbums(albumsRes.body);
      }
      else {
        alert(albumsRes.body);
      }
    }
    getAlbums();
  }, [props.url]); 

  return (
    <>
      <p>The Albums:</p> 
      <ListLinks list={albums}/>
    </>
  )
}
export default AlbumList;