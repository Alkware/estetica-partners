import { Partner } from "@/types/partner.types";
import { Plan_management } from "@/types/plan_management.types";
import { create } from "zustand";

interface FunctionDependency {
    newDate: (date?: string) => any;
    isCommissionPaid: (id: string, withdrawals: any[]) => boolean;
    getCurrentActivePlan: (plan_management: Plan_management[]) => Plan_management | undefined;
}

interface MetricState {
    metricData: {
        totalCommissions: number;
        comissionAvailable: number;
        withdrawalAvailable: number;
        totalReferrals: number;
        totalUpgrades: number;
        availableCommissions: number;
        totalWithdrawals: number;
        partnerClicks: number;
        growthReferrals: number;
        growthUpdates: number;
        conversionRate: number;
    },
    refreshMetrics: (partner: Partner, functionDependency: FunctionDependency) => MetricState['metricData'];
}

export const useMetricStore = create<MetricState>((set) => ({
    metricData: {
        availableCommissions: 0,
        comissionAvailable: 0,
        totalCommissions: 0,
        totalReferrals: 0,      
        totalUpgrades: 0,
        totalWithdrawals: 0,
        withdrawalAvailable: 0,
        partnerClicks: 0,
        growthReferrals: 0,
        growthUpdates: 0,
        conversionRate: 0
    },
    refreshMetrics: (partner: Partner, { isCommissionPaid, newDate, getCurrentActivePlan }: FunctionDependency) => {
        const totalCommissions = partner?.comissions.reduce((acc, comission) => acc + comission.commission_value, 0) || 0;
        const comissionAvailable = partner?.comissions.reduce((acc, comission) => acc + ((comission.available && !isCommissionPaid(comission.id, partner.withdrawals)) ? comission.commission_value : 0), 0) || 0;
        const withdrawalAvailable = partner?.withdrawals.filter(withdrawal => newDate().isSame(withdrawal.created_at, "month")).length || 0;
        const totalReferrals = partner.referrals.length;
        const totalUpgrades = partner.referrals.filter(user => getCurrentActivePlan(user.plan_management)).length;
        const availableCommissions = partner.comissions.reduce((acc, comission) => acc + (comission.available ? comission.commission_value : 0), 0);
        const totalWithdrawals = partner.withdrawals.length;
        const partnerClicks = partner?.click_link.length || 0;
        const growthReferrals = (partner?.referrals.filter(user => newDate().isSame(user.created_at, "month")).length * 100) / partner?.referrals.length || 0    
        const growthUpdates = (partner.referrals.filter(user => getCurrentActivePlan(user.plan_management) && newDate().isSame(user.created_at, "month")).length * 100) / partner.referrals.filter(user => getCurrentActivePlan(user.plan_management)).length || 0
        const conversionRate = Math.floor((totalUpgrades * 100) / totalReferrals) || 0;

        const metricData = {
            totalReferrals,
            totalUpgrades,
            totalCommissions,
            availableCommissions,
            totalWithdrawals,
            comissionAvailable,
            withdrawalAvailable,
            partnerClicks,
            growthReferrals,
            growthUpdates,
            conversionRate
        }

        set({
            metricData
        });

        return metricData;
    }
}))