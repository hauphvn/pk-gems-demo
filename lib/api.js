import axios from "axios";
export const API_PATH = {
    API_LINK: 'https://api-dev-pkg.azurewebsites.net/api',
    REPORT: {
        BY_YEAR: '/Report/BaoCaoTongDoanhThuTheoNam'
    },
    RESET_PWD_STAFF: '/reset-password-staff-from-mobile-app',
    LOGOUT: '/user/log-out',

};
export const axiosAuth = axios.create({
    baseURL: API_PATH.API_LINK,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    },
    timeout: 10000
})
axiosAuth.interceptors.response.use(
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
