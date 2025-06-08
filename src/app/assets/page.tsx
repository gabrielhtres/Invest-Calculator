"use client";

import { useEffect, useState } from "react";
import { AssetData } from "../types";
import Table, { ColumnType } from "@/components/Table";
import Input from "@/components/Input";
import styles from "./page.module.css";
import Button from "@/components/Button";

interface StockData {
  [key: string]: string;
}

interface PartialAssetData {
  name: string;
  ticker: string;
  price: number;
  quantity: number;
  total: number;
  type: string;
  percentage: number | null;
}

export default function Page() {
  const [data, setData] = useState<AssetData[]>([]);

  useEffect(() => {
    async function fetchAssets() {
      try {
        const res = await fetch("/api/assets", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();
        setData(data);
      } catch (err) {
        console.error("Erro ao buscar assets:", err);
      }
    }

    fetchAssets();
  }, []);

  // const extractName = (str: string) => {
  //   const match = str.match(/^[A-Z0-9]+(?:[0-9])?\s*-\s*(.+)$/i);
  //   return match ? match[1].trim() : str.trim();
  // };

  // const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
  //   if (!e.target.files) return;

  //   const file = e.target.files[0];

  //   if (!file) return;

  //   const reader = new FileReader();
  //   const newData: PartialAssetData[] = [];

  //   reader.onload = (evt) => {
  //     const binaryStr = evt.target?.result;
  //     const workbook = XLSX.read(binaryStr, { type: "binary" });

  //     workbook.SheetNames.forEach((sheetName) => {
  //       const sheet = workbook.Sheets[sheetName];

  //       const jsonData = XLSX.utils.sheet_to_json(sheet).slice(0, -3);

  //       jsonData.forEach((item) => {
  //         const currentItem = item as StockData;
  //         const newItem = {
  //           name: extractName(currentItem["Produto"]),
  //           ticker: currentItem["Código de Negociação"],
  //           price: parseFloat(currentItem["Preço de Fechamento"]),
  //           quantity: parseFloat(currentItem["Quantidade"]),
  //           total: parseFloat(currentItem["Valor Atualizado"]),
  //           type: getTypeBySheetName(sheetName),
  //           percentage: null,
  //         };

  //         newData.push(newItem);
  //       });
  //     });

  //     const total = newData.reduce((acc, item) => acc + item.total, 0);
  //     const updatedData = newData.map((item) => {
  //       const percentage = (item.total / total) * 100;
  //       return { ...item, percentage };
  //     });

  //     fetch("/api/assets", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(updatedData),
  //     })
  //       .then((res) =>
  //         res
  //           .json()
  //           .then((data) => setData(data))
  //           .catch((err) => console.error("Erro ao processar a resposta:", err))
  //       )
  //       .catch((err) => console.error("Erro ao enviar os dados:", err));
  //   };

  //   reader.readAsBinaryString(file);
  // };

  const columns: ColumnType<AssetData>[] = [
    {
      key: "name",
      title: "Nome",
    },
    {
      key: "ticker",
      title: "Ticker",
    },
    {
      key: "price",
      title: "Preço",
      customRender: (row) => `R$ ${row.price.toFixed(2)}`,
    },
    {
      key: "quantity",
      title: "Quantidade",
    },
    {
      key: "total",
      title: "Total",
      customRender: (row) => `R$ ${row.total.toFixed(2)}`,
    },
    {
      key: "type",
      title: "Tipo",
    },
    {
      key: "percentage",
      title: "% do total",
      customRender: (row) => `${row.percentage?.toFixed(2)}%`,
    },
  ];

  return (
    <form>
      {/* <input type="file" accept=".xlsx" onChange={handleFileUpload} /> */}
      <div className={styles.inputs_row}>
        <Input label="Ticker do Ativo" name="ticker" />
        <Input label="Quantidade" name="quantity" type="number" step={1} />
        <Input label="Preço" name="price" type="number" step={0.01} />

        <Button>Adicionar</Button>
      </div>

      <Table data={data} columns={columns} />
    </form>
  );
}
