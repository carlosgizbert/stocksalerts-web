import { PriceEntry } from "@/models/priceEntry";
import { Stock } from "@/models/stock";

export interface GetStocksResponse extends Stock {}
export interface CreateStockPayload {
  symbol: string
  lower_tunnel_limit: number
  upper_tunnel_limit: number
  check_frequency: number
}
export interface CreateStockResponse extends Stock {}

export interface GetPriceEntriesResponse extends PriceEntry {}

export interface DeleteStockPayload {
  id: string
}

export interface EditStockPayload {
  id: string
  symbol?: string
  lower_tunnel_limit: number
  upper_tunnel_limit: number
  check_frequency: number
}