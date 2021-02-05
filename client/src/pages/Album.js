import React, {useState, useEffect} from 'react';
import {LinkTo, ListNumberCreaterDataText} from '../components';
import {getData} from "../api/fetcher.js";

function Album(props) {
  const [album, setAlbum] = useState({});

  useEffect(() => {
    getData(`${props.url}/album/${props.id}`, sortReviews);
  }, [props.url, props.id]); 

  function sortReviews(albumToSort) {
    albumToSort.album.reviews.sort((a,b) => {
      return new Date(b.DateOfCreation) - new Date(a.DateOfCreation);
    });

    setAlbum(albumToSort);
  }

  if (!album || (Object.keys(album).length === 0 && album.constructor === Object)) {
    return (
      <>
        <p>No Data! try to refresh or go back to frontpage</p>
        <LinkTo to="/" text="Home"/>
      </>
    )
  }

  return (
    <>
      <LinkTo to="/" text="Home"/>
      <p>Title: {album.album.title}</p>
      <p>Artist: {album.album.artist}</p>
      <p>Genre: {album.album.genre}</p>
      <p>Year of Release: {album.album.releaseYear}</p>
      <p>Average rating: {album.reviewStats.reviewAvg}</p>
      <p>Number of ratings: {album.reviewStats.reviewCount}</p>
      <p>Reviews:</p>
      <ListNumberCreaterDataText list={album.album.reviews}/>
    </>
  )
}
export default Album;

//Added AddReview to here:
// if the user is not logged in. There should be displayed a error asking them to log in
// The submit review is supporsed to be embedded on the Album page.