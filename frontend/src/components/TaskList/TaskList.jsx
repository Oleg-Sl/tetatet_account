import React, {useEffect, useState} from 'react';

import './TaskList.css'

import Filters from "../Filters/Filters";
import Task from "../Task/Task";
import TaskModal from "../TaskModal/TaskModal";
import TaskService from "../../services/TaskService";
import PaginationRanges from '../common/Pagination/Pagination';


export default function TaskList() {
    const [tasks, setTasks] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);
    const [modalTitle, setModalTitle] = useState('Создать задачу');
    const [messagesList, setMessagesList] = useState([]);
    const [priorityChoices, setPriorityChoices] = useState([]);
    const [statusChoices, setStatusChoices] = useState([]);
    const [priority, setPriority] = useState('');
    const [status, setStatus] = useState('');
    const [page, setPage] = useState(1);
    const [pagesQty, setPagesQty] = useState(0);

    useEffect(() => {
        const fetchTasks = async () => {
            const result = await TaskService.getTasks({priority, status, page});
            const resultMeta = await TaskService.getMetaTaskData();
            console.log('data = ', result?.data);
            setPriorityChoices(resultMeta?.data?.actions?.POST?.priority?.choices || []);
            setStatusChoices(resultMeta?.data?.actions?.POST?.status?.choices || []);
            setPagesQty(result?.data?.count - 1);
            setTasks(result?.data?.results || []);
        };
        fetchTasks();
    }, [priority, status, page]);

    const openModal = (currentModalTask, task={}) => {
        setModalTitle(currentModalTask);
        setCurrentTask(task);
        setModalIsOpen(true);
    }

    const closeModal = () => {
        setModalIsOpen(false);
        setCurrentTask(null);
    }

    const onSaveTask = async (newDataTask) => {
        try {
            let updatedTasks = [];
            if (newDataTask.id) {
                const updatedTask = await TaskService.updateTask(newDataTask);
                console.log('updatedTask = ', updatedTask);
                updatedTasks = tasks.map(task => task.id === updatedTask.id ? Object.assign({}, updatedTask) : task);
            } else {
                const createdTask = await TaskService.createTask(newDataTask);
                console.log('createdTask = ', createdTask);
                updatedTasks = [...tasks, createdTask.data];
            }
            setTasks([...updatedTasks]);
            setMessagesList([]);
            closeModal();
        } catch (error) {
            console.error('Ошибка при сохранении задачи: ', error.response?.data);
            let messages = ['Произошли следующие ошибки: '];
            for (const [key, value] of Object.entries(error.response?.data)) {
                messages.push(`${key}: ${value.join(', ')};`);
            }
            setMessagesList(messages);
        }
    };

    const onDeleteTask = async (taskId) => {
        try {
            await TaskService.deleteTask(taskId);
            setTasks(tasks.filter(task => task.id !== taskId));
        } catch (error) {
            console.error('Ошибка при удалении задачи: ', error.response?.data);
        }
    }

    const getPriorityTitle = (priority) => {
        return priorityChoices.find(choice => choice.value === priority)?.display_name;
    }

    const getStatusTitle = (stat) => {
        return statusChoices.find(choice => choice.value === stat)?.display_name;
    }

    return (
        <>
            <div className="d-flex flex-column w-100">
                <Filters priorityChoices={priorityChoices} statusChoices={statusChoices} setPriority={setPriority} setStatus={setStatus} />
                <div className='d-flex justify-content-between my-3'>
                    <button className="btn btn-success" onClick={() => openModal('Создать задачу')}>Создать задачу</button>
                    <PaginationRanges count={pagesQty} defaultPage={page} boundaryCount={2} onChange={(_, num) => setPage(num)} />
                </div>
                <div className="task-container">
                    {tasks.map((task) => (
                        <Task key={task.id} task={task}
                            onEdit={() => openModal('Редактировать задачу', task)}
                            onDelete={() => onDeleteTask(task.id)}
                            priorityTitle={getPriorityTitle(task.priority)}
                            statusTitle={getStatusTitle(task.status)}
                        />
                    ))}
                </div>
            </div>

            <TaskModal
                title={modalTitle}
                isOpen={modalIsOpen}
                onClose={closeModal}
                task={currentTask}
                setTask={setCurrentTask}
                onSave={onSaveTask}
                messagesList={messagesList}
                priorityChoices={priorityChoices}
                statusChoices={statusChoices}
            />
        </>
    );
};
