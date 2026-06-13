import axios from "axios";

//careful when using this frontend as its only local!
//change if you planning to host the application!
const API_BASE = 'http://localhost:8080';
//doubt anyone will use this tool but if you want to make a server ready version email me with "PLEASE DO: <the feature youll need>"
//if Im free Ill consider doing it
export const client = axios.create({
    baseURL: API_BASE
});
export function setAuthToken(token: string) {
    client.defaults.headers.common['Authorization'] = 'Bearer ${token}';
}
export function clearAuthToken() {
    delete client.defaults.headers.common['Authorization'];
}