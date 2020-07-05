import axios from 'axios';
//guides-app-project
const instance = axios.create({
    baseURL : 'https://krushiganudenulk.firebaseio.com/'
})

export default instance;