import { PriceEntry } from "@/models/priceEntry";
import { Stock } from "@/models/stock";

export interface GetStocksResponse extends Stock {}
export interface CreateStockPayload {
  symbol: string
  description: string
  lower_tunnel_limit: string
  upper_tunnel_limit: string
  check_frequency: string
}
export interface CreateStockResponse extends Stock {}

export interface GetPriceEntriesResponse extends PriceEntry {}
