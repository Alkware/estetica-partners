import { Partner } from "@/types/partner.types";
import { Plan_management } from "@/types/plan_management.types";
import { User } from "@/types/user.types";
import { Moment } from "moment-timezone";
import { create } from "zustand";

interface FunctionDependency {
    newDate: (date?: string) => Moment;
    isCommissionPaid: (id: string, withdrawals: any[]) => boolean;
    getCurrentActivePlan: (plan_management: Plan_management[]) => Plan_management | undefined;
}

interface MetricState {
    metricData: {
        totalCommissions: number;
        comissionAvailable: number;
        totalReferrals: number;
        totalUpgrades: number;
        availableCommissions: number;
        totalWithdrawals: number;
        partnerClicks: number;
        growthReferrals: number;
        growthUpdates: number;
        conversionRate: number;
        activeUsers: User[] | null;
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
        partnerClicks: 0,
        growthReferrals: 0,
        growthUpdates: 0,
        conversionRate: 0,
        activeUsers: null,
    },
    refreshMetrics: (partner: Partner, { isCommissionPaid, newDate, getCurrentActivePlan }: FunctionDependency) => {
        const totalCommissions = partner?.comissions.reduce((acc, comission) => acc + comission.commission_value, 0) || 0;
        const comissionAvailable = partner?.comissions.reduce((acc, comission) => acc + ((comission.available && !isCommissionPaid(comission.id, partner.withdrawals)) ? comission.commission_value : 0), 0) || 0;
        const totalReferrals = partner.referrals.length;
        const totalUpgrades = partner.referrals.filter(user => getCurrentActivePlan(user.plan_management)).length;
        const availableCommissions = partner.comissions.reduce((acc, comission) => acc + (comission.available ? comission.commission_value : 0), 0);
        const totalWithdrawals = partner.withdrawals.reduce((acc, withdrawn) => acc + (!withdrawn.status ? 0 : partner.comissions.filter(commission => withdrawn.partner_comissions_id.includes(commission.id)).reduce((acc, com) => acc + com.commission_value, 0)), 0);
        const partnerClicks = partner?.click_link.length || 0;
        const growthReferrals = (partner?.referrals.filter(user => newDate().isSame(user.created_at, "month")).length * 100) / partner?.referrals.length || 0
        const growthUpdates = (partner.referrals.filter(user => getCurrentActivePlan(user.plan_management) && newDate().isSame(user.created_at, "month")).length * 100) / partner.referrals.filter(user => getCurrentActivePlan(user.plan_management)).length || 0
        const conversionRate = Math.floor((totalUpgrades * 100) / totalReferrals) || 0;
        const activeUsers = partner.referrals.filter(user =>
            !getCurrentActivePlan(user.plan_management) &&
            newDate(user.created_at).isSameOrBefore(newDate().subtract(7, "day")) &&
            user.schedulings.length &&
            newDate(user.schedulings.sort((a, b) => newDate(b.created_at).valueOf() - newDate(a.created_at).valueOf() )[0].created_at).isSameOrAfter(newDate().subtract(7, "day"))
        );

        const metricData = {
            totalReferrals,
            totalUpgrades,
            totalCommissions,
            availableCommissions,
            totalWithdrawals,
            comissionAvailable,
            partnerClicks,
            growthReferrals,
            growthUpdates,
            conversionRate,
            activeUsers
        }

        set({
            metricData
        });

        return metricData;
    }
}))