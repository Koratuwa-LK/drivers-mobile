import axios from 'axios';
//guides-app-project
const instance = axios.create({
    baseURL : 'https://guides-app-project.firebaseio.com/'
})

export default instance;