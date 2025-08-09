import { api } from "@/lib/axios";
import { LoginTypes } from "@/schemas/login.schema";
import { RegisterTypes } from "@/schemas/register.schema";
import { Partner } from "@/types/partner.types";
import { ResponseRequestApi } from "@/types/response_request_api.types";
import { isAxiosError } from "axios";

export async function authenticatePartner(): Promise<ResponseRequestApi<Partner>> {
    const response = await api.get('/partner/authenticate').catch(err => {
        console.error(err)
        return err;
    });

    if (isAxiosError(response)) {
        return {
            success: false,
            data: response.response?.data,
            message: response.response?.data.message
        }
    }

    return {
        data: response?.data.data,
        message: response?.data.message,
        success: true
    };
}


export async function partnerLogin(data: LoginTypes): Promise<ResponseRequestApi<string | null>> {
    const response = await api.post("/partner/login", data).catch(err => {
        console.error(err)
        return err;
    });

    if (isAxiosError(response)) {
        return {
            success: false,
            data: response.response?.data,
            message: response.response?.data.message
        }
    }

    return {
        data: response?.data.data.token,
        message: response?.data.message,
        success: true
    };
}


export async function createPartner(data: Omit<RegisterTypes, "confirm_password">): Promise<ResponseRequestApi<{ id: string, token: string } | null>> {
    const response = await api.post("/partner/create", data).catch(err => {
        console.error(err)
        return err;
    });

    if (isAxiosError(response)) {
        return {
            success: false,
            data: response.response?.data,
            message: response.response?.data.message
        }
    }

    return {
        data: response?.data.data,
        message: response?.data.message,
        success: true
    };
}

export async function updatePartner(tagId: string, data: Partial<Partner>) {

    const response = await api.put(`/partner/update/${tagId}`, data).catch(err => {
        console.error(err)
        return err;
    });

    if (isAxiosError(response)) {
        return {
            success: false,
            data: response.response?.data,
            message: response.response?.data.message
        }
    }

    return {
        data: response?.data.data,
        message: response?.data.message,
        success: true
    };

}