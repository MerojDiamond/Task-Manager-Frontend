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
        return axios.get(`/user/${user.id}/projects/${id}`,
            {
                headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token}
            });
    },
    create: (data) => {
        return axios.post('/projects', data,
            {headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }
            });
    }
}