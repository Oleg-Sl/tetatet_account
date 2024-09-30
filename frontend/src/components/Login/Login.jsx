import React, {useState} from 'react';

import './Login.css'
import Input from "../Input/Input";


export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <div class="form-container">
            <div class="d-flex justify-content-center">
                <h2>Вход</h2>
            </div>
            <form className='authorization-form'>
                <div className="mb-3">
                    <label for="email" className="form-label">Почта</label>
                    <Input value={email} setValue={setEmail} type="text" id="email" className="form-control" placeholder="Введите email..."/>
                </div>
                <div className="mb-3">
                    <label for="password" className="form-label">Пароль</label>
                    <Input value={password} setValue={setPassword} type="password" className="form-control" id="password" placeholder="Введите пароль..."/>
                </div>
                <div className="d-flex justify-content-center my-3">
                    <button className="btn btn-primary btn-authorization">Войти</button>
                </div>
            </form>
            <div class="d-flex justify-content-center">
                <p>Уже нет аккаунта? <a href="#">Зарегистрироваться</a></p>
            </div>
        </div>
    );
};
