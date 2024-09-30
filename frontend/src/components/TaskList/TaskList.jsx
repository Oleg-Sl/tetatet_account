import React, {useState} from 'react';
import Modal from 'react-modal';

import './TaskList.css'

import Filters from "../Filters/Filters";
import Task from "../Task/Task";
import TaskModal from "../TaskModal/TaskModal";

export default function TaskList() {
    const [tasks, setTasks] = useState([
        { id: 1, title: 'Задача 1', description: 'Описание задачи 1', status: 'Не выполнена', priority: 'Высокий', deadline: '2024-09-30T16:25' },
        { id: 2, title: 'Задача 2', description: 'Описание задачи 2', status: 'Выполнена', priority: 'Средний', deadline: '2024-09-30T16:25' },
    ]);

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);

    const openModal = (task) => {
        setCurrentTask(task);
        setModalIsOpen(true);
    }

    const closeModal = () => {
        setModalIsOpen(false);
        setCurrentTask(null);
    }

    const onSaveTask = (newDataTask) => {
        setTasks(tasks.map(task => task.id === newDataTask.id ? newDataTask : task));
        closeModal();
    }

    return (
        <>
            <div className="d-flex flex-column w-100">
                <Filters/>
                <div className="task-container">
                    {tasks.map((task) => (
                        <Task key={task.id} task={task} onEdit={() => openModal(task)}/>
                    ))}
                </div>
            </div>

            <TaskModal
                isOpen={modalIsOpen}
                onClose={closeModal}
                task={currentTask}
                setTask={setCurrentTask}
                onSave={onSaveTask}
            />
        </>
    );
};
