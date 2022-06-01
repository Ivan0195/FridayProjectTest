import axios from "axios";
import {UpdatingDataType} from "../../bll/profile-reducer";

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
})

export const profileApi = {
    me() {
        return instance.get<ResponseAuthType>('auth/me')
    },
    updateMe(payload: UpdatingDataType) {
        return instance.put<UpdatingDataType, ResponseAuthType>('auth/me', payload)
    }
}

export type ResponseAuthType =
    {
        _id: string;
        email: string;
        name: string;
        avatar?: string;
        publicCardPacksCount: number; // количество колод

        created: Date;
        updated: Date;
        isAdmin: boolean;
        verified: boolean; // подтвердил ли почту
        rememberMe: boolean;

        error?: string;
    }
