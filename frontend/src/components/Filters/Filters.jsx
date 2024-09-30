import React, {useState} from 'react';

import './Filters.css'

import Select from "../common/Select/Select";


export default function Filters() {
    const [priority, setPriority] = useState("")
    const [status, setStatus] = useState("")

    return (
        <div className="d-flex justify-content-between align-items-center pt-3 task-filter">
            <div className="mb-3 mx-2 d-flex align-items-center w-100">
                <div><span className="form-label" htmlFor="filterPriority">Приоритет:&nbsp;</span></div>
                <div className="w-100">
                    <Select value={priority} setValue={setPriority} options={[]} id="filterPriority" className="form-select form-select-sm" />
                </div>
            </div>
            <div className="mb-3 mx-2 d-flex align-items-center w-100">
                <div><span className="form-label" htmlFor="filterStatus">Статус:&nbsp;</span></div>
                <div className="w-100">
                    <Select value={status} setValue={setStatus} options={[]} id="filterPriority" className="form-select form-select-sm" />
                </div>
            </div>
        </div>
    );
};
