import axios from '../axios'; // Adjust the path if needed
let token = sessionStorage.getItem('token');
let user = JSON.parse(sessionStorage.getItem('user'));
export default {
    projects: () => {
        return axios.get(`/user/${user.id}/projects`,
            {
                headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token}
            });
    },
    get: (id)=>{
        return axios.get(`/projects/${id}`,
            {
                headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token}
            });
    },
    create: (data) => {
        return axios.post('/projects', data,
            {
                headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token}
            });
    },
    createTask: (project_id, data) => {
        return axios.post(`/projects/${project_id}/tasks`, data,
            {headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }
            });
    },
    deleteTask: (project_id, task_id) => {
        return axios.delete(`/projects/${project_id}/tasks/${task_id}`,
            {headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }
            });
    }
}