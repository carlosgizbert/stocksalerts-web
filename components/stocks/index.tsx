"use client";
import { StocksTable } from "../tables/stock/table";

export const Stocks = () => {
  return (
    <div className="h-full lg:px-6">
      <div className="flex flex-col pt-4 justify-center gap-4 xl:gap-6 px-4 lg:px-0 flex-wrap xl:flex-nowrap sm:pt-8 max-w-[90rem] mx-auto w-full">
        <div className="w-full h-full flex flex-col gap-2">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-xl font-semibold">Ativos</h3>
          </div>
        </div>
        <StocksTable />
      </div>
    </div>
  );
};
