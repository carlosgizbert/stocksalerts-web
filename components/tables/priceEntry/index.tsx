import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Pagination,
  getKeyValue,
} from "@nextui-org/react";
import { useGetPriceEntries } from "@/services/stocks";
import { useState, useMemo, useEffect } from "react";
import { PriceEntry } from "@/models/priceEntry";

export const PriceEntryTable = () => {
  const [prices, setPrices] = useState<PriceEntry[]>([]);
  const [page, setPage] = useState(1);
  const [isLoadingPrices, setIsLoadingPrices] = useState(true);

  const { data, isLoading } = useGetPriceEntries();

  const rowsPerPage = 24;

  useEffect(() => {
    if (data) {
      setPrices(data);
      setIsLoadingPrices(false);
    }
  }, [data]);

  const pages = Math.ceil(prices.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return prices.slice(start, end);
  }, [page, prices]);

  if (isLoading || isLoadingPrices) {
    return (
      <div className="flex justify-center items-center h-48">
        Carregando...
      </div>
    );
  }

  return (
    <Table
      aria-label="Example table with client side pagination"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="secondary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
      classNames={{
        wrapper: "min-h-[222px]",
      }}
    >
      <TableHeader>
        <TableColumn key="stock.symbol">Símbolo</TableColumn>
        <TableColumn key="date">Dia</TableColumn>
        <TableColumn key="time">Hora</TableColumn>
        <TableColumn key="open_price">Preço de Abertura</TableColumn>
        <TableColumn key="close_price">Preço de Fechamento</TableColumn>
        <TableColumn key="created_at">Data de Captura</TableColumn>
      </TableHeader>
      <TableBody items={items}>
        {(price) => (
          <TableRow key={price.id}>
            {(columnKey) => (
              <TableCell>
                {columnKey === "stock.symbol"
                  ? price.stock.symbol
                  : getKeyValue(price, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
