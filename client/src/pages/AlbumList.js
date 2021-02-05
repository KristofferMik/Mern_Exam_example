import React, {useState, useEffect} from 'react';
import {ListLinks, LinkTo} from "../components";
import getData from "../routing/fetcher.js";

function AlbumList(props) {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    getData(`${props.url}/albums`, setAlbums);
  }, [props.url]); 

  return (
    <>
      <LinkTo to="/login" text="Login"/>
      <p>The Albums:</p> 
      <ListLinks list={albums}/>
    </>
  )
}
export default AlbumList;