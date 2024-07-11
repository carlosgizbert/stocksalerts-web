import { Stock } from "../stock"

export interface PriceEntry {
  id: string
  stock: Stock
  date: string
  time: string
  open_price: string
  close_price: string
  high_price: string
  low_price: string
  created_at: string
}