import { Partner } from "./partner.types"
import { Plan_management } from "./plan_management.types"

export interface Commission {
    id: string
    user_id: string
    partner_id: string
    commission_value: number
    comission_role: string
    available: boolean
    is_paid: boolean
    paid_at: string | null

    plan_management: Plan_management
    partner: Partner

    created_at: string
    updated_at: string
}