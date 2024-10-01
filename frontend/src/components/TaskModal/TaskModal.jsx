import React from 'react';
import Modal from 'react-modal';

import './TaskModal.css';

import Input from "../common/Input/Input";
import Select from '../common/Select/Select';

Modal.setAppElement('#root');


export default function TaskModal(props) {

    const updateTaskField = (value, fieldName) => {
        return props.setTask(prevTask => ({
            ...prevTask,
            [fieldName]: value,
        }));
    }

    const onSaveSubmit = (event) => {
        event.preventDefault();
        props.onSave(props.task);
    }

    return (
        <Modal
            isOpen={props.isOpen}
            onRequestClose={props.onClose}
            className="task-modal"
            ariaHideApp={false}
        >
           <div className="task-form-container">
                <div className="d-flex justify-content-center">
                    <h3>{props?.title}</h3>
                </div>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Заголовок</label>
                        <Input value={props?.task?.title || ''} setValue={(value) => updateTaskField(value, 'title')} type="text" id="title" className="form-control" placeholder="Введите заголовок"/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Описание</label>
                        <textarea className="form-control" id="description" rows="3" value={props?.task?.description || ''} onChange={(event) => updateTaskField(event.target.value, 'description')}></textarea>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="status" className="form-label">Статус</label>
                        <Select value={props?.task?.status || ''} setValue={(value) => updateTaskField(value, 'status')} id="status" className="form-control" options={props?.statusChoices} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="priority" className="form-label">Приоритет</label>
                        <Select value={props?.task?.priority || ''} setValue={(value) => updateTaskField(value, 'priority')} id="priority" className="form-control" options={props?.priorityChoices} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="deadline" className="form-label">Дедлайн</label>
                        <Input value={props?.task?.deadline || ''} setValue={(value) => updateTaskField(value, 'deadline')} type="datetime-local" id="deadline" className="form-control" placeholder="Введите дедлайн"/>
                    </div>

                    <div>
                        {props.messagesList && (
                            <div className="alert alert-danger">
                                <ul>
                                    {props.messagesList.map((message, index) => (
                                        <li key={index}> - {message}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                    
                    <div className="d-grid gap-2 mb-3">
                        <button type="submit" className="btn btn-primary" onClick={onSaveSubmit}>Сохранить</button>
                        <button type="button" className="btn btn-danger" onClick={props.onClose}>Отменить</button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
