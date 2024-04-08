import {API_PATH} from "./api";
import axios from "axios";

export const axiosNoAuth = axios.create({
    baseURL: API_PATH.API_LINK,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    },
    timeout: 10000
})
axiosNoAuth.interceptors.response.use(
    response => {
        return response.data;
    },
    error => {
        if (error?.response?.data) {
            if (error?.response?.data?.message === 'ExpiredBE' && error?.response?.data?.status === 500) {
                return {status: 200, msg: 'ExpiredBE'}
            } else {
                throw error?.response?.data;
            }
        } else {
            return Promise.reject(error);
        }
    },
)
