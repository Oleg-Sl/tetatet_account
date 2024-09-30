import './App.css';

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import TaskList from "./components/TaskList/TaskList";

export default function App() {
    return (
        <div className="container d-flex justify-content-center">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<TaskList />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/registration" element={<Registration />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}
