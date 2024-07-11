"use client";
import dynamic from "next/dynamic";
import { StocksTable } from "../tables/stock/table";
import { Button, Divider } from "@nextui-org/react";
import { PriceEntryTable } from "../tables/priceEntry";
import Link from "next/link";

const Chart = dynamic(
  () => import("../charts/steam").then((mod) => mod.Steam),
  {
    ssr: false,
  }
);

export const Content = () => {
  return (
    <div className="h-full lg:px-6 mb-20">
      <div className="flex pt-4 justify-center gap-4 xl:gap-6 px-4 lg:px-0 flex-wrap xl:flex-nowrap sm:pt-8 max-w-[90rem] mx-auto w-full">
        <div className="w-full h-full flex flex-col gap-2">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-xl font-semibold">Ativos monitorados</h3>
            <Button as={Link} href="/stocks" variant="bordered" color="primary">
              Ver todos
            </Button>
          </div>
          {/* <div className="w-full bg-default-50 shadow-lg rounded-2xl p-6 ">
            <Chart />
          </div> */}
        </div>
      </div>
      <div className="flex flex-col justify-center w-full py-5 px-4 lg:px-0  max-w-[90rem] mx-auto gap-3">
        <StocksTable />
      </div>

      <Divider />

      <div className="flex flex-col justify-center gap-4 xl:gap-6 px-4 lg:px-0 flex-wrap xl:flex-nowrap sm:pt-10 max-w-[90rem] mx-auto w-full">
        <div className="flex items-center gap-4">
          <h3 className="text-xl font-semibold">Últimas verificações</h3>
        </div>
        <div className="flex flex-col justify-center w-full px-4 lg:px-0  max-w-[90rem] mx-auto gap-3">
          <PriceEntryTable />
        </div>
      </div>
    </div>
  );
};
