import { plan_management } from "./plan_management.types"

export interface plan {
  id?: string

  tag?: string
  plan_name: string
  description?: string
  resources?: string[]
  plan_value: number
  link?: string

  plan_management?: plan_management[]

  created_at?: string
  updated_at?: string
}