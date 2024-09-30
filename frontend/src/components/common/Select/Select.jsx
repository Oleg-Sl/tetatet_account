import React from 'react';

import './Select.css';


export default function Select(props) {
    return (
        <select id={props.id} className={props.className} onChange={(event)=> props.setValue(event.target.value)}>
            {props.options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};
