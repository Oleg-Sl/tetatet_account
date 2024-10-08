import React, {useEffect, useState} from 'react';

import './TaskList.css'

import Filters from "../Filters/Filters";
import Task from "../Task/Task";
import TaskModal from "../TaskModal/TaskModal";
import TaskService from "../../services/TaskService";
import PaginationRanges from '../common/Pagination/Pagination';


export default function TaskList() {
    const pageSize = 4;
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
            const result = await TaskService.getTasks({priority, status, page, page_size:pageSize});
            const resultMeta = await TaskService.getMetaTaskData();
            console.log('data = ', result?.data);
            setPriorityChoices(resultMeta?.data?.actions?.POST?.priority?.choices || []);
            setStatusChoices(resultMeta?.data?.actions?.POST?.status?.choices || []);
            console.log(result?.data?.count, pageSize)
            setPagesQty(Math.ceil(result?.data?.count / pageSize));
            setTasks(result?.data?.results || []);
        };
        fetchTasks();
    }, [priority, status, page]);

    const openModal = async (currentModalTask, taskId=null) => {
        let currentTask = {};
        if (taskId) {
            const taskData = await TaskService.getTask(taskId);
            currentTask = taskData?.data;
        }
        setModalTitle(currentModalTask);
        setCurrentTask(currentTask);
        setModalIsOpen(true);
    }

    const closeModal = () => {
        setModalIsOpen(false);
        setCurrentTask(null);
    }

    const onSaveTask = async (newDataTask) => {
        try {
            console.log('newDataTask = ', newDataTask);
            let updatedTasks = [];
            if (newDataTask.id) {
                const updatedTask = await TaskService.updateTask(newDataTask);
                console.log('updatedTask = ', updatedTask);
                updatedTasks = tasks.map(task => task.id === updatedTask.id ? updatedTask : task);
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
                            onEdit={() => openModal('Редактировать задачу', task?.id)}
                            onDelete={() => onDeleteTask(task.id)}
                            priorityChoices={priorityChoices}
                            statusChoices={statusChoices}
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
