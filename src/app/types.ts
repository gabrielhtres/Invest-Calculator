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
  name: string;
  percentage: number;
}

export type { AssetData };
