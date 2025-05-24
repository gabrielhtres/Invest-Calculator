const sheetTypeMap: Record<string, string> = {
  Acoes: "stock",
  BDR: "bdr",
  ETF: "etf",
  "Fundo de Investimento": "fii",
  "Tesouro Direto": "treasure",
};

const getTypeBySheetName = (name: string) => {
  const type = sheetTypeMap[name];
  return type;
};

const assetsClasses = {
  stock: "Ações",
  bdr: "BDR",
  etf: "ETF",
  fii: "Fundos Imobiliários",
  treasure: "Tesouro Direto",
};

export { getTypeBySheetName, assetsClasses };
