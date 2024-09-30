import React, {useState} from 'react';

import './Registration.css'
import Input from "../Input/Input";


export default function Registration() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <div class="form-container">
            <div class="d-flex justify-content-center">
                <h2>Регистрация</h2>
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
                    <button className="btn btn-primary btn-authorization">Зарегистрироваться</button>
                </div>
            </form>
            <div class="d-flex justify-content-center">
                <p>Уже есть аккаунт? <a href="#">Войти</a></p>
            </div>
        </div>
    );
};
