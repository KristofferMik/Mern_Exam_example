import {Link} from '@reach/router';
import React from "react";

function LinkTo(props) {
  return (
    <>
      <Link to={props.to}>{props.text}</Link>
    </>
  )
}

export default LinkTo;