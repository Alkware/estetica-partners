import { MONTHS } from '@/variables.global';
import { useFormatText } from './useFormatText';
import moment from 'moment-timezone';

export function useDate() {
    const { addLeadingZeroToNumber } = useFormatText();

    // FUNÇÃO RESPONSÁVEL POR RETORNAR A DATA ATUAL OU A DATA QUE É RECEBIDA EM VARIÁVEL...
    const newDate = (date?: string | null) => date ? moment.tz(moment(date).locale("pt-br"), "America/Sao_Paulo") : moment.tz(moment().locale("pt-br"), "America/Sao_Paulo")

    // RETORNA O MÊS ATUAL NO FORMATO DE NÚMERO (0-11)...
    const getMonthWithNumber = (date?: string) => {
        const currentMonth = addLeadingZeroToNumber(newDate(date).set({ month: newDate(date).month() + 1 }).month());
        return currentMonth === "00" ? "12" : currentMonth
    }

    // RETORNA O MÊS NO FORMATO DE STRING...
    const getMonthWithString = (date?: string) => MONTHS.find(month => month.english === newDate(date).format("MMMM"))?.name || "-";

    // RETORNA UMA DATA FORMATADA...
    const formatDate = ({ format }: { format: string }, date?: string) => {
        const parsedDate = newDate(date);

        const tokens: Record<string, string> = {
            "minute": parsedDate.minutes().toString().padStart(2, "0"),
            "hour": parsedDate.hour().toString().padStart(2, "0"),
            "day": parsedDate.date().toString(),
            "month": getMonthWithString(date),
            "m_number": parsedDate.month().toString(),
            "year": parsedDate.year().toString(),
        }

        let formatedDate = format;

        for (let token in tokens) {
            formatedDate = formatedDate.toLowerCase().replaceAll(token, tokens[token])
        }

        return formatedDate
    }

    const fromNow = (date: string) => {
        const daysAgo = newDate().diff(newDate(date), 'days');

        return {
            days: daysAgo,
            label: `Há ${daysAgo} dias atrás`
        }
    }

    return {
        newDate,
        getMonthWithNumber,
        getMonthWithString,
        formatDate,
        fromNow
    };
}