import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './Registration.css'
import Input from "../common/Input/Input";
import {Context} from "../../index";


export default function Registration() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const navigate = useNavigate();

    const {store} = React.useContext(Context);

    const handleSubmit = async(event) => {
        event.preventDefault();
        const result = await store.registration(email, password);
        if (result === true) {
            alert("Вам отправлено письмо для активации аккаунта");
        } else {
            result.email ? setErrorEmail(result.email.join(", ")) : setErrorEmail("");
            result.password ? setErrorPassword(result.password.join(", ")) : setErrorPassword("");
            result.detail ? setError(result.detail) : setError("");
        }
    };

    return (
        <div className="form-container">
            <div className="d-flex justify-content-center">
                <h2>Регистрация</h2>
            </div>
            <form className='authorization-form'>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Почта</label>
                    <Input value={email} setValue={setEmail} type="text" id="email" className={`form-control ${errorEmail ? 'is-invalid' : ''}`} placeholder="Введите email..."/>
                    {errorEmail && <div className="invalid-feedback ">{errorEmail}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Пароль</label>
                    <Input value={password} setValue={setPassword} type="password" className={`form-control ${errorPassword ? 'is-invalid' : ''}`} id="password" placeholder="Введите пароль..."/>
                    {errorPassword && <div className="invalid-feedback">{errorPassword}</div>}
                </div>
                {error && <div className="text-danger mt-3">{error}</div>}
                <div className="d-flex justify-content-center my-3">
                    <button className="btn btn-primary btn-authorization" onClick={handleSubmit}>Зарегистрироваться</button>
                </div>
            </form>
            <div className="d-flex justify-content-center">
                <p>Уже есть аккаунт?&nbsp;
                <Link to="/login">Войти</Link>
                </p>
            </div>
        </div>
    );
};
