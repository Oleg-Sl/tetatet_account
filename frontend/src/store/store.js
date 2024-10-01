import { makeAutoObservable } from "mobx";

import AuthService from "../services/AuthService";


export default class Store {
    isAuth = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(isAuth) {
        this.isAuth = isAuth;
    }

    async login(email, password) {
        try {
            localStorage.removeItem('token');
            const response = await AuthService.login({email, password}, { skipAuth: true });
            console.log("Login response = ", response);
            localStorage.setItem('token', response.data.access);
            localStorage.setItem('refresh', response.data.refresh);
            this.setAuth(true);
            return true;
        } catch (e) {
            console.error(e.response.data);
            return e.response.data;
        }
    }

    async registration(email, password) {
        try {
            localStorage.removeItem('token');
            const response = await AuthService.registration({email, password}, { skipAuth: true });
            console.log("Registration response = ", response);
            return true;
        } catch (e) {
            console.error(e.response.data);
            return e.response.data;
        }
    }

    async checkAuth() {
        try {
            localStorage.removeItem('token');
            const refresh = localStorage.getItem('refresh');
            const response = await AuthService.refresh({refresh});
            console.log("CheckAuth response = ", response);
            localStorage.setItem('token', response.data.access);
            localStorage.setItem('refresh', response.data.refresh);
            this.setAuth(true);
        } catch (e) {
            console.error(e);
        }
    }
}