import { api } from "@/lib/axios";
import { Withdrawal } from "@/types/withdrawals.types";
import { isAxiosError } from "axios";

export async function createWithdrawn(data: Pick<Withdrawal, "partner_id" | "partner_comissions_id">) {

    const response = await api.post("/withdrawn/create", data).catch(err => {
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