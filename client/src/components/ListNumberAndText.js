import React from "react";

//require a object array called 'list' with objects having _id, number and text.
function ListNumberAndText(props) {
  return (
    <>
      {props.list.map((item) => 
        <div key={item._id}>
          <p>Rating: {item.number}</p>
          <p>{item.text}</p>
        </div>
      )}
    </>
  )
}

export default ListNumberAndText;