import { BASE_URL } from '@/config/constants.json';

import axios from 'axios';

async function getTasks(date) {
    try {
        return await axios(BASE_URL + '?date=' + date)
    }
    catch {
        return new Error('Error')
    }
}

async function addTask(data) {
    try {
        return await axios.post(BASE_URL, data)
    }
    catch {
        return new Error('Error')
    }
}

async function editTask(data) {
    try {
        console.log(BASE_URL+data._id)
        const r = await axios.put(BASE_URL+data._id, data)
        console.log(r)
        return r
    }
    catch {
        console.log('err')
        return new Error('Error')
    }
}

async function deleteTask(id) {
    try {
        console.log(BASE_URL+id)
        const r = await axios.delete(BASE_URL+id)
        console.log(r)
        return r
    }
    catch {
        console.log('err')
        return new Error('Error')
    }
}

export { 
    getTasks, addTask, editTask, deleteTask
}