import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',                         //process.env.REACT_APP_API_KEY,
    withCredentials: true,
});

export const api = {
    getCards(page: number, pageCount: number, packName: string) {
        return instance.get(`cards/pack?page=${page}&pageCount=${pageCount}&packName=${packName}`)
    }
}
