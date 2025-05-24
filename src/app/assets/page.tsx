"use client";

import { ChangeEvent, useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { getTypeBySheetName } from "../utils";
import { AssetData } from "../types";

interface StockData {
  [key: string]: string;
}

export default function Page() {
  const [data, setData] = useState<AssetData[]>([]);

  useEffect(() => {
    async function fetchAssets() {
      try {
        const res = await fetch("/api/assets");
        const data = await res.json();
        console.log(data);
      } catch (err) {
        console.error("Erro ao buscar assets:", err);
      }
    }

    fetchAssets();
  }, []);

  const extractName = (str: string) => {
    const match = str.match(/^[A-Z0-9]+(?:[0-9])?\s*-\s*(.+)$/i);
    return match ? match[1].trim() : str.trim();
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();
    const newData: AssetData[] = [];

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
            percentage: null,
          };

          newData.push(newItem);
        });
      });

      setData(newData);
    };

    reader.readAsBinaryString(file);
  };

  return (
    <>
      <input type="file" accept=".xlsx" onChange={handleFileUpload} />
    </>
  );
}
