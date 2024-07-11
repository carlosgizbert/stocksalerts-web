import { Stock } from "@/models/stock";

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
          <span>{stock.created_at}</span>
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
