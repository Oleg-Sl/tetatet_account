
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import {observer} from "mobx-react-lite";

import './App.css';

import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import TaskList from "./components/TaskList/TaskList";
import {Context} from "./index";


function App() {
    const [loading, setLoading] = useState(true);

    const {store} = React.useContext(Context);

    useEffect(() => {
        const checkAuth = async () => {
            if (localStorage.getItem('token')) {
                await store.checkAuth();
            }
            setLoading(false);
        };
        checkAuth();
    }, [store]);

    if (loading) {
        return <div>Загрузка...</div>;
    }

    return (
        <div className="container d-flex justify-content-center">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={store.isAuth ? <TaskList /> : <Navigate to="/login" />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/registration" element={<Registration />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default observer(App);
