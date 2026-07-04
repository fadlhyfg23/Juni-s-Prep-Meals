export interface StockItem {
  id: string;
  name: string;
  category: 'protein' | 'carbs_veg' | 'spices_dry' | 'other';
  quantity: number;
  unit: string;
  isLow: boolean;
}

export interface Meal {
  nama: string;
  porsi: string;
  bumbu: string;
  catatanPrep: string;
}

export interface DayPlan {
  hari: string;
  sarapan: Meal;
  siang: Meal;
  malam: Meal;
}

export interface BudgetDetail {
  nama: string;
  jumlah: string;
  estimasiHarga: number;
  kegunaan?: string;
  sudahDibeli?: boolean; // For checklist tracking
}

export interface MealPlan {
  totalBudgetEstimasi: number;
  kelebihanTips: string;
  bumbuDetailMaksimal: BudgetDetail[];
  bahanUtamaDetail: BudgetDetail[];
  menuMingguan: DayPlan[];
}

export interface RecipeRecommendation {
  namaResep: string;
  porsi: string;
  waktuMasak: string;
  alatUtama: string;
  bahanBumbu: {
    nama: string;
    jumlah: string;
    estimasiHarga: number;
  }[];
  totalBiayaEstimasi: number;
  langkahMasak: string[];
  tipsHemat: string;
}
