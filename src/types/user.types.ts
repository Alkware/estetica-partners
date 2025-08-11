import { Plan_management } from "./plan_management.types"

export interface User {
  id: string
  google_id?: string
  referred_by_id?: string // FK opcional: quem indicou este usuário
  partner_id?: string

  picture?: string
  user_name: string
  cell_phone?: string
  email?: string
  password?: string
  origins?: string[]
  last_access_platform?: { platform: 'pwa' | 'navigator', last_access_date: string };
  default_message_whatsapp?: string
  user_insights?: [{ ask: string, answer: string }]

  plan_management: Plan_management[]
  schedulings: Array<{ created_at: string }>;

  updated_at?: string
  created_at: string
}