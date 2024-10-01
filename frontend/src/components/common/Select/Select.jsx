import React from 'react';

import './Select.css';


export default function Select(props) {
    return (
        <select id={props.id} value={props.value} className={props.className} onChange={(event)=> props.setValue(event.target.value)}>
            <option value="">Не выбрано</option>
            {props.options.map((option) => (
                <option key={option.value} value={option.value}>{option.display_name}</option>
            ))}
        </select>
    );
};
