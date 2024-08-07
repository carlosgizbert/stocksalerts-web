"use client";
import dynamic from "next/dynamic";
import { StocksTable } from "../tables/stock/table";
import { Button, Divider } from "@nextui-org/react";
import Link from "next/link";
import { PriceEntryTable } from "../tables/priceEntry/table";
import FeatherIcon from "feather-icons-react";

const Chart = dynamic(
  () => import("../charts/steam").then((mod) => mod.Steam),
  {
    ssr: false,
  }
);

export const Content = () => {
  return (
    <div className="px-4 lg:px-6">
      <section className="py-4">
        <div className="mb-4 flex w-full items-center gap-4 lg:px-0 max-w-[90rem] mx-auto">
          <h3 className="text-xl flex items-center gap-2 font-semibold">
            <FeatherIcon icon="activity" size={18} strokeWidth={1.5} />
            Últimos preços</h3>
          <Button
            as={Link}
            href="/panel/price-entries"
            variant="bordered"
            color="success"
          >
            histórico completo
          </Button>
        </div>
        <div className="flex w-full items-center  gap-4 lg:px-0 max-w-[90rem] mx-auto">
          {/* <div className="w-full">
            <Chart />
          </div> */}
          <div className="w-full h-full">
            <PriceEntryTable />
          </div>
        </div>
      </section>
      <Divider className="my-2 mb-4 flex w-full items-center gap-4 lg:px-0 max-w-[90rem] mx-auto" />
      <section className="py-4">
        <div className="mb-4 flex w-full items-center gap-4 lg:px-0 max-w-[90rem] mx-auto">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <FeatherIcon icon="layers" size={18} strokeWidth={1.5} />Ativos monitorados</h3>
          <Button
            as={Link}
            href="/panel/stocks"
            variant="bordered"
            color="success"
          >
            configurar
          </Button>
        </div>
        <div className="flex w-full items-center  gap-4 lg:px-0 max-w-[90rem] mx-auto">
          <StocksTable />
        </div>
      </section>
    </div>
  );
};
