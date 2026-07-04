import React, { useState, useEffect } from "react";
import { StockItem, MealPlan, RecipeRecommendation } from "./types";
import StockManager from "./components/StockManager";
import MealPlannerView from "./components/MealPlannerView";
import {
  BookOpen,
  Calendar,
  CheckSquare,
  ChevronRight,
  Database,
  DollarSign,
  Egg,
  Flame,
  Plus,
  RefreshCw,
  Search,
  Sparkles,
  Utensils,
  Wallet,
  Menu,
  X,
  AlertCircle,
  HelpCircle,
  TrendingDown,
  Info,
  Square,
  ShoppingCart,
  Trash2,
  Minus
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Default pre-populated meal plan for instant load
const defaultMealPlan: MealPlan = {
  totalBudgetEstimasi: 135000,
  kelebihanTips: "Tips Nutrisi & Efisiensi: Kelompokkan bumbu kering dalam wadah kedap udara. Simpan sayuran segar dibalut tisu dapur kering dalam kompartemen chiller agar kesegaran dan kandungan vitaminnya wangi terjaga hingga akhir pekan.",
  bumbuDetailMaksimal: [
    { nama: "Bawang Merah", jumlah: "100g", estimasiHarga: 4000, kegunaan: "Aroma dasar tumisan & nasi gandum aromatik", sudahDibeli: false },
    { nama: "Bawang Putih", jumlah: "100g", estimasiHarga: 3500, kegunaan: "Antioksidan alami, dasar kaldu sup dan marinasi protein", sudahDibeli: false },
    { nama: "Cabai Rawit Merah", jumlah: "150g", estimasiHarga: 6000, kegunaan: "Penambah nafsu makan segar dan kaya vitamin C", sudahDibeli: false },
    { nama: "Minyak Kelapa / Margarin Sehat", jumlah: "500ml", estimasiHarga: 12000, kegunaan: "Lemak sehat untuk menumis ringan", sudahDibeli: false },
    { nama: "Garam Laut & Kaldu Jamur", jumlah: "1 pack", estimasiHarga: 4500, kegunaan: "Penyedap rasa umami alami bebas MSG berlebih", sudahDibeli: false }
  ],
  bahanUtamaDetail: [
    { nama: "Telur Ayam Organik", jumlah: "10 butir", estimasiHarga: 22000, kegunaan: "Sumber protein hewani berkualitas tinggi dan asam amino lengkap", sudahDibeli: false },
    { nama: "Tempe Kedelai Organik", jumlah: "3 papan", estimasiHarga: 15000, kegunaan: "Protein nabati tinggi serat, bagus untuk mikrobioma pencernaan", sudahDibeli: false },
    { nama: "Tahu Sutra Putih", jumlah: "1 pack isi 10", estimasiHarga: 8000, kegunaan: "Tekstur lembut kaya kalsium untuk sup bening", sudahDibeli: false },
    { nama: "Dada Ayam Fillet Segar", jumlah: "500g", estimasiHarga: 32000, kegunaan: "Protein hewani premium rendah lemak, dipotong porsi harian", sudahDibeli: false },
    { nama: "Sayuran Hidroponik (Brokoli, Wortel, Buncis)", jumlah: "3 paket", estimasiHarga: 18000, kegunaan: "Serat makanan, antioksidan, dan fitonutrisi esensial harian", sudahDibeli: false },
    { nama: "Sosis Sapi Premium", jumlah: "1 pack isi 6", estimasiHarga: 15000, kegunaan: "Pelengkap protein praktis bercita rasa gurih", sudahDibeli: false }
  ],
  menuMingguan: [
    {
      hari: "Senin",
      sarapan: {
        nama: "Nasi Goreng Oatmeal Telur Aromatik",
        porsi: "Porsi 1 Orang: 120g oatmeal/nasi matang, 1 butir telur ayam organik, daun bawang",
        bumbu: "1 siung bawang merah (5g), 1 siung bawang putih (3g), 2 buah cabai rawit (5g), 1 sdm kecap asin, 1/2 sdt garam",
        catatanPrep: "Tumis bumbu dengan sedikit minyak kelapa hingga harum sebelum memasukkan karbohidrat matang."
      },
      siang: {
        nama: "Dada Ayam Tumis Brokoli & Wortel",
        porsi: "Porsi 1 Orang: 100g dada ayam fillet, 50g brokoli, 30g wortel",
        bumbu: "2 siung bawang putih cincang (10g), 1 sdm saus tiram rendah natrium, 1/4 sdt lada bubuk, 1/2 sdt garam",
        catatanPrep: "Marinasi potongan ayam dengan saus tiram 10 menit sebelum ditumis agar gurih meresap sempurna."
      },
      malam: {
        nama: "Tempe Panggang Teflon Sambal Kemangi",
        porsi: "Porsi 1 Orang: 3 iris tebal tempe panggang (120g)",
        bumbu: "3 buah cabai rawit (10g), 1 siung bawang putih (5g), 1/2 sdt garam mentah, daun kemangi segar",
        catatanPrep: "Panggang tempe tanpa minyak berlebih menggunakan wajan antilengket."
      }
    },
    {
      hari: "Selasa",
      sarapan: {
        nama: "Scrambled Tahu Telur & Tomat Ceri",
        porsi: "Porsi 1 Orang: 1 butir telur orak-arik dengan 2 tahu sutra hancur",
        bumbu: "1 siung bawang putih cincang (5g), 1/2 sdt garam, 1/4 sdt lada putih bubuk, irisan daun bawang",
        catatanPrep: "Hancurkan tahu bersama telur kocok untuk tekstur lembut dan volume protein maksimal."
      },
      siang: {
        nama: "Dada Ayam Panggang Sambal Korek Daun Jeruk",
        porsi: "Porsi 1 Orang: 100g dada ayam panggang + sambal aroma daun jeruk",
        bumbu: "1 siung bawang putih, 1/2 sdt garam marinasi. Sambal: 5 cabai rawit, 1 siung bawang putih, minyak kelapa panas, irisan daun jeruk",
        catatanPrep: "Panggang ayam fillet yang telah dimarinasi di atas wajan anti lengket hingga matang merata."
      },
      malam: {
        nama: "Tumis Tempe & Buncis Saus Gurih",
        porsi: "Porsi 1 Orang: 100g tempe potong dadu, 50g buncis segar",
        bumbu: "2 siung bawang merah (10g), 1 siung bawang putih (5g), 1.5 sdm kecap manis organik, 1/2 sdt garam",
        catatanPrep: "Tumis buncis setengah matang terlebih dahulu agar teksturnya tetap renyah saat dikonsumsi."
      }
    },
    {
      hari: "Rabu",
      sarapan: {
        nama: "Omelet Gulung Sayur ala Bistro",
        porsi: "Porsi 1 Orang: Omelet gulung tebal dari 2 butir telur dengan wortel parut",
        bumbu: "1/4 sdt garam, 1/4 sdt lada bubuk, irisan halus daun bawang dan wortel parut",
        catatanPrep: "Gunakan api kecil saat melipat telur agar matang merata dan warnanya kuning cantik."
      },
      siang: {
        nama: "Cah Sayur Buncis Wortel & Tempe Panggang Kunyit",
        porsi: "Porsi 1 Orang: 100g tumis sayur campur + 2 potong tempe bumbu kuning panggang",
        bumbu: "2 siung bawang putih (10g), 1 sdm saus tiram, 1/2 sdt ketumbar bubuk, 1/4 sdt kunyit bubuk untuk marinasi tempe",
        catatanPrep: "Rendam tempe dalam air bumbu kuning hangat sebelum dipanggang di teflon."
      },
      malam: {
        nama: "Sup Tahu Sutra Sosis Bening",
        porsi: "Porsi 1 Orang: 1 mangkok sup bening (2 buah tahu sutra + 2 sosis sapi premium)",
        bumbu: "2 siung bawang putih geprek (10g), 1 batang daun bawang iris, lada putih bubuk, garam secukupnya",
        catatanPrep: "Sup bening rendah kalori yang sangat menenangkan dan menghangatkan tubuh."
      }
    },
    {
      hari: "Kamis",
      sarapan: {
        nama: "Bubur Havermut Gurih Kaldu Ayam",
        porsi: "Porsi 1 Orang: 1 mangkok bubur havermut gurih dengan topping telur rebus",
        bumbu: "100ml air kaldu ayam buatan sendiri, daun salam, 1/4 sdt garam, irisan daun bawang",
        catatanPrep: "Masak havermut dengan kuah kaldu murni agar rasa gurih alaminya terkunci sempurna."
      },
      siang: {
        nama: "Ayam Suwir Balado Daun Kemangi",
        porsi: "Porsi 1 Orang: 100g dada ayam fillet suwir pedas harum kemangi",
        bumbu: "3 cabai merah besar, 3 bawang merah, 1 bawang putih, garam, gula kelapa, kemangi segar",
        catatanPrep: "Rebus dada ayam kemudian suwir tipis-tipis sebelum ditumis bersama bumbu balado halus."
      },
      malam: {
        nama: "Tumis Sawi Hijau Tahu Putih Garlic Butter",
        porsi: "Porsi 1 Orang: 100g sawi hijau segar, 2 tahu putih potong kotak",
        bumbu: "2 siung bawang putih iris (10g), 1 sdm mentega/butter, 1/2 sdt lada bubuk, 1/2 sdt garam",
        catatanPrep: "Tumis cepat dengan api besar agar warna sawi tetap hijau segar dan menggugah selera."
      }
    },
    {
      hari: "Jumat",
      sarapan: {
        nama: "Nasi Uduk Gurih Daun Pandan",
        porsi: "Porsi 1 Orang: 1 piring nasi uduk aromatik pandan (150g)",
        bumbu: "1 sdm santan kelapa murni (15ml), 1 lembar daun pandan wangi, daun salam, serai geprek, garam",
        catatanPrep: "Masak beras bersama seluruh rempah di panci atau kompor dapur umum untuk keharuman akhir pekan yang mewah."
      },
      siang: {
        nama: "Pepes Tahu Kemangi & Ayam Panggang Teflon",
        porsi: "Porsi 1 Orang: 1 bungkus pepes tahu kemangi + 100g dada ayam panggang",
        bumbu: "Bumbu halus pepes: bawang merah, bawang putih, kemiri sangrai, daun kemangi segar, daun pisang",
        catatanPrep: "Pepes tahu dapat dikukus dengan panci kukusan di kompor dapur umum untuk matang merata."
      },
      malam: {
        nama: "Tahu Cabai Garam Crispy",
        porsi: "Porsi 1 Orang: 1 piring tahu crispy tumis bumbu kering gurih",
        bumbu: "3 siung bawang putih cincang halus, 2 cabai rawit merah iris, garam laut, kaldu jamur, tepung maizena",
        catatanPrep: "Balur tahu dengan maizena tipis, goreng garing, lalu tumis kering bersama bawang putih dan cabai."
      }
    },
    {
      hari: "Sabtu",
      sarapan: {
        nama: "Roti Panggang Telur Mata Sapi & Alpukat",
        porsi: "Porsi 1 Orang: 2 lembar roti gandum panggang dengan 1 telur setengah matang",
        bumbu: "Mentega ringan untuk olesan, taburan garam laut kasar and lada hitam tumbuk",
        catatanPrep: "Panggang roti di teflon kering hingga kecokelatan sebelum diletakkan telur di atasnya."
      },
      siang: {
        nama: "Sup Ayam Sehat Jahe Hangat",
        porsi: "Porsi 1 Orang: 1 mangkok sup dada ayam dengan wortel dan buncis",
        bumbu: "2 siung bawang putih geprek, 1 cm jahe memarkan (untuk menghangatkan), seledri, daun bawang, garam",
        catatanPrep: "Rebus ayam bersama jahe di awal untuk menghasilkan kuah sup bening yang bebas bau amis."
      },
      malam: {
        nama: "Ayam Bakar Madu Rosemary Teflon",
        porsi: "Porsi 1 Orang: 1 potong ayam dada bakar bumbu madu & rosemary (100g)",
        bumbu: "1.5 sdm kecap manis, 1 sdt madu murni, 1 siung bawang putih cincang, mentega, lada hitam",
        catatanPrep: "Olesi ayam dengan campuran madu dan kecap di menit-menit akhir pemanggangan agar tidak gosong."
      }
    },
    {
      hari: "Minggu",
      sarapan: {
        nama: "Bubur Oatmeal Ayam Suwir & Daun Bawang",
        porsi: "Porsi 1 Orang: 1 mangkok bubur hangat kaya serat tinggi",
        bumbu: "Sisa kaldu sup sabtu, 1 sdm kecap asin, taburan bawang merah goreng harum, seledri cincang",
        catatanPrep: "Solusi sarapan praktis nan mewah di hari Minggu menggunakan sisa bahan masakan kemarin."
      },
      siang: {
        nama: "Tumis Tempe Mendoan Pedas Manis",
        porsi: "Porsi 1 Orang: 1 piring tumisan tempe setengah matang gurih manis",
        bumbu: "3 bawang merah, 1 bawang putih, 2 cabai rawit merah, 2 sdm kecap manis, sedikit air dan garam",
        catatanPrep: "Tempe digoreng setengah matang (mendo) terlebih dahulu agar menyerap kuah tumisan kecap dengan baik."
      },
      malam: {
        nama: "Nasi Goreng Nusantara Spesial 'Clean-the-Fridge'",
        porsi: "Porsi 1 Orang: 1 piring nasi goreng spesial dengan kombinasi protein sisa kulkas",
        bumbu: "Kombinasikan sisa cabai, bawang merah, bawang putih, telur, potongan sosis/ayam, sawi, dan bumbu pelengkap",
        catatanPrep: "Eksperimen masakan penutup minggu yang menyenangkan sekaligus memastikan kulkas bersih dari sisa bahan makanan."
      }
    }
  ]
};

const defaultRecipes: RecipeRecommendation[] = [
  {
    namaResep: "Dada Ayam Panggang Rosemary Butter",
    porsi: "Porsi Sehat 1 Orang",
    waktuMasak: "20 menit",
    alatUtama: "Wajan Teflon / Grill Pan",
    bahanBumbu: [
      { nama: "Dada Ayam Fillet", jumlah: "150g", estimasiHarga: 9600 },
      { nama: "Mentega Rendah Lemak", jumlah: "1 sdm", estimasiHarga: 1500 },
      { nama: "Bawang Putih", jumlah: "2 siung", estimasiHarga: 400 },
      { nama: "Garam Laut & Lada Hitam", jumlah: "1 sdt", estimasiHarga: 500 }
    ],
    totalBiayaEstimasi: 12000,
    langkahMasak: [
      "Keringkan dada ayam fillet dengan tisu dapur bersih lalu pipihkan sedikit.",
      "Taburkan garam laut dan lada hitam tumbuk secara merata ke seluruh permukaan ayam.",
      "Panaskan wajan antilengket dengan mentega, masukkan bawang putih geprek untuk aroma.",
      "Panggang dada ayam selama 4-5 menit tiap sisi hingga matang kecokelatan dan juicy.",
      "Sajikan hangat bersama potongan brokoli rebus."
    ],
    tipsHemat: "Selalu keringkan permukaan protein sebelum dimasak agar bumbu meresap sempurna dan menghasilkan tekstur garing yang nikmat."
  },
  {
    namaResep: "Tumis Tahu Sutra Cabe Garam Premium",
    porsi: "Porsi Sehat 1-2 Orang",
    waktuMasak: "15 menit",
    alatUtama: "Wajan Teflon",
    bahanBumbu: [
      { nama: "Tahu Sutra Putih", jumlah: "1 block", estimasiHarga: 4000 },
      { nama: "Bawang Putih Cincang", jumlah: "3 siung", estimasiHarga: 600 },
      { nama: "Cabai Rawit Merah Iris", jumlah: "5 buah", estimasiHarga: 1000 },
      { nama: "Tepung Maizena", jumlah: "2 sdm", estimasiHarga: 800 }
    ],
    totalBiayaEstimasi: 6400,
    langkahMasak: [
      "Potong tahu sutra menjadi kotak kecil-kecil dengan hati-hati.",
      "Balurkan tipis dengan tepung maizena kering di seluruh permukaannya.",
      "Goreng tahu dengan teknik shallow fry hingga berkulit garing keemasan, lalu tiriskan.",
      "Tumis cincangan bawang putih dan potongan cabai rawit merah dalam wajan kering hingga harum.",
      "Masukkan kembali tahu garing, taburkan garam laut secukupnya, aduk merata dan sajikan garing."
    ],
    tipsHemat: "Gunakan api besar saat menumis bumbu bawang kering agar aromanya keluar garing tanpa membuat tahu menjadi lembek."
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "jadwal" | "stok" | "belanja" | "rekomendasi">("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Stock State
  const [stocks, setStocks] = useState<StockItem[]>([
    { id: "1", name: "Telur Ayam Organik", category: "protein", quantity: 6, unit: "butir", isLow: false },
    { id: "2", name: "Tempe Kedelai Organik", category: "protein", quantity: 2, unit: "papan", isLow: false },
    { id: "3", name: "Dada Ayam Fillet", category: "protein", quantity: 300, unit: "gram", isLow: false },
    { id: "4", name: "Bawang Merah", category: "spices_dry", quantity: 150, unit: "gram", isLow: false },
    { id: "5", name: "Bawang Putih", category: "spices_dry", quantity: 100, unit: "gram", isLow: false },
    { id: "6", name: "Cabai Rawit", category: "spices_dry", quantity: 30, unit: "gram", isLow: false },
    { id: "7", name: "Kecap Manis", category: "spices_dry", quantity: 1, unit: "botol kecil", isLow: false },
    { id: "8", name: "Beras Sentra", category: "carbs_veg", quantity: 2, unit: "kg", isLow: false },
    { id: "9", name: "Sayur Sop Campur", category: "carbs_veg", quantity: 1, unit: "paket", isLow: false }
  ]);

  // Meal Plan State
  const [mealPlan, setMealPlan] = useState<MealPlan>(() => {
    const saved = localStorage.getItem("juni_meal_plan");
    return saved ? JSON.parse(saved) : defaultMealPlan;
  });

  // Recipe Recommendations State
  const [recipes, setRecipes] = useState<RecipeRecommendation[]>(() => {
    const saved = localStorage.getItem("juni_recipes");
    return saved ? JSON.parse(saved) : defaultRecipes;
  });

  // Generator Loading States
  const [isPlanLoading, setIsPlanLoading] = useState(false);
  const [isRecipeLoading, setIsRecipeLoading] = useState(false);
  const [customRecipeRequest, setCustomRecipeRequest] = useState("");
  const [checkedRecipeItems, setCheckedRecipeItems] = useState<Record<string, boolean>>({});

  // Manual Shopping List inputs state
  const [newShopName, setNewShopName] = useState("");
  const [newShopQty, setNewShopQty] = useState("");
  const [newShopPrice, setNewShopPrice] = useState<number | "">("");
  const [newShopCategory, setNewShopCategory] = useState<"bumbu" | "bahan">("bahan");

  // Automatically classify the category as the user types
  useEffect(() => {
    if (newShopName) {
      const isDry = isDryOrLongShelfLife(newShopName);
      setNewShopCategory(isDry ? "bumbu" : "bahan");
    }
  }, [newShopName]);

  // Get current day of the week in Indonesian dynamically
  const getTodayMenu = () => {
    const indonesianDays = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const currentDayName = indonesianDays[new Date().getDay()];
    return mealPlan.menuMingguan.find(m => m.hari === currentDayName) || mealPlan.menuMingguan[0];
  };
  const todayMenu = getTodayMenu();

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem("juni_meal_plan", JSON.stringify(mealPlan));
  }, [mealPlan]);

  useEffect(() => {
    localStorage.setItem("juni_recipes", JSON.stringify(recipes));
  }, [recipes]);

  // --- handlers ---
  const handleAddStock = (newStock: Omit<StockItem, "id" | "isLow">) => {
    const item: StockItem = {
      ...newStock,
      id: Date.now().toString(),
      isLow: newStock.quantity <= 2
    };
    setStocks(prev => [...prev, item]);
  };

  const handleUpdateStockQty = (id: string, newQty: number) => {
    setStocks(prev =>
      prev.map(item => {
        if (item.id === id) {
          return {
            ...item,
            quantity: newQty,
            isLow: newQty <= (item.category === "spices_dry" ? 30 : 2)
          };
        }
        return item;
      })
    );
  };

  const handleRemoveStock = (id: string) => {
    setStocks(prev => prev.filter(item => item.id !== id));
  };

  // Checklist handler for shopping lists
  const handleTogglePurchased = (type: "bumbu" | "bahan", index: number) => {
    setMealPlan(prev => {
      const bumbuCopy = [...prev.bumbuDetailMaksimal];
      const bahanCopy = [...prev.bahanUtamaDetail];
      
      if (type === "bumbu") {
        bumbuCopy[index] = { ...bumbuCopy[index], sudahDibeli: !bumbuCopy[index].sudahDibeli };
      } else {
        bahanCopy[index] = { ...bahanCopy[index], sudahDibeli: !bahanCopy[index].sudahDibeli };
      }

      return {
        ...prev,
        bumbuDetailMaksimal: bumbuCopy,
        bahanUtamaDetail: bahanCopy
      };
    });
  };

  // Generate new Meal Plan via server API
  const handleGenerateMealPlan = async (targetBudget: number, preferences: string) => {
    setIsPlanLoading(true);
    try {
      const response = await fetch("/api/gemini/generate-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetWeeklyBudget: targetBudget, preferences })
      });
      if (response.ok) {
        const data = await response.json();
        // If server returns fallback or valid data, set it
        setMealPlan(data.fallback ? data.fallback : data);
      } else {
        console.error("Failed to generate plan from server, using local generator");
      }
    } catch (e) {
      console.error("API error, setting default meal plan", e);
    } finally {
      setIsPlanLoading(false);
    }
  };

  // Generate custom recipe recommendations based on stock items
  const handleGenerateRecipes = async () => {
    setIsRecipeLoading(true);
    try {
      const stockNames = stocks.map(s => `${s.name} (${s.quantity} ${s.unit})`);
      const response = await fetch("/api/gemini/recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stocks: stockNames, customRequest: customRecipeRequest })
      });
      if (response.ok) {
        const data = await response.json();
        setRecipes(data.fallback ? data.fallback : data);
      }
    } catch (e) {
      console.error("API error", e);
    } finally {
      setIsRecipeLoading(false);
    }
  };

  const [addedIngredients, setAddedIngredients] = useState<Record<string, boolean>>({});

  const handleAddToShoppingList = (name: string, price: number, amount: string, recipeName: string, uniqueKey: string) => {
    const isDry = isDryOrLongShelfLife(name);
    const newItem = {
      nama: name,
      estimasiHarga: price || 0,
      jumlah: amount || "Secukupnya",
      kegunaan: `Resep AI: ${recipeName}`,
      sudahDibeli: false
    };

    setMealPlan(prev => {
      const bumbuCopy = [...prev.bumbuDetailMaksimal];
      const bahanCopy = [...prev.bahanUtamaDetail];

      if (isDry) {
        if (!bumbuCopy.some(item => item.nama.toLowerCase() === name.toLowerCase())) {
          bumbuCopy.push(newItem);
        }
      } else {
        if (!bahanCopy.some(item => item.nama.toLowerCase() === name.toLowerCase())) {
          bahanCopy.push(newItem);
        }
      }

      return {
        ...prev,
        bumbuDetailMaksimal: bumbuCopy,
        bahanUtamaDetail: bahanCopy
      };
    });

    setAddedIngredients(prev => ({
      ...prev,
      [uniqueKey]: true
    }));
  };

  const handleAddAllMissingToShoppingList = (recipeIndex: number) => {
    const recipe = recipes[recipeIndex];
    if (!recipe) return;

    setMealPlan(prev => {
      const bumbuCopy = [...prev.bumbuDetailMaksimal];
      const bahanCopy = [...prev.bahanUtamaDetail];
      const updatedKeys: Record<string, boolean> = {};

      recipe.bahanBumbu.forEach((b, bIdx) => {
        const uniqueKey = `recipe-${recipeIndex}-bumbu-${bIdx}`;
        const inStock = stocks.some(s => s.name.toLowerCase().includes(b.nama.toLowerCase()) || b.nama.toLowerCase().includes(s.name.toLowerCase()));
        
        if (!inStock) {
          const isDry = isDryOrLongShelfLife(b.nama);
          const newItem = {
            nama: b.nama,
            estimasiHarga: b.estimasiHarga || 0,
            jumlah: b.jumlah || "Secukupnya",
            kegunaan: `Resep AI: ${recipe.namaResep}`,
            sudahDibeli: false
          };

          if (isDry) {
            if (!bumbuCopy.some(item => item.nama.toLowerCase() === b.nama.toLowerCase())) {
              bumbuCopy.push(newItem);
            }
          } else {
            if (!bahanCopy.some(item => item.nama.toLowerCase() === b.nama.toLowerCase())) {
              bahanCopy.push(newItem);
            }
          }
          updatedKeys[uniqueKey] = true;
        }
      });

      setAddedIngredients(prev => ({
        ...prev,
        ...updatedKeys
      }));

      return {
        ...prev,
        bumbuDetailMaksimal: bumbuCopy,
        bahanUtamaDetail: bahanCopy
      };
    });
  };

  const handleAddShoppingItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newShopName.trim()) return;

    const price = typeof newShopPrice === "number" ? newShopPrice : 0;
    const qty = newShopQty.trim() || "Secukupnya";

    const newItem = {
      nama: newShopName.trim(),
      estimasiHarga: price,
      jumlah: qty,
      kegunaan: "Ditambahkan Manual",
      sudahDibeli: false
    };

    setMealPlan(prev => {
      const bumbuCopy = [...prev.bumbuDetailMaksimal];
      const bahanCopy = [...prev.bahanUtamaDetail];

      if (newShopCategory === "bumbu") {
        bumbuCopy.push(newItem);
      } else {
        bahanCopy.push(newItem);
      }

      return {
        ...prev,
        bumbuDetailMaksimal: bumbuCopy,
        bahanUtamaDetail: bahanCopy
      };
    });

    // Reset Form
    setNewShopName("");
    setNewShopQty("");
    setNewShopPrice("");
  };

  const handleRemoveShoppingItem = (type: "bumbu" | "bahan", index: number) => {
    setMealPlan(prev => {
      const bumbuCopy = [...prev.bumbuDetailMaksimal];
      const bahanCopy = [...prev.bahanUtamaDetail];

      if (type === "bumbu") {
        bumbuCopy.splice(index, 1);
      } else {
        bahanCopy.splice(index, 1);
      }

      return {
        ...prev,
        bumbuDetailMaksimal: bumbuCopy,
        bahanUtamaDetail: bahanCopy
      };
    });
  };

  // Cost calculators
  const totalBumbuCost = mealPlan.bumbuDetailMaksimal.reduce((acc, curr) => acc + curr.estimasiHarga, 0);
  const totalBahanCost = mealPlan.bahanUtamaDetail.reduce((acc, curr) => acc + curr.estimasiHarga, 0);
  const overallEstimatedCost = totalBumbuCost + totalBahanCost;

  const purchasedBumbuCost = mealPlan.bumbuDetailMaksimal.filter(b => b.sudahDibeli).reduce((acc, curr) => acc + curr.estimasiHarga, 0);
  const purchasedBahanCost = mealPlan.bahanUtamaDetail.filter(b => b.sudahDibeli).reduce((acc, curr) => acc + curr.estimasiHarga, 0);
  const totalPurchasedCost = purchasedBumbuCost + purchasedBahanCost;

  // Smart categorization helper for Dry vs Fresh/Wet items
  function isDryOrLongShelfLife(name: string): boolean {
    const n = name.toLowerCase();
    
    // Dry overrides
    if (
      n.includes("bumbu racik") || 
      n.includes("bumbu instan") || 
      n.includes("bubuk") || 
      n.includes("tepung") || 
      n.includes("saus") || 
      n.includes("saos") || 
      n.includes("kecap") || 
      n.includes("kaldu") ||
      n.includes("kemasan") ||
      n.includes("sachet") ||
      n.includes("la fonte") ||
      n.includes("makaroni") ||
      n.includes("pasta") ||
      n.includes("minyak") ||
      n.includes("wijen") ||
      n.includes("chili oil") ||
      n.includes("madu") ||
      n.includes("keju") ||
      n.includes("cheddar")
    ) {
      return true;
    }

    // Fresh keywords that should go to wet/fresh
    const freshKeywords = [
      "telur", "telor", "ayam", "daging", "sapi", "tahu", "tempe", "bawang", "cabai", "cabe",
      "sayur", "wortel", "buncis", "kol", "kubis", "sawi", "kangkung", "bayam", "tomat", 
      "daun bawang", "seledri", "lengkuas", "jahe", "kunyit", "serai", "salam", "jeruk", "bakso", "sosis", "kornet", "nugget"
    ];

    for (const kw of freshKeywords) {
      if (n.includes(kw)) {
        return false;
      }
    }

    // Dry keywords fallback
    const dryKeywords = [
      "mie", "indomie", "spaghetti", "elbow", "garam", "gula", "merica", "lada", "ketumbar", "paprika", "totole", "masako", "royco", "jamur", "terigu", "maizena", "tapioka", "panir", "roti", "susu", "krimer", "beras"
    ];

    for (const kw of dryKeywords) {
      if (n.includes(kw)) {
        return true;
      }
    }

    return false;
  };

  interface CategorizedShoppingItem {
    nama: string;
    estimasiHarga: number;
    jumlah: string;
    kegunaan?: string;
    sudahDibeli?: boolean;
    originalType: "bumbu" | "bahan";
    originalIndex: number;
  }

  // Combine and categorize all items
  const allShoppingItems: CategorizedShoppingItem[] = [
    ...mealPlan.bumbuDetailMaksimal.map((item, idx) => ({
      ...item,
      originalType: "bumbu" as const,
      originalIndex: idx,
    })),
    ...mealPlan.bahanUtamaDetail.map((item, idx) => ({
      ...item,
      originalType: "bahan" as const,
      originalIndex: idx,
    })),
  ];

  const bumbuKeringList = allShoppingItems.filter(item => isDryOrLongShelfLife(item.nama));
  const bahanBasahList = allShoppingItems.filter(item => !isDryOrLongShelfLife(item.nama));

  const totalBumbuKeringCost = bumbuKeringList.reduce((acc, curr) => acc + curr.estimasiHarga, 0);
  const totalBahanBasahCost = bahanBasahList.reduce((acc, curr) => acc + curr.estimasiHarga, 0);

  return (
    <div className="min-h-screen md:h-screen md:overflow-hidden bg-slate-50 font-sans text-slate-900 flex flex-col md:flex-row" id="app-root-container">
      {/* Mobile Top Navigation */}
      <div className="md:hidden sticky top-0 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 p-4 flex justify-between items-center z-30 shadow-xs shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
            <Utensils className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight text-emerald-800 uppercase">Meal Prep</span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-slate-600 focus:outline-none"
          id="btn-mobile-menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Backdrop Overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-slate-900/30 backdrop-blur-xs z-40 transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:relative top-0 left-0 w-64 h-screen md:h-full bg-white border-r border-slate-200 flex flex-col p-6 transition-transform duration-300 z-50 shadow-lg md:shadow-none`}
        id="sidebar-navigation"
      >
        {/* Sidebar Header */}
        <div className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-emerald-600 rounded-none flex items-center justify-center shadow-sm">
              <Utensils className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-emerald-800 uppercase block">Juni's Prep</span>
            </div>
          </div>
          {/* Mobile Close Button */}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="md:hidden p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-none transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <nav className="space-y-1.5 flex-1" id="nav-tabs-group">
          <button
            onClick={() => {
              setActiveTab("dashboard");
              setIsMobileMenuOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-none font-medium text-sm transition-all cursor-pointer ${
              activeTab === "dashboard"
                ? "bg-emerald-50 text-emerald-700 shadow-sm border border-emerald-100/50"
                : "text-slate-500 hover:bg-slate-50"
            }`}
          >
            <Database className="w-4 h-4" />
            Dashboard Utama
          </button>

          <button
            onClick={() => {
              setActiveTab("jadwal");
              setIsMobileMenuOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-none font-medium text-sm transition-all cursor-pointer ${
              activeTab === "jadwal"
                ? "bg-emerald-50 text-emerald-700 shadow-sm border border-emerald-100/50"
                : "text-slate-500 hover:bg-slate-50"
            }`}
          >
            <Calendar className="w-4 h-4" />
            Jadwal Menu
          </button>

          <button
            onClick={() => {
              setActiveTab("stok");
              setIsMobileMenuOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-none font-medium text-sm transition-all cursor-pointer ${
              activeTab === "stok"
                ? "bg-emerald-50 text-emerald-700 shadow-sm border border-emerald-100/50"
                : "text-slate-500 hover:bg-slate-50"
            }`}
          >
            <Plus className="w-4 h-4" />
            Stok Bahan
          </button>

          <button
            onClick={() => {
              setActiveTab("belanja");
              setIsMobileMenuOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-none font-medium text-sm transition-all cursor-pointer ${
              activeTab === "belanja"
                ? "bg-emerald-50 text-emerald-700 shadow-sm border border-emerald-100/50"
                : "text-slate-500 hover:bg-slate-50"
            }`}
          >
            <CheckSquare className="w-4 h-4" />
            List Belanja & Estimasi
          </button>

          <button
            onClick={() => {
              setActiveTab("rekomendasi");
              setIsMobileMenuOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-none font-medium text-sm transition-all cursor-pointer ${
              activeTab === "rekomendasi"
                ? "bg-emerald-50 text-emerald-700 shadow-sm border border-emerald-100/50"
                : "text-slate-500 hover:bg-slate-50"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Rekomendasi Pintar AI
          </button>
        </nav>

        {/* Sidebar Footer Info */}
        <div className="mt-auto p-4 bg-emerald-600 rounded-none text-white shadow-sm" id="sidebar-budget-summary">
          <p className="text-xs opacity-85 mb-0.5 font-medium">Estimasi Belanja Bulanan</p>
          <p className="text-xl font-bold">Rp {overallEstimatedCost.toLocaleString("id-ID")}</p>
          <div className="w-full bg-emerald-700/50 h-1.5 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-emerald-300 h-full transition-all duration-300"
              style={{ width: `${Math.min(100, (totalPurchasedCost / (overallEstimatedCost || 1)) * 100)}%` }}
            ></div>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-[10px] opacity-75">Sudah Dibeli:</span>
            <span className="text-[10px] font-semibold">{Math.round((totalPurchasedCost / (overallEstimatedCost || 1)) * 100)}%</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col p-5 md:p-8 overflow-y-auto md:h-full">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8 shrink-0" id="main-content-header">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">Halo, Juni 👋</h1>
            </div>
            <p className="text-slate-500 text-sm mt-0.5">Asisten meal prep bulanan cerdas untuk rencana makan bergizi, terjadwal, dan efisien.</p>
          </div>
          <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-none border border-slate-200/60 shadow-xs self-start sm:self-auto">
            <div className="w-8 h-8 rounded-none bg-red-50 flex items-center justify-center shrink-0">
              <AlertCircle className="w-4 h-4 text-red-600" />
            </div>
            <div className="text-left">
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Stok Menipis</p>
              <p className="text-sm font-extrabold text-slate-800">
                {stocks.filter(s => s.isLow).length} Bahan
              </p>
            </div>
          </div>
        </header>

        {/* Tab Panel Renderers with motion container */}
        <div className="flex-1" id="tab-content-panel">
          <AnimatePresence mode="wait">
            {/* Dashboard Utama Tab */}
            {activeTab === "dashboard" && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
                key="dashboard-tab"
              >
                {/* 3-Column Bento Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left Column: Quick Stats & AI Tips */}
                  <div className="lg:col-span-4 flex flex-col gap-6">
                    <div className="bg-white p-6 rounded-none border border-slate-200 shadow-xs flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-bold tracking-widest text-emerald-700 uppercase">Ringkasan Budget</span>
                        <h2 className="text-xl font-bold text-slate-800 mt-2">Gaya Hidup Terencana</h2>
                        <p className="text-xs text-slate-500 mt-1">Porsi akurat, bumbu lengkap, dan anggaran belanja mingguan yang efisien.</p>
                        
                        <div className="mt-6 space-y-4">
                          <div className="flex justify-between items-center py-2 border-b border-slate-100">
                            <span className="text-xs text-slate-600 flex items-center gap-1.5"><Wallet className="w-3.5 h-3.5 text-emerald-600" /> Bumbu Dasar</span>
                            <span className="text-xs font-semibold text-slate-800">Rp {totalBumbuCost.toLocaleString("id-ID")}</span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b border-slate-100">
                            <span className="text-xs text-slate-600 flex items-center gap-1.5"><Egg className="w-3.5 h-3.5 text-amber-600" /> Bahan Utama</span>
                            <span className="text-xs font-semibold text-slate-800">Rp {totalBahanCost.toLocaleString("id-ID")}</span>
                          </div>
                          <div className="flex justify-between items-center py-2 font-bold text-emerald-800 bg-emerald-50/50 p-2 rounded-none">
                            <span className="text-xs flex items-center gap-1.5"><TrendingDown className="w-3.5 h-3.5 text-emerald-700" /> Total Hemat</span>
                            <span className="text-xs">Rp {overallEstimatedCost.toLocaleString("id-ID")} / mgg</span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => setActiveTab("belanja")}
                        className="w-full mt-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-none text-xs font-bold uppercase tracking-wider transition shadow-sm"
                      >
                        Lihat List Belanja
                      </button>
                    </div>

                    {/* Indonesian Kost Meal-prep Tips banner */}
                    <div className="bg-amber-50/70 border border-amber-200/60 p-5 rounded-none">
                      <div className="flex gap-2.5 items-start">
                        <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wide">💡 Strategi Meal-Prep Juni:</h4>
                          <p className="text-xs text-amber-900/90 mt-1.5 leading-relaxed">
                            Bagi protein utama (misalnya ayam) menjadi beberapa wadah kecil kedap udara sebelum disimpan di freezer. Hanya cairkan daging porsi masak hari tersebut agar rasa tetap prima dan terhindar dari bacteria!
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Middle Column: Current Day Menu Peek */}
                  <div className="lg:col-span-5 flex flex-col gap-4 bg-white rounded-none p-6 border border-slate-200 shadow-xs">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div>
                        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">Jadwal Hari Ini</h2>
                        <p className="text-lg font-bold text-slate-800">{todayMenu?.hari || "Hari Ini"}</p>
                      </div>
                      <button
                        onClick={() => setActiveTab("jadwal")}
                        className="text-xs text-emerald-600 font-bold hover:underline flex items-center"
                      >
                        Semua Hari <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="space-y-4 mt-3 flex-1 flex flex-col justify-between">
                      {todayMenu ? (
                        <>
                          {/* Breakfast Peek */}
                          <div className="p-3.5 bg-slate-50/80 rounded-none border border-slate-100 flex-1 flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-[10px] font-bold px-1.5 py-0.5 bg-amber-100 text-amber-800 rounded-none">Sarapan</span>
                                <span className="text-[10px] text-slate-400 font-medium">{todayMenu.sarapan.porsi}</span>
                              </div>
                              <h4 className="font-semibold text-sm text-slate-800">{todayMenu.sarapan.nama}</h4>
                            </div>
                            <p className="text-[11px] text-slate-500 mt-2 truncate">Bumbu: {todayMenu.sarapan.bumbu}</p>
                          </div>

                          {/* Lunch Peek */}
                          <div className="p-3.5 bg-slate-50/80 rounded-none border border-slate-100 flex-1 flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-[10px] font-bold px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-none">Makan Siang</span>
                                <span className="text-[10px] text-slate-400 font-medium">{todayMenu.siang.porsi}</span>
                              </div>
                              <h4 className="font-semibold text-sm text-slate-800">{todayMenu.siang.nama}</h4>
                            </div>
                            <p className="text-[11px] text-slate-500 mt-2 truncate">Bumbu: {todayMenu.siang.bumbu}</p>
                          </div>

                          {/* Dinner Peek */}
                          <div className="p-3.5 bg-slate-50/80 rounded-none border border-slate-100 flex-1 flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-[10px] font-bold px-1.5 py-0.5 bg-blue-100 text-blue-800 rounded-none">Makan Malam</span>
                                <span className="text-[10px] text-slate-400 font-medium">{todayMenu.malam.porsi}</span>
                              </div>
                              <h4 className="font-semibold text-sm text-slate-800">{todayMenu.malam.nama}</h4>
                            </div>
                            <p className="text-[11px] text-slate-500 mt-2 truncate">Bumbu: {todayMenu.malam.bumbu}</p>
                          </div>
                        </>
                      ) : (
                        <p className="text-xs text-slate-400 italic text-center py-6">Menu hari ini belum diatur.</p>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Mini Stock & Quick Recipes Preview */}
                  <div className="lg:col-span-3 flex flex-col gap-6">
                    {/* Mini Stock card */}
                    <div className="bg-white p-5 rounded-none border border-slate-200 shadow-xs">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Status Stok Dapur</h3>
                        <button onClick={() => setActiveTab("stok")} className="text-xs text-emerald-600 font-bold hover:underline">Kelola</button>
                      </div>
                      <div className="space-y-2.5">
                        {stocks.slice(0, 4).map(item => (
                          <div key={item.id} className="flex justify-between items-center text-xs">
                            <span className="text-slate-700 font-medium">{item.name}</span>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] ${item.isLow ? "bg-red-50 text-red-600 font-bold" : "bg-slate-100 text-slate-600"}`}>
                              {item.quantity} {item.unit}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* AI Smart Recipe recommendations preview */}
                    <div className="bg-slate-800 text-white p-5 rounded-none flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[9px] font-bold tracking-widest text-emerald-400 uppercase">Rekomendasi Cerdas</span>
                        <h3 className="font-bold text-base mt-1.5">Sisa Bahan di Kulkas?</h3>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                          AI akan mencarikan resep paling pas & hemat berbekal sisa bumbu dapur yang kamu miliki saat ini.
                        </p>
                      </div>

                      <button
                        onClick={() => setActiveTab("rekomendasi")}
                        className="w-full mt-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-none text-xs font-bold uppercase transition"
                      >
                        Tanya Rekomendasi
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Jadwal Menu Tab */}
            {activeTab === "jadwal" && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
                key="jadwal-tab"
              >
                <MealPlannerView
                  mealPlan={mealPlan}
                  onRegeneratePlan={handleGenerateMealPlan}
                  loading={isPlanLoading}
                />
              </motion.div>
            )}

            {/* Stok Dapur Kost Tab */}
            {activeTab === "stok" && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
                key="stok-tab"
              >
                <div className="mb-4">
                  <h2 className="text-lg font-bold text-slate-800 font-sans tracking-tight">Inventaris Dapur Juni</h2>
                  <p className="text-xs text-slate-400">Selalu update stok agar sistem AI bisa memberikan rekomendasi masakan yang presisi.</p>
                </div>
                <StockManager
                  stocks={stocks}
                  onAddStock={handleAddStock}
                  onUpdateQty={handleUpdateStockQty}
                  onRemoveStock={handleRemoveStock}
                />
              </motion.div>
            )}

            {/* List Belanja & Estimasi Harga Tab */}
            {activeTab === "belanja" && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
                key="belanja-tab"
              >
                {/* Shopping Header info */}
                <div className="bg-white p-6 rounded-none border border-slate-200 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h2 className="text-lg font-bold text-slate-800 font-sans tracking-tight">Kalkulator & Estimasi Belanja</h2>
                    <p className="text-xs text-slate-400 mt-1">Kelola daftar belanjaan mingguan Anda, baik dari rancangan menu AI maupun ditambahkan sendiri secara kustom.</p>
                  </div>
                </div>

                {/* Form Tambah Bahan Manual */}
                <form onSubmit={handleAddShoppingItem} className="bg-white p-5 rounded-none border border-slate-200 shadow-xs space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                    <Plus className="w-4 h-4 text-emerald-600" />
                    <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700">Tambah Bahan Belanjaan Manual</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Nama Bahan / Bumbu</label>
                      <input
                        type="text"
                        placeholder="Contoh: Buncis, Saus Tiram"
                        value={newShopName}
                        onChange={(e) => setNewShopName(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-none focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Takaran / Jumlah</label>
                      <input
                        type="text"
                        placeholder="Contoh: 1/2 kg, 2 botol"
                        value={newShopQty}
                        onChange={(e) => setNewShopQty(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-none focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Estimasi Harga (Rp)</label>
                      <input
                        type="number"
                        placeholder="Contoh: 15000"
                        value={newShopPrice}
                        onChange={(e) => setNewShopPrice(e.target.value === "" ? "" : Number(e.target.value))}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-none focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Kategori (Auto-Deteksi)</label>
                      <select
                        value={newShopCategory}
                        onChange={(e) => setNewShopCategory(e.target.value as "bumbu" | "bahan")}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-none focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-700 font-medium"
                      >
                        <option value="bahan">🥬 Bahan Basah & Segar</option>
                        <option value="bumbu">🌶️ Bumbu Kering & Simpan Lama</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end pt-1">
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition rounded-none shadow-sm flex items-center justify-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" /> Tambahkan ke Daftar
                    </button>
                  </div>
                </form>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="shopping-lists-columns">
                  {/* Bumbu Kering & Simpan Lama */}
                  <div className="bg-white p-6 rounded-none border border-slate-200/80 shadow-xs">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                      <div>
                        <h3 className="font-bold text-sm text-slate-700 flex items-center gap-1.5">
                          <Flame className="w-4 h-4 text-orange-500" /> Bumbu Kering & Simpan Lama
                        </h3>
                        <span className="text-[10px] text-slate-400 font-medium block mt-0.5">🥫 Bisa dicicil / beli online sekaligus</span>
                      </div>
                      <span className="text-xs font-semibold bg-orange-50 text-orange-700 px-2 py-0.5 rounded-full font-mono">
                        Rp {totalBumbuKeringCost.toLocaleString("id-ID")}
                      </span>
                    </div>

                    <div className="space-y-2">
                      {bumbuKeringList.length === 0 ? (
                        <p className="text-xs text-slate-400 italic text-center py-6">Tidak ada bumbu kering.</p>
                      ) : (
                        bumbuKeringList.map((item, idx) => (
                          <div
                            key={`dry-${idx}`}
                            onClick={() => handleTogglePurchased(item.originalType, item.originalIndex)}
                            className={`flex items-start gap-3 p-3 rounded-none border transition cursor-pointer group ${
                              item.sudahDibeli
                                ? "bg-slate-50/70 border-slate-100 opacity-60 line-through text-slate-400"
                                : "bg-white border-slate-100 hover:border-emerald-100 text-slate-700"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={!!item.sudahDibeli}
                              readOnly
                              className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500 h-4 w-4"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-center">
                                <span className="font-semibold text-xs truncate">{item.nama}</span>
                                <span className="text-xs font-bold font-mono whitespace-nowrap">Rp {item.estimasiHarga.toLocaleString("id-ID")}</span>
                              </div>
                              <div className="flex justify-between items-center mt-1">
                                <span className="text-[10px] text-slate-400">Takaran: {item.jumlah}</span>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemoveShoppingItem(item.originalType, item.originalIndex);
                                  }}
                                  className="text-slate-400 hover:text-red-500 p-1 transition-colors rounded-none"
                                  title="Hapus dari daftar belanja"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Bahan Basah & Segar */}
                  <div className="bg-white p-6 rounded-none border border-slate-200/80 shadow-xs">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                      <div>
                        <h3 className="font-bold text-sm text-slate-700 flex items-center gap-1.5">
                          <Egg className="w-4 h-4 text-emerald-500" /> Bahan Basah & Segar
                        </h3>
                        <span className="text-[10px] text-slate-400 font-medium block mt-0.5">🥬 Susah beli online, beli di warung/pasar tradisional</span>
                      </div>
                      <span className="text-xs font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-mono">
                        Rp {totalBahanBasahCost.toLocaleString("id-ID")}
                      </span>
                    </div>

                    <div className="space-y-2">
                      {bahanBasahList.length === 0 ? (
                        <p className="text-xs text-slate-400 italic text-center py-6">Tidak ada bahan segar.</p>
                      ) : (
                        bahanBasahList.map((item, idx) => (
                          <div
                            key={`fresh-${idx}`}
                            onClick={() => handleTogglePurchased(item.originalType, item.originalIndex)}
                            className={`flex items-start gap-3 p-3 rounded-none border transition cursor-pointer group ${
                              item.sudahDibeli
                                ? "bg-slate-50/70 border-slate-100 opacity-60 line-through text-slate-400"
                                : "bg-white border-slate-100 hover:border-emerald-100 text-slate-700"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={!!item.sudahDibeli}
                              readOnly
                              className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500 h-4 w-4"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-center">
                                <span className="font-semibold text-xs truncate">{item.nama}</span>
                                <span className="text-xs font-bold font-mono whitespace-nowrap">Rp {item.estimasiHarga.toLocaleString("id-ID")}</span>
                              </div>
                              <div className="flex justify-between items-center mt-1">
                                <span className="text-[10px] text-slate-400">Takaran: {item.jumlah}</span>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleRemoveShoppingItem(item.originalType, item.originalIndex);
                                  }}
                                  className="text-slate-400 hover:text-red-500 p-1 transition-colors rounded-none"
                                  title="Hapus dari daftar belanja"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Rekomendasi Pintar AI Tab */}
            {activeTab === "rekomendasi" && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
                key="rekomendasi-tab"
              >
                {/* Prompt generator board */}
                <div className="bg-white p-6 rounded-none border border-slate-200 shadow-xs space-y-4">
                  <div>
                    <h2 className="text-lg font-bold text-slate-800 font-sans tracking-tight">Rekomendasi Pintar AI Berbasis Stok</h2>
                    <p className="text-xs text-slate-400">Sistem AI akan menganalisa bahan persediaan dapur saat ini dan merekomendasikan resep masakan yang sehat, bergizi, dan efisien.</p>
                  </div>

                  {/* Dynamic stock badges being passed to AI */}
                  <div className="bg-slate-50/80 p-3 rounded-none border border-slate-100">
                    <span className="text-[10px] text-slate-400 font-medium block mb-2 uppercase">Bahan Stok yang digunakan AI:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {stocks.map(s => (
                        <span key={s.id} className="text-[11px] bg-white border border-slate-200 px-2 py-1 rounded-none text-slate-700 flex items-center gap-1 shadow-2xs">
                          {s.name} <span className="text-slate-400">({s.quantity} {s.unit})</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Custom recipe requests input */}
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Punya permintaan resep khusus? (Opsional)</label>
                    <div className="flex gap-2">
                      <input
                        id="custom-recipe-request"
                        type="text"
                        placeholder="Contoh: Pengen olahan telur yang pedas, atau tumisan sayur praktis."
                        value={customRecipeRequest}
                        onChange={(e) => setCustomRecipeRequest(e.target.value)}
                        className="flex-1 px-4 py-2.5 rounded-none bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs"
                      />
                      <button
                        id="btn-ask-recipe"
                        disabled={isRecipeLoading}
                        onClick={handleGenerateRecipes}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-5 py-2.5 rounded-none transition flex items-center gap-1.5 shrink-0 disabled:opacity-50"
                      >
                        {isRecipeLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                        Tanya AI
                      </button>
                    </div>
                  </div>
                </div>

                {/* Recommendations recipes output grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="ai-recipes-list">
                  {recipes.map((recipe, index) => (
                    <div key={index} className="bg-white p-6 rounded-none border border-slate-200 shadow-xs flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-3">
                          <span className="text-[10px] font-bold px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-none">
                            ✨ {recipe.alatUtama}
                          </span>
                          <span className="text-xs text-slate-400 font-semibold">{recipe.waktuMasak}</span>
                        </div>
                        <h3 className="font-bold text-slate-800 text-lg">{recipe.namaResep}</h3>
                        <p className="text-xs text-slate-400 font-medium mt-0.5">{recipe.porsi}</p>

                        {/* Ingredients listed with price */}
                        <div className="mt-4 bg-slate-50/50 rounded-none p-4 border border-slate-100/80">
                          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Bahan & Bumbu (Bisa Dicentang):</h4>
                          <div className="space-y-2">
                            {recipe.bahanBumbu.map((b, bIdx) => {
                              const bKey = `recipe-${index}-bumbu-${bIdx}`;
                              const isChecked = !!checkedRecipeItems[bKey];
                              const inStock = stocks.some(s => s.name.toLowerCase().includes(b.nama.toLowerCase()) || b.nama.toLowerCase().includes(s.name.toLowerCase()));
                              const isAdded = !!addedIngredients[bKey];

                              return (
                                <div
                                  key={bIdx}
                                  onClick={() => setCheckedRecipeItems(prev => ({ ...prev, [bKey]: !prev[bKey] }))}
                                  className="flex justify-between items-center text-xs text-slate-700 cursor-pointer select-none group transition-colors py-1"
                                >
                                  <div className="flex items-start gap-2 max-w-[65%]">
                                    <span className="mt-0.5 shrink-0 text-slate-400">
                                      {isChecked ? (
                                        <CheckSquare className="w-3.5 h-3.5 text-emerald-600" />
                                      ) : (
                                        <Square className="w-3.5 h-3.5 group-hover:text-slate-600" />
                                      )}
                                    </span>
                                    <span className={isChecked ? "line-through text-slate-400 font-normal" : "font-medium"}>
                                      {b.nama} <span className="text-slate-400">({b.jumlah})</span>
                                    </span>
                                  </div>

                                  <div className="flex items-center gap-2 shrink-0">
                                    {inStock ? (
                                      <span className="text-[10px] bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded-none font-bold">Ada</span>
                                    ) : (
                                      <>
                                        {isAdded ? (
                                          <span className="text-[10px] bg-sky-50 text-sky-600 px-1.5 py-0.5 rounded-none font-bold">✓ Belanja</span>
                                        ) : (
                                          <button
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              handleAddToShoppingList(b.nama, b.estimasiHarga, b.jumlah, recipe.namaResep, bKey);
                                            }}
                                            className="text-[10px] bg-amber-50 hover:bg-amber-150 text-amber-800 px-1.5 py-0.5 rounded-none font-bold transition flex items-center gap-0.5 border border-amber-200/50"
                                            title="Tambahkan ke list belanja"
                                          >
                                            + Belanja
                                          </button>
                                        )}
                                      </>
                                    )}
                                    <span className={`font-semibold text-slate-500 font-mono ${isChecked ? "line-through text-slate-400" : ""}`}>
                                      Rp {b.estimasiHarga.toLocaleString("id-ID")}
                                    </span>
                                  </div>
                                </div>
                              );
                            })}

                            {recipe.bahanBumbu.filter(b => {
                              const inStock = stocks.some(s => s.name.toLowerCase().includes(b.nama.toLowerCase()) || b.nama.toLowerCase().includes(s.name.toLowerCase()));
                              const bKey = `recipe-${index}-bumbu-${recipe.bahanBumbu.indexOf(b)}`;
                              return !inStock && !addedIngredients[bKey];
                            }).length > 0 && (
                              <button
                                onClick={() => handleAddAllMissingToShoppingList(index)}
                                className="w-full mt-3 py-2 bg-amber-50 hover:bg-amber-100 border border-amber-200/55 rounded-none text-[11px] font-bold text-amber-800 flex items-center justify-center gap-1.5 transition active:scale-98"
                              >
                                <ShoppingCart className="w-3.5 h-3.5" />
                                Tambahkan Bahan Kosong ke Belanjaan
                              </button>
                            )}
                            <div className="border-t border-slate-200/60 pt-2 mt-2 flex justify-between items-center text-xs font-bold text-emerald-800">
                              <span>Total Biaya Bahan</span>
                              <span className="font-mono">Rp {recipe.totalBiayaEstimasi.toLocaleString("id-ID")}</span>
                            </div>
                          </div>
                        </div>

                        {/* Steps to cook */}
                        <div className="mt-4">
                          <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Langkah Memasak (Bisa Dicentang):</h4>
                          <div className="space-y-1.5 pl-1">
                            {recipe.langkahMasak.map((l, lIdx) => {
                              const sKey = `recipe-${index}-step-${lIdx}`;
                              const isStepChecked = !!checkedRecipeItems[sKey];
                              return (
                                <div
                                  key={lIdx}
                                  onClick={() => setCheckedRecipeItems(prev => ({ ...prev, [sKey]: !prev[sKey] }))}
                                  className="flex items-start gap-2 text-xs text-slate-600 hover:text-slate-900 cursor-pointer select-none transition-colors"
                                >
                                  <span className="mt-0.5 shrink-0 text-slate-400">
                                    {isStepChecked ? (
                                      <CheckSquare className="w-3.5 h-3.5 text-emerald-600" />
                                    ) : (
                                      <span className="w-3.5 h-3.5 inline-flex items-center justify-center font-bold text-[9px] border border-slate-300 rounded text-slate-400 font-mono">{lIdx + 1}</span>
                                    )}
                                  </span>
                                  <span className={`leading-relaxed ${isStepChecked ? "line-through text-slate-400 font-normal" : "font-medium"}`}>
                                    {l}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 pt-3 border-t border-slate-100 text-xs text-amber-700 italic flex items-start gap-1">
                        <span className="font-semibold shrink-0">Tips Hemat:</span>
                        <span>{recipe.tipsHemat}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
