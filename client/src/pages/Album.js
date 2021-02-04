import React, {useState} from 'react';

function Album(props) {
  const [msg, setMsg] = useState("Hello");

  return (
    <>
      
      
      <p>{msg}</p> 

    </>
  )
}
export default Album;

//When it gets the album. have a function that gets how many 
//reviews there is and makes sure that is displayed, 
//also gets and adds together the ratings then divide by number of reviews


//Added AddReview to here:
// if the user is not logged in. There should be displayed a error asking them to log in
// The submit review is supporsed to be embedded on the Album page.