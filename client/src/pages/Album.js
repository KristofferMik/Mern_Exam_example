import React, {useState, useEffect} from 'react';
import {InputsWIthSubmit, LinkTo, ListNumberCreaterDataText} from '../components';
import {getData, putData} from "../api/fetcher.js";

function Album(props) {
  const [album, setAlbum] = useState({});
  const [showReview, setShowReview] = useState(false);
  const [rating, setRating] = useState();
  const [review, setReview] = useState("");

  useEffect(() => {
    getData(`${props.url}/album/${props.id}`, sortReviews);
  }, [props.url, props.id]); 

  function sortReviews(albumToSort) {
    albumToSort.album.reviews.sort((a,b) => {
      return new Date(b.DateOfCreation) - new Date(a.DateOfCreation);
    });

    setAlbum(albumToSort);
  }

  
  function AddReview(e){
    if (!props.auther.status()) {
      alert("Please log in to post a review")
      return;
    }

    if (rating < 1 || rating > 10) {
      alert("Not valid ration. Must be between or including 1 and 10")
      return;
    }
    
    putData(`${props.url}/albumReview`, sortReviews, {id: props.id, rating: rating,body: review, creator: props.auther.getUsername()}, props.auther);
    setRating(1);
    setReview("");
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
      <button onClick={(e) => setShowReview(!showReview)}>Add Review</button>
      { showReview &&
        <InputsWIthSubmit list={[
          {name: "rating between 1-10", type: "number", value: rating, onchangefunc: (e) => setRating(e.target.value)},
          {name: "review (optional)", type: "text", value: review, onchangefunc: (e) => setReview(e.target.value)}
        ]}
        buttonText="Submit Review" buttonFunction={AddReview}
        />
      }
      <p>Reviews:</p>
      <ListNumberCreaterDataText list={album.album.reviews}/>
    </>
  )
}
export default Album;

//Added AddReview to here:
// if the user is not logged in. There should be displayed a error asking them to log in
// The submit review is supporsed to be embedded on the Album page.