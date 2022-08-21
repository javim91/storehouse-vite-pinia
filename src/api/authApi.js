import axios from 'axios'

const authApi = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts',
    params: {
        key: 'AIzaSyCReS-SLI8HS24P8WbOuAP3lhI8mk7pcUA'
    }
})

export default authApi