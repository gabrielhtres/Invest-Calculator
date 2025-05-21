import Image from "next/image";
import Table, { ColumnType } from "@/components/Table";

interface Data {
  name: string;
  ticker: string;
  price: number;
  quantity: number;
  total: number;
  percentage: number;
}

export default function Home() {
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

  return <Table data={data} columns={columns} />;
}
