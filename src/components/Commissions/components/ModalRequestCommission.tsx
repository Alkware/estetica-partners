import { createWithdrawn } from "@/api/withdrawn.api";
import { PopOver } from "@/components/ui/modal/templates/PopOver";
import { ModalContext } from "@/context/ModalContext";
import { useMask } from "@/hooks/useMask";
import { useAuthStore } from "@/stores/authStore";
import { Commission } from "@/types/comission.types";
import { Download, X } from "lucide-react";
import { useContext, useState } from "react";

type ModalRequestCommissionProps = {
    partnerId: string;
    modalId: string
    commissionsAvailable: Commission[]
};

export function ModalRequestCommission({ partnerId, commissionsAvailable, modalId }: ModalRequestCommissionProps) {
    const { clearModal, setModalContent } = useContext(ModalContext)
    const [commissionSelected, setCommission] = useState<Commission[]>([]);
    const { maskToMoney } = useMask();
    const authenticate = useAuthStore(store => store.authenticate);

    function handleSelectCommission(commission: Commission) {
        if (commissionSelected.some(select => select.id === commission.id)) {
            setCommission(values => values.filter(value => value.id !== commission.id));
        } else setCommission(values => values?.length ? [...values, commission] : [commission]);
    }


    async function handleRequestWithdrawal() {
        const response = await createWithdrawn({
            partner_id: partnerId,
            partner_comissions_id: commissionSelected.map(commission => commission.id)
        });

        if (!response.success) {
            setModalContent({
                id: "error-withdrawn",
                component: <PopOver
                    id="error-withdrawn"
                    message={response.message}
                    functionAfterComplete={() => clearModal(modalId)}
                />
            })
            return;
        }


        setModalContent({
            id: "success-withdrawn",
            component: <PopOver
                id="success-withdrawn"
                message={response.message}
                functionAfterComplete={() => clearModal(modalId)}
            />
        });

        authenticate();
    }

    return (
        <div className="w-screen h-screen md:h-3/4 max-w-[480px] bg-white flex flex-col items-center gap-6 p-4">

            <div className="w-full flex items-center justify-between px-1">
                <h2 className="text-2xl text-text">Solicitação de Saque</h2>
                <X
                    className="size-6 cursor-pointer"
                    onClick={() => clearModal(modalId)}
                />
            </div>

            <h3 className="text-lg text-text">Comissões disponíveis</h3>

            <div className="w-full h-[60vh] overflow-auto p-2 px-4 flex flex-col gap-3">
                {commissionsAvailable?.map(commission =>
                    <div
                        key={commission.id}
                        onClick={() => handleSelectCommission(commission)}
                        className="w-full flex justify-between gap-2 items-center p-1 border border-primary hover:scale-105 transition-transform cursor-pointer rounded-md"
                    >
                        <span
                            data-isselected={commissionSelected.some(select => select.id === commission.id)}
                            className="size-4 rounded-full bg-transparent data-[isselected=true]:bg-primary border border-primary-hover"
                        ></span>

                        <h2>{commission.plan_management.user.user_name}</h2>

                        <h3>{maskToMoney(commission.commission_value)}</h3>
                    </div>
                )}
            </div>


            <div className="w-full p-2 py-4 flex flex-col items-center shadow-[2px_2px_10px_1px_#0002] rounded">
                <h2>Valor do saque:</h2>
                <span
                    className="text-4xl text-primary font-bold"
                >{maskToMoney(commissionSelected.reduce((total, commission) => commission.commission_value + total, 0))}</span>
                <button
                    className="cursor-pointer mt-12 bg-gradient-to-r whitespace-nowrap from-[#00c8ff] to-[#0d96eb] text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200 flex items-center gap-2"
                    onClick={handleRequestWithdrawal}
                >
                    <Download size={20} />
                    Solicitar Saque
                </button>
            </div>
        </div>
    );
}