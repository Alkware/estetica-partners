export function useMask() {

    /**
 * Função responsável por adicionar mascara ao valor em reais. Ex: R$ 99,99
 * @param cell_phone {string}
 * @returns 
 */
    const maskToMoney = (num: string | number | undefined, isSign: boolean = true) => {
        if (!num) return isSign ? "R$ 0,00" : "0,00";

        let value = Number(num.toString().replace(/(?!^-)[^0-9]/g, ''));

        if (isNaN(value)) {
            console.error("Unable to convert the value to money. cause the value is invalid.");
            return isSign ? "R$ 0,00" : "0,00"
        }
        // Adiciona o separador de milhares e o símbolo da moeda
        const formattedValue = new Intl.NumberFormat("pt-BR", {
            style: 'currency',
            currency: 'BRL',
        }).format(value / 100);

        return isSign ? formattedValue : formattedValue.replace("R$", "").trim()
    }

    /**
     * Função responsável por adicionar mascara ao número de telefone do usuário. ex: (11) 9 1111-1111
     * @param cell_phone {string}
     * @returns 
     */
    const maskToCellPhone = (cell_phone: string | undefined) => {
        if (!cell_phone) return "";
        const numeric = cell_phone?.replace(/[^\d]/g, '');
        let cellPhone;
        if (numeric.length === 13) {
            cellPhone = numeric.replace(/^(\d{2})(\d{2})(\d{1})(\d{4})(\d{4})$/, '+$1 ($2) $3 $4-$5');
        } else if (numeric.length === 11) {
            cellPhone = numeric.replace(/^(\d{2})(\d{1})(\d{4})(\d{4})$/, '($1) $2 $3-$4');
        } else {
            cellPhone = numeric.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
        }

        return cellPhone;
    }

    /**
  * Automatically formats a Pix key based on its detected type.
  * Supported types:
  * - CPF (11 digits)
  * - CNPJ (14 digits)
  * - Phone (10 to 13 digits, with or without DDI)
  * - Email (contains '@')
  * - Random key (UUID format or 32-char hash)
  * If the type is unknown, returns the raw input.
  */
    function maskToPixKey(key: string): { type: string, value: string } {
        const raw = key.trim();
        const numericOnly = raw.replace(/\D/g, '');

        // Format CPF: 000.000.000-00
        if (/^\d{11}$/.test(numericOnly)) {
            return {
                type: "CPF",
                value: numericOnly.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
            }
        }

        // Format CNPJ: 00.000.000/0000-00
        if (/^\d{14}$/.test(numericOnly)) {
            return {
                type: "CNPJ",
                value: numericOnly.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")
            }
        }

        // Format phone numbers: +55 (11) 91234-5678 or (11) 91234-5678
        if (/^\d{10,13}$/.test(numericOnly)) {
            const match = numericOnly.match(/^(\d{2,3})?(\d{2})(\d{4,5})(\d{4})$/);
            if (match) {
                const [_, ddi, ddd, first, last] = match;
                return {
                    type: "Telefone",
                    value: `${ddi ? `+${ddi} ` : ''}(${ddd}) ${first}-${last}`
                }
            }
        }

        // Format email: no changes
        if (/\S+@\S+\.\S+/.test(raw)) {
            return {
                type: "Email",
                value: raw
            };
        }

        // Format UUID or 32-char random key: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
        if (/^[a-f0-9]{32}$/i.test(raw)) {
            return {
                type: "Chave Aleatória",
                value: raw.replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/, "$1-$2-$3-$4-$5")
            }
        }

        // Already formatted UUID
        if (/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(raw)) {
            return {
                type: "Chave Aleatória",
                value: raw
            }
        }

        // Unknown format: return as-is
        return {
            type: "unknown",
            value: raw
        };
    }




    return {
        maskToCellPhone,
        maskToMoney,
        maskToPixKey
    };
}