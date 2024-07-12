import { useGetPriceEntries } from "@/services/stocks";
import React, { useMemo } from "react";
import Chart, { Props } from "react-apexcharts";

const baseOptions: Props["options"] = {
  series: [
    {
      name: "High - 2013",
      data: [28, 29, 33, 36, 32, 32, 33],
    },
    {
      name: "Low - 2013",
      data: [12, 11, 14, 18, 17, 13, 13],
    },
  ],
  chart: {
    height: 350,
    type: "line",
    dropShadow: {
      enabled: true,
      color: "#000",
      top: 18,
      left: 7,
      blur: 10,
      opacity: 0.2,
    },
    zoom: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
  },
  colors: ["#77B6EA", "#545454"],
  dataLabels: {
    enabled: true,
  },
  stroke: {
    curve: "smooth",
  },
  title: {
    text: "Average High & Low Temperature",
    align: "left",
  },
  grid: {
    borderColor: "#e7e7e7",
    row: {
      colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
      opacity: 0.5,
    },
  },
  markers: {
    size: 1,
  },
  yaxis: {
    title: {
      text: "Temperature",
    },
    min: 5,
    max: 40,
  },
  legend: {
    position: "top",
    horizontalAlign: "right",
    floating: true,
    offsetY: -25,
    offsetX: -5,
  },
};

export const Steam = () => {
  const { data: priceEntriesData } = useGetPriceEntries();

  const seriesData = useMemo(() => {

    if (!priceEntriesData) return [];

    const data = priceEntriesData.map((entry) => ({
      x: new Date(entry.created_at),
      y: parseFloat(entry.open_price),
      symbol: entry.stock.symbol
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
        categories: priceEntriesData
          ? priceEntriesData.map((entry) => entry.created_at)
          : [],
      },
    };
  }, [priceEntriesData]);

  return (
    <div className="w-full z-20">
      <div id="chart">
        <Chart
          options={chartOptions}
          series={seriesData}
          type="area"
          height={425}
        />
      </div>
    </div>
  );
};
