import { Plan_management } from "@/types/plan_management.types";
import { useDate } from "./useDate";
import { Withdrawal } from "@/types/withdrawals.types";

export function usePlanManagement() { 
    const { newDate } = useDate();

    // Função responsável por obter o plano ativo atual do usuário
    function getCurrentActivePlan(planManagement: Plan_management[]): Plan_management | undefined {
        if(!planManagement.length) return;

        const currentPlan = planManagement.sort((a, b) => newDate(b.paid_at).valueOf() - newDate(a.paid_at).valueOf())[0];
        const isActive = newDate().isSameOrAfter(currentPlan.paid_at) && newDate().isSameOrBefore(currentPlan.end_at);

        if(!isActive) return;

        return currentPlan
    };

    // Verifica se a comissão já foi paga
    function isCommissionPaid(comission_id: string, withdrawals: Withdrawal[]): boolean {
        const isPaid = withdrawals.some(withdrawal => withdrawal.partner_comissions_id.includes(comission_id) && withdrawal.status);
        return isPaid
    }

    return {
        getCurrentActivePlan,
        isCommissionPaid
    };
}