import axios from "axios";

// instance
export const instance = axios.create({
    withCredentials: true,
    baseURL: "https://neko-back.herokuapp.com/2.0"
    //baseURL: "http://localhost:7542/2.0"
})

//api
export const resetPasswordAPI = {
    resetPassword(email: string, from: string, message: string) {
        return instance.post<ResetPasswordResponseType>("/auth/forgot", { email, from, message })
    },
}

//types
export type ResetPasswordResponseType = {
    info: string,
    error: string;
}