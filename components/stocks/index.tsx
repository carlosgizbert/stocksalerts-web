"use client";
import FeatherIcon from "feather-icons-react";
import { StocksTable } from "../tables/stock/table";

export const Stocks = () => {
  return (
    <div className="h-full lg:px-6">
      <div className="flex flex-col pt-4 justify-center gap-4 xl:gap-6 px-4 lg:px-0 flex-wrap xl:flex-nowrap sm:pt-8 max-w-[90rem] mx-auto w-full">
        <div className="w-full h-full flex flex-col gap-2">
        <h3 className="text-xl font-semibold flex items-center gap-2">
              <FeatherIcon icon="layers" size={18} strokeWidth={1.5} /> Ativos monitorados
            </h3>
        </div>
        <StocksTable />
      </div>
    </div>
  );
};
