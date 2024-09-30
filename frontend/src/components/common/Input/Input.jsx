import React from 'react';

import './Input.css'


export default function Input(props) {
    return (
        <input onChange={(event)=> props.setValue(event.target.value)}
               value={props.value}
               type={props.type}
               placeholder={props.placeholder}
               className={props.className}
               id={props.id}
               />
    );
};
