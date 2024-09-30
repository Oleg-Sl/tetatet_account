import './App.css';

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";

export default function App() {
    return (
        <div class="container d-flex justify-content-center">
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/registration" element={<Registration />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}
