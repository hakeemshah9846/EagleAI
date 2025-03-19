import axios from "axios"

const axiosApi = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
})

// Request interceptor to update Authorization header on each request
axiosApi.interceptors.request.use(
    (config) => {
        if (localStorage.getItem("authUser")) {
            const obj   = JSON.parse(localStorage.getItem("authUser")); 
            const token = obj?.access_token;
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor to handle 401 errors
axiosApi.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            // TODO
        }
        return Promise.reject(error);
    }
);

export async function get(url, config = {}) {
    return await axiosApi.get(url, { ...config }).then(response => response.data)
}

export async function post(url, data, config = {}) {
    return axiosApi.post(url, { ...data }, { ...config }).then(response => response)
}

export async function put(url, data, config = {}) {
    return axiosApi.put(url, { ...data }, { ...config }).then(response => response.data)
}

export async function patch(url, data, config = {}) {
    return axiosApi.patch(url, { ...data }, { ...config }).then(response => response.data)
}

export async function del(url, config = {}) {
    return await axiosApi.delete(url, { ...config }).then(response => response.data)
}
