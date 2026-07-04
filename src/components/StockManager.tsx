import React, { useState } from "react";
import { StockItem } from "../types";
import { Plus, Minus, Trash2, AlertTriangle, Carrot, Egg, Flame, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface StockManagerProps {
  stocks: StockItem[];
  onAddStock: (item: Omit<StockItem, "id" | "isLow">) => void;
  onUpdateQty: (id: string, newQty: number) => void;
  onRemoveStock: (id: string) => void;
}

export default function StockManager({ stocks, onAddStock, onUpdateQty, onRemoveStock }: StockManagerProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState<StockItem["category"]>("protein");
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState("pcs");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAddStock({
      name: name.trim(),
      category,
      quantity,
      unit
    });
    setName("");
    setQuantity(1);
  };

  const getCategoryIcon = (cat: StockItem["category"]) => {
    switch (cat) {
      case "protein":
        return <Egg className="w-4 h-4 text-amber-600" />;
      case "carbs_veg":
        return <Carrot className="w-4 h-4 text-emerald-600" />;
      case "spices_dry":
        return <Flame className="w-4 h-4 text-orange-600" />;
      default:
        return <ShieldAlert className="w-4 h-4 text-gray-600" />;
    }
  };

  const getCategoryLabel = (cat: StockItem["category"]) => {
    switch (cat) {
      case "protein": return "Protein & Lauk";
      case "carbs_veg": return "Karbohidrat & Sayur";
      case "spices_dry": return "Bumbu & Bahan Kering";
      default: return "Lainnya";
    }
  };

  const categorizedStocks = {
    protein: stocks.filter((s) => s.category === "protein"),
    carbs_veg: stocks.filter((s) => s.category === "carbs_veg"),
    spices_dry: stocks.filter((s) => s.category === "spices_dry"),
    other: stocks.filter((s) => s.category === "other")
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="stock-manager-container">
      {/* Add New Stock Form */}
      <div className="bg-white/80 backdrop-blur-md rounded-none p-6 border border-amber-100 shadow-sm" id="add-stock-card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 font-sans tracking-tight flex items-center gap-2">
          <Plus className="w-5 h-5 text-amber-600" />
          Tambah Stok Persediaan Dapur
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Nama Bahan / Bumbu</label>
            <input
              id="stock-input-name"
              type="text"
              placeholder="Contoh: Bawang Merah, Tempe, Telur"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-none bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Kategori</label>
              <select
                id="stock-input-category"
                value={category}
                onChange={(e) => setCategory(e.target.value as StockItem["category"])}
                className="w-full px-2 py-2 rounded-none bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
              >
                <option value="protein">🥩 Protein</option>
                <option value="carbs_veg">🥬 Sayur & Karbo</option>
                <option value="spices_dry">🌶️ Bumbu & Rempah</option>
                <option value="other">📦 Lainnya</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Satuan</label>
              <input
                id="stock-input-unit"
                type="text"
                placeholder="pcs, gram, papan"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full px-3 py-2 rounded-none bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Jumlah Awal</label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-none text-gray-700 transition"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-base font-semibold w-12 text-center">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-none text-gray-700 transition"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <button
            id="btn-add-stock"
            type="submit"
            className="w-full mt-2 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-none font-medium text-sm transition shadow-sm hover:shadow-md"
          >
            Tambahkan ke Dapur
          </button>
        </form>

        <div className="mt-6 p-4 bg-amber-50/50 rounded-none border border-amber-100/70 text-xs text-amber-800 space-y-2">
          <p className="font-semibold flex items-center gap-1.5">
            💡 Tips Pengelolaan & Kesegaran Bahan:
          </p>
          <ul className="list-disc list-inside space-y-1 text-gray-600">
            <li>Simpan bumbu bawang di tempat kering gantung yang memiliki sirkulasi udara baik agar aroma tetap tajam.</li>
            <li>Lapisi sayuran hijau dengan tisu dapur kering di dalam wadah kedap udara agar kelembapan terjaga.</li>
            <li>Tempe yang dibungkus daun pisang murni memiliki aroma fermentasi khas yang lebih sedap saat dimasak.</li>
          </ul>
        </div>
      </div>

      {/* Stock Groups Display */}
      <div className="lg:col-span-2 space-y-6" id="stock-list-container">
        {stocks.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-md rounded-none p-12 text-center border border-slate-200/60 shadow-xs flex flex-col items-center justify-center">
            <Carrot className="w-12 h-12 text-slate-300 mb-3 animate-pulse" />
            <h4 className="font-semibold text-slate-700 text-sm">Persediaan Dapur Kosong</h4>
            <p className="text-xs text-slate-400 mt-1 max-w-sm">Masukkan bahan makanan atau bumbu di form sebelah kiri untuk mencatat persediaan bahan dapur Anda.</p>
          </div>
        ) : (
          (["protein", "carbs_veg", "spices_dry", "other"] as StockItem["category"][]).map((cat) => {
            const items = categorizedStocks[cat];
            if (items.length === 0) return null;

            return (
              <div key={cat} className="bg-white/80 backdrop-blur-md rounded-none p-5 border border-gray-100 shadow-sm">
                <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2 border-b border-gray-100 pb-2">
                  {getCategoryIcon(cat)}
                  {getCategoryLabel(cat)}
                  <span className="ml-auto text-xs bg-gray-100 px-2 py-0.5 rounded-none text-gray-500 font-normal">
                    {items.length} item
                  </span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <AnimatePresence mode="popLayout">
                    {items.map((item) => (
                      <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        key={item.id}
                        className={`flex items-center justify-between p-3 rounded-none border ${
                          item.isLow
                            ? "border-red-100 bg-red-50/30 text-red-900"
                            : "border-gray-100 bg-white text-gray-800 hover:border-amber-100"
                        } transition`}
                      >
                        <div className="flex flex-col">
                          <span className="font-medium text-sm flex items-center gap-1.5">
                            {item.name}
                            {item.isLow && (
                              <span className="flex items-center text-[10px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded-none font-medium">
                                <AlertTriangle className="w-2.5 h-2.5 mr-0.5" /> Menipis
                              </span>
                            )}
                          </span>
                          <span className="text-xs text-gray-400">
                            {item.quantity} {item.unit}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => onUpdateQty(item.id, Math.max(0, item.quantity - 1))}
                            className="p-1 bg-gray-50 hover:bg-gray-100 rounded-none text-gray-600 transition"
                            title="Kurangi stok"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                            className="p-1 bg-gray-50 hover:bg-gray-100 rounded-none text-gray-600 transition"
                            title="Tambah stok"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onRemoveStock(item.id)}
                            className="p-1 hover:bg-red-50 rounded-none text-gray-400 hover:text-red-500 transition ml-1"
                            title="Hapus"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
