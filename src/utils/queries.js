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

async function editTask(id, data) {
    try {
        return await axios.put(BASE_URL+id, data)
    }
    catch {
        return new Error('Error')
    }
}

async function deleteTask(id) {
    try {
        return await axios.delete(BASE_URL+id)
    }
    catch {
        return new Error('Error')
    }
}

export { 
    getTasks, addTask, editTask, deleteTask
}