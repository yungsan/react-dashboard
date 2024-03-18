import Cookies from 'universal-cookie';
import { ITEM_PER_PAGE } from './definitions';
const cookies = new Cookies();

export function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export enum Routes {
    login = '/auth/login',
    register = '/auth/register',
    dashboard = '/dashboard',
    products = '/products',
}

export enum Roles {
    customer = 'customer',
    shop = 'shop',
    admin = 'admin',
}

export function setAuth(token: string, exp: number) {
    const expires = new Date();
    expires.setHours(expires.getHours() + exp / 60);

    console.log(expires.toLocaleString());

    return cookies.set('access_token', token, { expires, path: '/' },);
}

export function getAccessToken() {
    return cookies.get('access_token');
}

export function isLoggedIn() {
    return cookies.get('access_token') !== undefined;
}

export function pagination(rows: number) {
    let total = rows / ITEM_PER_PAGE;
    if (total % 1 !== 0) {
        total = total - total % 1 + 1;
    }
    return total;
}

export function sleep(ms: number) {
    return new Promise((r) => setTimeout(r, ms));
}

export function removeToken() {
    cookies.remove('access_token', { path: '/' });
}
