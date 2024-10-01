import api from '../http/indexes';


export default class TaskService {

    static async getTasks(data={}) {
        console.log("=> ",data);
        return await api.get('/task/', {params: data});
    }

    static async getTask(id) {
        return await api.get(`/task/${id}/`);
    }

    static async createTask(data) {
        return await api.post('/task/', data);
    }

    static async updateTask(data) {
        return await api.put(`/task/${data.id}/`, data);
    }

    static async deleteTask(id) {
        return await api.delete(`/task/${id}/`);
    }

    static async getMetaTaskData() {
        return await api.options('/task/');
    }
}
