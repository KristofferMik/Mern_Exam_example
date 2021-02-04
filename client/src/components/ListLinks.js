import React from "react";
import {Link} from '@reach/router';

//require a object array called 'list' with objects having _id, and title.
function ListLinks(props) {
  return (
    <>
      {props.list.map((item) => 
        <><Link  key={item._id} to={`/${item._id}`}>{item.title}</Link> <br/></>
      )}
    </>
  )
}

export default ListLinks;