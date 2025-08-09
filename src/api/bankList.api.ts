import axios from "axios";

export async function getBankList(): Promise<Array<{ name: string }> | void> {

    const response = await axios.get("https://brasilapi.com.br/api/banks/v1").catch(err => console.error(err));

    if(!response) return;

    return response.data;
}