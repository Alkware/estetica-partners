import { getBankList } from "@/api/bankList.api";
import { SelectModal, SelectModalProps } from "@/components/ui/Select";
import { useEffect, useState } from "react";

export function SelectBank(props: SelectModalProps) {
    const [bankList, setBankList] = useState<Array<{ label: string, value: string }>>([]);

    useEffect(() => {
        (async () => {
            const allBanks = await getBankList();

            if (!allBanks) return;

            const topBankCodes = [1, 33, 104, 237, 341, 318, 290, 323, 756, 748, 380, 197, 260, 77, 129, 364, 265, 102, 735, 85, 707, 95, 120, 25, 69];

            const filteredBanks = allBanks.filter((bank: any) =>
                topBankCodes.includes(parseInt(bank.code))
            ).map(bank => ({ label: bank.name, value: bank.name }));

            // Ordenar por nome (opcional)
            filteredBanks.sort((a: any, b: any) => a.label.localeCompare(b.name));

            setBankList(filteredBanks);
        })();
    }, [])


    return (
        bankList.length &&
        <SelectModal
            {...props}
            options={bankList}
        />
    );
}