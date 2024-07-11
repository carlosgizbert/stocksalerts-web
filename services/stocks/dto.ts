import { PriceEntry } from "@/models/priceEntry";
import { Stock } from "@/models/stock";

export interface GetStocksResponse extends Stock {}

export interface GetPriceEntriesResponse extends PriceEntry {}
