import React from "react";
import {Link} from '@reach/router';

function ListLinks(props) {
  return (
    <ul>
      {props.list.map((item) => 
        <li key={item._id}>
          <Link to={`/${item._id}`}>{item.title}</Link>
        </li>
      )}
    </ul>
  )
}

export default ListLinks;