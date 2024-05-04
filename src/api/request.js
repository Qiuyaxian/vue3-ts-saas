
import axios from 'axios';

function createAxiosRequest (axiosRequestConfig = {}) {
    const service = axios.create({
        baseURL: baseUrl,
        timeout: 10000
    })

    service.interceptors.request.use(
        (config) => {
            return config
        },
        (error) => {
            return Promise.reject(error)
        }
    )

    service.interceptors.response.use(
        (response) => {
            if (response.status === 200) {
                return response.data
            } else {
                Promise.reject()
            }
        },
        error => {
            return Promise.reject(error)
        }
    )
}

export default createAxiosRequest();

