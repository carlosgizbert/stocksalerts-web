import { Stock } from "@/models/stock";
import { timeAgo } from '@/utils/index'

interface Props {
  stock: Stock;
  columnKey: string | React.Key;
}

export const RenderCell = ({ stock, columnKey }: Props) => {
  // @ts-ignore
  const cellValue = stock[columnKey];
  switch (columnKey) {
    case "symbol":
      return (
        <div>
          <span>{stock.symbol}</span>
        </div>
      );
    case "lower_tunnel_limit":
      return (
        <div>
          <span>{stock.lower_tunnel_limit}</span>
        </div>
      );
    case "upper_tunnel_limit":
      return (
        <div>
          <span>{stock.upper_tunnel_limit}</span>
        </div>
      );

    case "created_at":
      return (
        <div>
          <span>{timeAgo(new Date(stock.created_at))}</span>
        </div>
      );
    default:
      return cellValue;
  }
};
