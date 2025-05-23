"use client";

import { ChangeEvent, useState } from "react";
import * as XLSX from "xlsx";
import { getTypeBySheetName } from "./utils";

interface Data {
  name: string;
  ticker: string;
  price: number;
  quantity: number;
  total: number;
  type: string;
  percentage?: number;
}

interface StockData {
  [key: string]: string;
}

export default function Home() {
  const [data, setData] = useState<Data[]>([]);
  // const tickers = [
  //   "PETR3",
  //   "VALE3",
  //   "ITUB4",
  //   "B3SA3",
  //   "MGLU3",
  //   "LREN3",
  //   "ABEV3",
  //   "ITSA4",
  //   "BBAS3",
  //   "BBDC3",
  // ];

  // const columns: ColumnType<Data>[] = [
  //   { key: "name", title: "Nome" },
  //   { key: "ticker", title: "Ticker" },
  //   {
  //     key: "price",
  //     title: "Preço",
  //     customRender: (value) => `R$ ${value.price.toFixed(2)}`,
  //   },
  //   { key: "quantity", title: "Quantidade" },
  //   {
  //     key: "total",
  //     title: "Total",
  //     customRender: (value) => `R$ ${value.total.toFixed(2)}`,
  //   },
  //   {
  //     key: "percentage",
  //     title: "Porcentagem",
  //     customRender: (value) => `${value.percentage?.toFixed(2)}%`,
  //   },
  // ];

  // const data = [
  //   {
  //     name: "Petrobras",
  //     ticker: "PETR3",
  //     price: 30.2,
  //     quantity: 10,
  //     total: 302.0,
  //     percentage: 50.2,
  //   },
  //   {
  //     name: "Vale",
  //     ticker: "VALE3",
  //     price: 50.0,
  //     quantity: 5,
  //     total: 250.0,
  //     percentage: 41.67,
  //   },
  //   {
  //     name: "Itaú",
  //     ticker: "ITUB4",
  //     price: 20.98,
  //     quantity: 15,
  //     total: 314.7,
  //     percentage: 50.0,
  //   },
  // ];

  // useEffect(() => console.log(stockData), [stockData]);

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

  const extractName = (str: string) => {
    const match = str.match(/^[A-Z0-9]+(?:[0-9])?\s*-\s*(.+)$/i);
    console.log("match", match);
    console.log("str", match ? match[1].trim() : str.trim());
    return match ? match[1].trim() : str.trim();
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();
    const newData: Data[] = [];

    reader.onload = (evt) => {
      const binaryStr = evt.target?.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });

      workbook.SheetNames.forEach((sheetName) => {
        const sheet = workbook.Sheets[sheetName];

        const jsonData = XLSX.utils.sheet_to_json(sheet).slice(0, -3);

        jsonData.forEach((item) => {
          const currentItem = item as StockData;
          const newItem = {
            name: extractName(currentItem["Produto"]),
            ticker: currentItem["Código de Negociação"],
            price: parseFloat(currentItem["Preço de Fechamento"]),
            quantity: parseFloat(currentItem["Quantidade"]),
            total: parseFloat(currentItem["Valor Atualizado"]),
            type: getTypeBySheetName(sheetName),
          };

          newData.push(newItem);
        });
      });

      setData(newData);
    };

    reader.readAsBinaryString(file);
  };

  // useEffect(() => console.log(data), [data]);

  return (
    <>
      <input type="file" accept=".xlsx" onChange={handleFileUpload} />
    </>
  );
}
