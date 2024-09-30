import React, {useState} from 'react';
import Modal from 'react-modal';

import './Task.css';


export default function Task(props) {

    const formatDate = (dateIsoString) => {
        if (!dateIsoString) {
            return '';
        }
        const MONTHS = [
            "января", "февраля", "марта",    "апреля",  "мая",    "июня",
            "июля",   "августа", "сентября", "октября", "ноября", "декабря"
        ];
        const date = new Date(dateIsoString);
        if (date.toString() === 'Invalid Date') {
            return '';
        }

        const year = date.getFullYear();
        const month = MONTHS[date.getMonth()];
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = ('0' + date.getMinutes()).slice(-2);
    
        return `${day} ${month} ${year}, ${hours}:${minutes}`;
    }
    
    return (
        <div className="p-3 mb-3 border-0 rounded bg-light bg-body-tertiary shadow task-card">
            <div className="d-flex justify-content-between align-items-center mb-3 task-header">
                <div><h3 className="m-0 task-title">{props?.task?.title || ''}</h3></div>
                <div><span className="badge bg-danger rounded-5 p-2 fs-6 task-status">Не выполнена</span></div>
            </div>

            <div className="mb-3">
                <div className="mb-2">
                    <strong>Описание:&nbsp;</strong>
                    <span className="task-description">{props?.task?.description || ''}</span>
                </div>
                <div className="mb-2">
                    <strong>Приоритет:&nbsp;</strong>
                    <span className="badge bg-warning rounded-1 p-1 task-priority">{props?.task?.priority}</span>
                </div>
                <div className="text-body-secondary task-deadline-container">
                    <strong>Дедлайн:&nbsp;</strong>
                    <span className="task-deadline1">{formatDate(props.task.deadline)}</span>
                </div>
            </div>

            <div className="d-flex justify-content-end">
                <button className="btn btn-success" onClick={props.onEdit}>Редактировать</button>
                <button className="btn btn-danger ms-3">Удалить</button>
            </div>
        </div>
    );
};
