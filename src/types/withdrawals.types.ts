import { Partner } from "./partner.types"

export interface Withdrawal {
    id: string
    partner_id: string
    admin_id: string | null

    withdrawn_type: string;
    status: boolean
    proof_of_payment: string | null
    partner_comissions_id: string[]

    partner: Partner

    paid_at?: string
    created_at: string
}