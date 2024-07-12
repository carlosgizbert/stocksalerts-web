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
  Tooltip,
} from "@nextui-org/react";
import { columns } from "./data";
import { capitalize } from "./utils";
import { useGetPriceEntries } from "@/services/stocks";
import FeatherIcon from "feather-icons-react";
import { ChangeEvent, Key, useCallback, useMemo, useState } from "react";
import { PriceEntry } from "@/models/priceEntry";
import { timeAgo } from "@/utils";

const INITIAL_VISIBLE_COLUMNS = [
  "symbol",
  "open_price",
  "close_price",
  "created_at",
  "actions",
];

export function PriceEntryTable() {
  const [filterValue, setFilterValue] = useState("");
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "symbol",
    direction: "ascending",
  });

  const { data, isLoading, error } = useGetPriceEntries();

  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredPrices = [...(data || [])];

    if (hasSearchFilter) {
      filteredPrices = filteredPrices.filter((price) =>
        price.stock.symbol.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredPrices;
  }, [data, filterValue, hasSearchFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a: PriceEntry, b: PriceEntry) => {
      const first = a[sortDescriptor.column as keyof PriceEntry];
      const second = b[sortDescriptor.column as keyof PriceEntry];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = useCallback((price: PriceEntry, columnKey: Key) => {
    const cellValue = price[columnKey as keyof PriceEntry];

    switch (columnKey) {
      case "symbol":
        return (
          <span className="font-semibold">
            {price.stock.symbol}
          </span>
        );
      case "open_price":
        return <span>R${price.open_price}</span>;
      case "date":
        return <span>aa{price.date}</span>;
      case "time":
        return <span>R${price.time}</span>;
      case "close_price":
        return <span>R${price.close_price}</span>;
        case "created_at":
          return <span>{timeAgo(new Date(price.created_at))}</span>;
      case "actions":
        return (
          <div className="relative flex justify-end">
            <Tooltip color="success" content="Editar">
              <Button isIconOnly color="success" variant="light">
                <FeatherIcon
                  icon="edit-3"
                  className="text-success-500"
                  strokeWidth={1.5}
                  size={20}
                />
              </Button>
            </Tooltip>
            <Tooltip color="danger" content="Excluir">
              <Button
                isIconOnly
                color="danger"
                variant="light"
                onClick={() => null}
              >
                <FeatherIcon
                  icon="trash"
                  className="text-red-500"
                  strokeWidth={1.5}
                  size={20}
                />
              </Button>
            </Tooltip>
          </div>
        );
      default:
        return String(cellValue);
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
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            {data?.length} preços
          </span>
          <label className="flex items-center text-default-400 text-small">
            Linhas por página:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
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
            Próximo
          </Button>
        </div>
      </div>
    );
  }, [page, pages, onPreviousPage, onNextPage]);

  if (isLoading) {
    return <div>Atualizando...</div>;
  }

  if (error) {
    return <div>Error loading stocks</div>;
  }

  return (
    <Table
      isStriped
      isHeaderSticky
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
        {sortedItems.map((price) => (
          <TableRow key={price.id}>
            {(columnKey) => (
              <TableCell>{renderCell(price, columnKey)}</TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
