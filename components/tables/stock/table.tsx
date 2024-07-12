import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Pagination,
  Selection,
  SortDescriptor,
} from "@nextui-org/react";
import { columns } from "./data";
import { capitalize } from "./utils";
import { useGetStocks } from "@/services/stocks";
import { Stock } from "@/models/stock";
import FeatherIcon from "feather-icons-react";
import { ChangeEvent, Key, useCallback, useMemo, useState } from "react";
import { AddStock } from "@/components/stocks/add-stock";
import { DeleteStock } from "@/components/stocks/delete-stock";
import { EditStock } from "@/components/stocks/edit-stock";

const INITIAL_VISIBLE_COLUMNS = [
  "symbol",
  "lower_tunnel_limit",
  "upper_tunnel_limit",
  "actions",
];

export function StocksTable() {
  const [filterValue, setFilterValue] = useState("");
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "symbol",
    direction: "ascending",
  });

  const { data, isLoading, error } = useGetStocks();

  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredStocks = [...(data || [])];

    if (hasSearchFilter) {
      filteredStocks = filteredStocks.filter((stock) =>
        stock.symbol.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredStocks;
  }, [data, filterValue, hasSearchFilter]);


  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a: Stock, b: Stock) => {
      const first = a[sortDescriptor.column as keyof Stock];
      const second = b[sortDescriptor.column as keyof Stock];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = useCallback((stock: Stock, columnKey: Key) => {
    const cellValue = stock[columnKey as keyof Stock];

    switch (columnKey) {
      case "symbol":
        return (
          <span className="font-semibold">{stock.symbol}</span>
        );
      case "lower_tunnel_limit":
        return <span>R${stock.lower_tunnel_limit}</span>;
      case "upper_tunnel_limit":
        return <span>R${stock.upper_tunnel_limit}</span>;
      case "actions":
        return (
          <div className="relative flex justify-end">
            <EditStock data={stock} />
            <DeleteStock data={{
              id: stock.id,
              symbol: stock.symbol
            }} />
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            variant="bordered"
            placeholder="Buscar símbolo do ativo..."
            startContent={
              <FeatherIcon icon="search" size={18} strokeWidth={1.5} />
            }
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={
                    <FeatherIcon icon="plus" size={18} strokeWidth={1.5} />
                  }
                  variant="flat"
                >
                  Colunas
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <AddStock />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            {data?.length} ativos
          </span>
          <label className="flex items-center text-default-400 text-small">
            Linhas por página:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    onSearchChange,
    visibleColumns,
    data?.length,
    onRowsPerPageChange,
    onClear,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="success"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Anterior
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Próxima
          </Button>
        </div>
      </div>
    );
  }, [page, pages, onPreviousPage, onNextPage]);

  if (isLoading) {
    return <div>Atualizando...</div>;
  }

  if (error) {
    return <div>Erro ao obter ativos</div>;
  }

  return (
    <Table
      isStriped
      aria-label="Stocks table with custom cells, pagination and sorting"
      bottomContent={bottomContent}
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"Nenhum resultado"}>
        {sortedItems.map((stock) => (
          <TableRow key={stock.id}>
            {(columnKey) => (
              <TableCell>{renderCell(stock, columnKey)}</TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
