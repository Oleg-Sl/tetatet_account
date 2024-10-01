import api from '../http/indexes';


export default class AuthService {

    static async registration(data) {
        return await api.post('/auth/users/', data);
    }

    static async login(data) {
        return await api.post('/auth/jwt/create/', data);
    }

    static async refresh(data) {
        return await api.post('/auth/jwt/refresh/', data);
    }

}
