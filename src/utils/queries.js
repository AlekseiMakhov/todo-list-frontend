import { BASE_URL } from '@/config/constants.json';

import axios from 'axios';

async function getTasks(date) {
    try {
        // console.log(date)
        const r = await axios(BASE_URL + '/?date=' + date)
        // console.log(r)
        return r
    }
    catch {
        return new Error('Error')
    }
}

export { getTasks }