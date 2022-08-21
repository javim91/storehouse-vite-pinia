import axios from 'axios'

const storehouseApi = axios.create({
    baseURL: 'https://storehouse-143b6-default-rtdb.europe-west1.firebasedatabase.app'
})

export default storehouseApi