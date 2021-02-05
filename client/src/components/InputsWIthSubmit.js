import React from 'react';

function InputWithSubmit(props) {
  return (
  <div>
    {props.list.map((item) => 
        <input key={item.name} placeholder={item.name} type={item.type} value={item.value} onChange={item.onchangefunc}/>
      )}
      <button onChange={props.buttonFunction}>{props.buttonText}</button>
  </div>
  )
}
export default InputWithSubmit;

//input with submit – får; array med objekter der beskriver: navn på field, default value, useState metode. 
// Som den bruger til at lave input elementer med. + ting til submit knap: submit funktion navn på knap.

//buttonFunction buttonText
//list objekter: name, type, value, onchangefunc