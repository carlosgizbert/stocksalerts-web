"use client";

export const HeaderLogo = () => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-3xl">💸</span>
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-semibold m-0 text-default-900 -mb-4 whitespace-nowrap">
          StockAlerts
        </h3>
        <span className="text-xs font-medium text-default-500">
        prices in real time
        </span>
      </div>
    </div>
  );
};
