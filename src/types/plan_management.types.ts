import { Commission } from "./commission.types"
import { plan } from "./plan.types"
import { User } from "./user.types"

export interface Plan_management {
  id: string
  user_id: string
  plan_id?: string

  payment_method: string
  amount_paid: number
  
  partner_comissions?: Commission
  user: User
  plan: plan
  
  paid_at: string
  end_at: string
  updated_at?: string
}
