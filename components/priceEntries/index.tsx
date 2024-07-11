"use client";
import { Input } from "@nextui-org/react";
import { PriceEntryTable } from "../tables/priceEntry";

export const PriceEntries = () => {
  return (
    <div className="h-full lg:px-6 mb-20">
      <div className="flex flex-col pt-4 justify-center gap-4 xl:gap-6 px-4 lg:px-0 flex-wrap xl:flex-nowrap sm:pt-8 max-w-[90rem] mx-auto w-full">
        <div className="w-full h-full flex flex-col gap-2">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-xl font-semibold">Histórico de preços</h3>
          </div>
          <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
            <Input
              variant="bordered"
              classNames={{
                input: "w-full",
                mainWrapper: "w-full",
              }}
              placeholder="Buscar ..."
            />
          </div>
        </div>
        <PriceEntryTable />
      </div>
    </div>
  );
};
