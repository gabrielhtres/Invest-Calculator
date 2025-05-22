"use client";

import Table, { ColumnType } from "@/components/Table";
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";

interface Data {
  name: string;
  ticker: string;
  price: number;
  quantity: number;
  total: number;
  percentage: number;
}

export default function Home() {
  const [stockData, setStockData] = useState<Data[]>([]);

  const tickers = [
    "PETR3",
    "VALE3",
    "ITUB4",
    "B3SA3",
    "MGLU3",
    "LREN3",
    "ABEV3",
    "ITSA4",
    "BBAS3",
    "BBDC3",
  ];

  const columns: ColumnType<Data>[] = [
    { key: "name", title: "Nome" },
    { key: "ticker", title: "Ticker" },
    {
      key: "price",
      title: "Preço",
      customRender: (value) => `R$ ${value.price.toFixed(2)}`,
    },
    { key: "quantity", title: "Quantidade" },
    {
      key: "total",
      title: "Total",
      customRender: (value) => `R$ ${value.total.toFixed(2)}`,
    },
    {
      key: "percentage",
      title: "Porcentagem",
      customRender: (value) => `${value.percentage.toFixed(2)}%`,
    },
  ];

  const data = [
    {
      name: "Petrobras",
      ticker: "PETR3",
      price: 30.2,
      quantity: 10,
      total: 302.0,
      percentage: 50.2,
    },
    {
      name: "Vale",
      ticker: "VALE3",
      price: 50.0,
      quantity: 5,
      total: 250.0,
      percentage: 41.67,
    },
    {
      name: "Itaú",
      ticker: "ITUB4",
      price: 20.98,
      quantity: 15,
      total: 314.7,
      percentage: 50.0,
    },
  ];

  useEffect(() => console.log(stockData), [stockData]);

  // const fetchData = async (tickers: string[]) => {
  //   const data = await Promise.all(
  //     tickers.map((ticker) => {
  //       return fetch(
  //         `https://brapi.dev/api/quote/${ticker}?modules=summaryProfile&token=5ZsGP87mpkWwggw9pYuhgf`
  //       )
  //         .then((response) => response.json())
  //         .catch((err) => console.error(err));
  //     })
  //   );

  //   console.log(data);
  // };

  const makeData = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files.length) return;

    const file = event.target.files[0];
    const reader = new FileReader();
    const stockData: Data[] = [];

    reader.onload = (e) => {
      const text = e.target?.result;
      console.log("Conteúdo do CSV:", text);
      const lines = (text as string).split("\n");
      const data = lines.map((line) => line.split(","));

      data.forEach((row) => {
        const price = parseFloat(row[12].slice(2, -2).split(" ")[1]);
        const quantity = parseInt(row[8].slice(1, -1));
        const total = price * quantity;

        stockData.push({
          name: row[0].slice(9),
          ticker: row[3].slice(1, -1),
          price,
          quantity,
          total,
          percentage: 0,
        });
      });

      setStockData(stockData);
    };

    reader.readAsText(file);
  };

  return (
    <>
      <input type="file" accept=".csv" onChange={makeData} />
      <Table data={stockData} columns={columns} />
    </>
  );
}
