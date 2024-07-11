import { useGetPriceEntries } from "@/services/stocks";
import React, { useMemo } from "react";
import Chart, { Props } from "react-apexcharts";

const baseOptions: Props["options"] = {
  chart: {
    type: "area",
    animations: {
      easing: "linear",
      speed: 300,
    },
    sparkline: {
      enabled: false,
    },
    brush: {
      enabled: false,
    },
    id: "basic-bar",
    foreColor: "hsl(var(--nextui-default-800))",
    stacked: true,
    toolbar: {
      show: false,
    },
  },
  xaxis: {
    type: "datetime",
    labels: {
      style: {
        colors: "hsl(var(--nextui-default-800))",
      },
    },
    axisBorder: {
      color: "hsl(var(--nextui-nextui-default-200))",
    },
    axisTicks: {
      color: "hsl(var(--nextui-nextui-default-200))",
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: "hsl(var(--nextui-default-800))",
      },
    },
  },
  tooltip: {
    enabled: true,
    x: {
      format: "dd MMM yyyy HH:mm:ss",
    },
  },
  grid: {
    show: true,
    borderColor: "hsl(var(--nextui-default-200))",
    strokeDashArray: 0,
    position: "back",
  },
  stroke: {
    curve: "smooth",
    fill: {
      colors: ["#34D399"],
    },
  },
  markers: {
    size: 4,
    colors: ["#34D399"],
    strokeColors: "#fff",
    strokeWidth: 2,
    hover: {
      size: 7,
    },
  },
};

export const Steam = () => {
  const { data: priceEntriesData } = useGetPriceEntries();

  // Transformar os dados de priceEntriesData para o formato esperado pelo gráfico
  const seriesData = useMemo(() => {
    if (!priceEntriesData) return [];

    const data = priceEntriesData.map(entry => ({
      x: new Date(entry.created_at),
      y: parseFloat(entry.close_price),
      symbol: entry.stock.symbol,
    }));

    return [
      {
        name: "Close Prices",
        data,
      },
    ];
  }, [priceEntriesData]);

  const chartOptions = useMemo(() => {
    return {
      ...baseOptions,
      xaxis: {
        ...baseOptions.xaxis,
        categories: priceEntriesData ? priceEntriesData.map(entry => entry.created_at) : [],
      },
    };
  }, [priceEntriesData]);

  return (
    <div className="w-full z-20">
      <div id="chart">
        <Chart options={chartOptions} series={seriesData} type="area" height={425} />
      </div>
    </div>
  );
};