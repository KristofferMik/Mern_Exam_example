import React from "react";

function ListNumberCreaterDataText(props) {
  
  return (
    <ul>
      {props.list.map((item) => 
        <div key={item._id}>
          ------------------------------------------------------------------------------------------
          <p>Author: {item.creator} | Rating: {item.rating}</p>
          <p>Time: {new Date(item.DateOfCreation).getDate()}/{new Date(item.DateOfCreation).getMonth() + 1}/{new Date(item.DateOfCreation).getFullYear()}</p>
          <p>{item.body}</p>
        </div>
      )}
    </ul>
  )
}

export default ListNumberCreaterDataText;