interface AssetData {
  id: number;
  userId: string;
  name: string;
  ticker: string;
  price: number;
  quantity: number;
  total: number;
  type: string;
  percentage: number | null;
}

interface AssetClassData {
  id: number;
  stock: string;
  bdr: string;
  etf: string;
  fii: string;
  treasure: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type { AssetData, AssetClassData };
