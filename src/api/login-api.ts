import axios from "axios";

// instance
export const instance = axios.create({
    withCredentials: true,
    baseURL: "https://neko-back.herokuapp.com/2.0"
    //baseURL: "http://localhost:7542/2.0"
})

//api
export const loginAPI = {
    login(email: string, password: string, rememberMe: boolean) {
        return instance.post<LoginResponseType>("/auth/login", { email, password, rememberMe })
    },
    logout() {
        return instance.delete("/auth/me")
    },
}

//types
export type LoginResponseType = {
    _id: string
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number
    created: Date
    updated: Date
    isAdmin: boolean
    verified: boolean
    rememberMe: boolean
    error?: string
}