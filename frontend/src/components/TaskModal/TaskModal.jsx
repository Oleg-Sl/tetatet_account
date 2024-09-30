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

    return (
        <Modal
            isOpen={props.isOpen}
            onRequestClose={props.onClose}
            className="task-modal"
            ariaHideApp={false}
        >
           <div className="task-form-container">
                <div className="d-flex justify-content-center">
                    <h3>Создать задачу</h3>
                </div>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Заголовок</label>
                        <Input value={props?.task?.title || ''} setValue={(value) => updateTaskField(value, 'title')} type="text" id="title" className="form-control" placeholder="Введите заголовок"/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Описание</label>
                        <Input value={props?.task?.description || ''} setValue={(value) => updateTaskField(value, 'description')} type="text" id="description" className="form-control" placeholder="Введите описание"/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="status" className="form-label">Статус</label>
                        <Select value={props?.task?.status || 'not_completed'} setValue={(value) => updateTaskField(value, 'status')} id="status" className="form-control" options={[
                            {value: "not_completed", label: "Не выполнена"},
                            {value: "completed", label: "Выполнена"}
                        ]} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="priority" className="form-label">Приоритет</label>
                        <Select value={props?.task?.priority || 'low'} setValue={(value) => updateTaskField(value, 'priority')} id="priority" className="form-control" options={[
                            {value: "high", label: "Высокий"},
                            {value: "medium", label: "Средний"},
                            {value: "low", label: "Низкий"}
                        ]} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="deadline" className="form-label">Дедлайн</label>
                        <Input value={props?.task?.deadline || ''} setValue={(value) => updateTaskField(value, 'deadline')} type="datetime-local" id="deadline" className="form-control" placeholder="Введите дедлайн"/>
                    </div>

                    <div className="d-grid gap-2 mb-3">
                        <button type="submit" className="btn btn-primary" onClick={() => props.onSave(props.task)}>Сохранить</button>
                        <button type="button" className="btn btn-danger" onClick={props.onClose}>Отменить</button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
