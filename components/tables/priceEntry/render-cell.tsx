import { PriceEntry } from "@/models/priceEntry";

interface Props {
  priceEntry: PriceEntry;
  columnKey: string | React.Key;
}

export const RenderCell = ({ priceEntry, columnKey }: Props) => {

  const { stock, date, time, open_price, close_price, high_price, low_price, created_at } = priceEntry

  // @ts-ignore
  const cellValue = stock[columnKey];
  switch (columnKey) {
    case "stock":
      return (
        <div>
          <span>{stock.symbol}</span>
        </div>
      );
    case "date":
      return (
        <div>
          <span>{date}</span>
        </div>
      );
    case "time":
      return (
        <div>
          <span>{time}</span>
        </div>
      );

    case "open_price":
      return (
        <div>
          <span>{open_price}</span>
        </div>
      );

    case "close_price":
      return (
        <div>
          <span>{close_price}</span>
        </div>
      );

    case "created_at":
      return (
        <div>
          <span>{created_at}</span>
        </div>
      );

    // case "created_at":
    //   return (
    //     <div className="flex items-center gap-4 ">
    //       <div>
    //         <Tooltip content="Details">
    //           <button onClick={() => console.log("View user", user.id)}>
    //             <EyeIcon size={20} fill="#979797" />
    //           </button>
    //         </Tooltip>
    //       </div>
    //       <div>
    //         <Tooltip content="Edit user" color="secondary">
    //           <button onClick={() => console.log("Edit user", user.id)}>
    //             <EditIcon size={20} fill="#979797" />
    //           </button>
    //         </Tooltip>
    //       </div>
    //       <div>
    //         <Tooltip
    //           content="Delete user"
    //           color="danger"
    //           onClick={() => console.log("Delete user", user.id)}
    //         >
    //           <button>
    //             <DeleteIcon size={20} fill="#FF0080" />
    //           </button>
    //         </Tooltip>
    //       </div>
    //     </div>
    //   );
    default:
      return cellValue;
  }
};
