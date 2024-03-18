import axios from "axios";
import { Roles, getAccessToken, removeToken } from "./untils";
import Cookies from "universal-cookie";

const URL = 'http://127.0.0.1:8000/api';

enum Prefix {
    auth = `${URL}/auth`,
    common = `${URL}/common`,
    products = `${URL}/products`,
    users = `${URL}/products`,
    categories = `${URL}/categories`,
    orders = `${URL}/orders`,
}

export async function getAllFromTable({
    table,
    offset,
    limit,
    keyword,
}: {
    offset: number,
    limit: number,
    table: string,
    keyword: any,
    auth: boolean
}) {
    try {
        const url = `${URL}/${table}?limit=${limit}&offset=${offset}&keyword=${keyword}`;
        const token = getAccessToken();
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        };
        const response = await axios.get(url, config);
        return response.data;

    } catch (error) {
        console.log(error);
    }
}

export async function getFromTable({
    id,
    table,
}: {
    id: any,
    table: string,
}) {
    try {
        const url = `${URL}/${table}/detail?productId=${id}`;
        const response = await axios.get(url);
        const data = response.data;
        return data;

    } catch (error) {
        console.log(error);
    }
}

export async function getTotalRows(table: string) {
    try {
        const token = getAccessToken();
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        };

        const url = `${Prefix.common}/totalRows?table=${table}`;
        const response = await axios.get(url, config);

        return response.data;

    } catch (error) {
        console.log(error);
    }
    return 0;
}

export async function register(data: {
    'full_name': string,
    'email': string,
    'password': string,
    'password_confirmation': string,
}) {

    const user = await axios.post(`${Prefix.auth}/register`, data);
    return user.data;
}

export async function login(data: {
    'email': string,
    'password': string,
}) {

    try {
        const user = await axios.post(`${Prefix.auth}/login`, data);
        console.log(user.data);

        return user;
    } catch (error) {
        console.log('login error');
        throw error;
    }
}

export async function logout() {
    const token = getAccessToken();
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    try {
        const user = await axios.post(`${Prefix.auth}/logout`, null, config);
        const cookies = new Cookies();
        cookies.remove('access_token');
        return user;
    } catch (error) {
        console.log('logout error', error);
    }
}

export async function getCurrentUser() {
    const token = getAccessToken();
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    try {
        const user = await axios.get(`${Prefix.auth}/user-profile`, config);
        if (user.data['role'] === Roles.customer) {
            throw 'Access denied';
        }
        return user;

    } catch (error) {
        console.log(error);
        removeToken();
    }
}

export async function createNewProduct(data: FormData) {
    const token = getAccessToken();
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    const product = axios.post(`${Prefix.products}/create`, data, { headers });
    return product;
}

export async function updateProduct(data: FormData, id: string) {
    const token = getAccessToken();
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    const product = axios.post(`${Prefix.products}/update?productId=${id}`, data, { headers });
    return product;
}
