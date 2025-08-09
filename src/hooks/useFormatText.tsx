export function useFormatText() {

    /**
     * Função responsável por adicionar um zero, caso o número for menor que 10...
     * @param nmr Numero a ser convertido 
     * @returns Retorna um numero formatado
     */
    const addLeadingZeroToNumber = (nmr: number) => {
        const convertNumberToString = nmr.toString();
        const addLeadingZero = convertNumberToString.padStart(2, "0");
        return addLeadingZero;
    }



    /**
     * Função responsável por transformar uma string formatada para money em number novamente...
     * @param money 
     * @returns 
     */
    const convertMoneyToNumber = (money?: string) => {
        if(!money) return 0
        return Number(money.replaceAll(".", "").replaceAll(",", ""));
    }


    /**
     * Função responsável por adicionar caixa alta na primeira letra da string que for recebida...
     * @param text 
     * @returns 
     */
    const firstLetterUppercase = (text: string) => {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    /**
     * Função responsável por substituir as chaves do texto pelos valores das propriedades
     * @param message 
     * @param keys 
     * @returns 
     */
    function replacePlaceholders(message: string, keys: any) {
        let finalMessage = message;
        for (const key in keys) {
            finalMessage = finalMessage.replace(new RegExp(`\{\{${key}\}\}`, 'g'), keys[key]);
        }
        return finalMessage;
    }

    return {
        addLeadingZeroToNumber,
        convertMoneyToNumber,
        firstLetterUppercase,
        replacePlaceholders
    }
};