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

export { getTypeBySheetName };
