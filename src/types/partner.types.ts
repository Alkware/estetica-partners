import { PixInfoType } from "@/schemas/pixInfo.schema"
import { Commission } from "./comission.types"
import { User } from "./user.types"
import { Withdrawal } from "./withdrawals.types"

export interface Partner {
  id: string

  tag_id: string
  name: string
  email: string
  password: string
  click_link: string[]
  is_active: boolean;
  user_fremium: number;
  pix_info: PixInfoType[]

  referrals: User[]
  comissions: Commission[],
  withdrawals: Withdrawal[]

  created_at: string
}