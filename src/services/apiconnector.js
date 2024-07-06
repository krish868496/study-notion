import axios from 'axios'

// export const axiosInstance = axios.create({
//     baseURL: url,
//     headers: {
//         Accept: 'application/json',
//     }

// })
export const apiConnector = (method, url, bodyData, headers, params= null) => {
    return axios.create({
            method,
            url,
            data: bodyData ? bodyData : null,
            headers: headers ? headers : null,
            params
        })
}

