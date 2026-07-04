import React, { useState } from "react";
import { MealPlan } from "../types";
import { Calendar, RefreshCw, Sparkles, Clock, AlertCircle, CheckSquare, Square } from "lucide-react";
import { motion } from "motion/react";

interface MealPlannerViewProps {
  mealPlan: MealPlan;
  onRegeneratePlan: (targetBudget: number, preferences: string) => Promise<void>;
  loading: boolean;
}

export default function MealPlannerView({ mealPlan, onRegeneratePlan, loading }: MealPlannerViewProps) {
  const [selectedDay, setSelectedDay] = useState("Senin");
  const [targetBudget, setTargetBudget] = useState(mealPlan.totalBudgetEstimasi);
  const [preference, setPreference] = useState("Praktis, Cepat & Hemat");

  // Local state to keep track of checked spices so they persist when checking off
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
  const currentDayPlan = mealPlan.menuMingguan.find((d) => d.hari === selectedDay) || mealPlan.menuMingguan[0];

  const handleRegenerate = () => {
    onRegeneratePlan(targetBudget, preference);
  };

  const toggleCheckedItem = (key: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Splits comma-separated spices/bumbu into clean checkable lines
  const renderBumbuChecklist = (bumbuString: string, sectionId: string) => {
    const items = bumbuString
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    if (items.length === 0) {
      return <p className="text-xs text-slate-400 italic">Tidak membutuhkan bumbu khusus.</p>;
    }

    return (
      <div className="space-y-1.5 mt-2 bg-slate-50/70 p-3 rounded-none border border-slate-100/80">
        {items.map((item, idx) => {
          const itemKey = `${selectedDay}-${sectionId}-bumbu-${idx}`;
          const isChecked = !!checkedItems[itemKey];
          return (
            <div
              key={itemKey}
              onClick={() => toggleCheckedItem(itemKey)}
              className="flex items-start gap-2 text-xs text-slate-600 hover:text-slate-900 cursor-pointer select-none transition-colors"
            >
              <div className="mt-0.5 shrink-0 text-slate-400">
                {isChecked ? (
                  <CheckSquare className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Square className="w-3.5 h-3.5 hover:text-slate-600" />
                )}
              </div>
              <span className={`leading-snug ${isChecked ? "line-through text-slate-400 font-normal" : "font-medium"}`}>
                {item}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-6" id="meal-planner-view">
      {/* Top Banner & Control Board */}
      <div className="bg-white rounded-none p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <span className="text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-none text-[10px] font-bold uppercase tracking-wider">
            Menu Sehat & Hemat
          </span>
          <h2 className="text-xl md:text-2xl font-bold font-display text-slate-800 tracking-tight">
            Estimasi Belanja Mingguan: <span className="font-mono text-emerald-700">Rp {mealPlan.totalBudgetEstimasi.toLocaleString("id-ID")}</span>
          </h2>
          <p className="text-slate-500 text-xs max-w-xl leading-relaxed">
            {mealPlan.kelebihanTips}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
          <div className="bg-slate-50 border border-slate-200/80 px-4 py-2 rounded-none">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">Target Budget</span>
            <div className="flex items-center mt-0.5">
              <span className="text-xs font-bold text-slate-500 mr-1">Rp</span>
              <input
                id="input-target-budget"
                type="number"
                value={targetBudget}
                onChange={(e) => setTargetBudget(Number(e.target.value))}
                className="bg-transparent font-bold text-sm text-slate-800 w-24 focus:outline-none font-mono"
              />
            </div>
          </div>
          <button
            id="btn-regenerate-menu"
            disabled={loading}
            onClick={handleRegenerate}
            className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-3 rounded-none font-bold text-xs uppercase tracking-wider transition active:scale-98 shadow-sm disabled:opacity-50"
          >
            {loading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4 text-emerald-400" />
            )}
            Rencana Ulang AI
          </button>
        </div>
      </div>

      {/* Advanced Filter / Preference */}
      <div className="bg-slate-50 p-4 rounded-none border border-slate-200/60 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full xl:w-auto">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tipe Menu:</span>
            <select
              id="input-menu-preference"
              value={preference}
              onChange={(e) => setPreference(e.target.value)}
              className="text-xs font-bold bg-white border border-slate-200 rounded-none px-3 py-2 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-700 shadow-sm"
            >
              <option value="Praktis, Cepat & Hemat">🍳 Praktis, Cepat & Hemat</option>
              <option value="Variatif & Bergizi (Banyak Sayur)">🥬 Variatif & Bergizi (Banyak Sayur)</option>
              <option value="Lauk Protein Tinggi (Ayam & Telur)">🍗 Lauk Protein Tinggi (Ayam & Telur)</option>
              <option value="Sangat Hemat (Budget Di bawah 100rb)">💰 Sangat Hemat (Budget &lt; 100rb)</option>
            </select>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-64">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Atur Budget:</span>
            <input
              type="range"
              min="50000"
              max="250000"
              step="5000"
              value={targetBudget}
              onChange={(e) => setTargetBudget(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-none appearance-none cursor-pointer accent-emerald-600"
              title="Seret untuk mengatur budget target"
            />
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium bg-white px-3 py-1.5 rounded-none border border-slate-150 self-stretch xl:self-auto justify-center">
          <AlertCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>Tiap menu didetailkan per porsi & bumbu demi efisiensi optimal!</span>
        </div>
      </div>

      {/* Day Selector Ribbon */}
      <div className="flex overflow-x-auto pb-1 gap-2 no-scrollbar" id="day-selector-ribbon">
        {days.map((day) => {
          const isSelected = selectedDay === day;
          return (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-5 py-3 rounded-none font-bold text-xs uppercase tracking-wider whitespace-nowrap transition cursor-pointer ${
                isSelected
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white hover:bg-slate-50 text-slate-600 border border-slate-200/80"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Meals Grid for the Current Selected Day */}
      {currentDayPlan ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="meals-prep-cards-grid">
          {/* Breakfast Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={`sarapan-${selectedDay}`}
            className="bg-white rounded-none p-5 border border-slate-200 shadow-sm flex flex-col justify-between h-full"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-100 rounded-none text-[10px] font-bold uppercase tracking-wider">
                  ☕ Sarapan Pagi
                </span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Instan
                </span>
              </div>
              <h3 className="font-bold text-slate-800 text-base font-display leading-snug">{currentDayPlan.sarapan.nama}</h3>
              
              {/* Highlight Portion Block */}
              <div className="text-xs text-slate-700 bg-slate-50 rounded-none p-2.5 mt-3 border border-slate-100">
                <span className="text-[9px] font-bold text-slate-400 block uppercase tracking-wider mb-0.5">Porsi Akurat 1 Orang</span>
                <span className="font-semibold">{currentDayPlan.sarapan.porsi}</span>
              </div>
              
              <div className="mt-4 space-y-1">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Daftar Bumbu & Takaran (Praktis):</h4>
                {renderBumbuChecklist(currentDayPlan.sarapan.bumbu, "sarapan")}
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 text-xs text-slate-500">
              <span className="font-bold text-slate-400 text-[10px] block uppercase tracking-wider mb-1">📝 Catatan Prep / Cara Memaksimalkan</span>
              <p className="leading-relaxed">{currentDayPlan.sarapan.catatanPrep}</p>
            </div>
          </motion.div>

          {/* Lunch Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={`siang-${selectedDay}`}
            className="bg-white rounded-none p-5 border border-slate-200 shadow-sm flex flex-col justify-between h-full"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-none text-[10px] font-bold uppercase tracking-wider">
                  🍱 Makan Siang
                </span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Kenyang
                </span>
              </div>
              <h3 className="font-bold text-slate-800 text-base font-display leading-snug">{currentDayPlan.siang.nama}</h3>
              
              {/* Highlight Portion Block */}
              <div className="text-xs text-slate-700 bg-slate-50 rounded-none p-2.5 mt-3 border border-slate-100">
                <span className="text-[9px] font-bold text-slate-400 block uppercase tracking-wider mb-0.5">Porsi Akurat 1 Orang</span>
                <span className="font-semibold">{currentDayPlan.siang.porsi}</span>
              </div>
              
              <div className="mt-4 space-y-1">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Daftar Bumbu & Takaran (Praktis):</h4>
                {renderBumbuChecklist(currentDayPlan.siang.bumbu, "siang")}
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 text-xs text-slate-500">
              <span className="font-bold text-slate-400 text-[10px] block uppercase tracking-wider mb-1">📝 Catatan Prep / Cara Memaksimalkan</span>
              <p className="leading-relaxed">{currentDayPlan.siang.catatanPrep}</p>
            </div>
          </motion.div>

          {/* Dinner Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={`malam-${selectedDay}`}
            className="bg-white rounded-none p-5 border border-slate-200 shadow-sm flex flex-col justify-between h-full"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 bg-blue-50 text-blue-800 border border-blue-100 rounded-none text-[10px] font-bold uppercase tracking-wider">
                  🌙 Makan Malam
                </span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Ringan
                </span>
              </div>
              <h3 className="font-bold text-slate-800 text-base font-display leading-snug">{currentDayPlan.malam.nama}</h3>
              
              {/* Highlight Portion Block */}
              <div className="text-xs text-slate-700 bg-slate-50 rounded-none p-2.5 mt-3 border border-slate-100">
                <span className="text-[9px] font-bold text-slate-400 block uppercase tracking-wider mb-0.5">Porsi Akurat 1 Orang</span>
                <span className="font-semibold">{currentDayPlan.malam.porsi}</span>
              </div>
              
              <div className="mt-4 space-y-1">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Daftar Bumbu & Takaran (Praktis):</h4>
                {renderBumbuChecklist(currentDayPlan.malam.bumbu, "malam")}
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 text-xs text-slate-500">
              <span className="font-bold text-slate-400 text-[10px] block uppercase tracking-wider mb-1">📝 Catatan Prep / Cara Memaksimalkan</span>
              <p className="leading-relaxed">{currentDayPlan.malam.catatanPrep}</p>
            </div>
          </motion.div>
        </div>
      ) : (
        <div className="bg-white rounded-none p-12 text-center border border-slate-200 shadow-sm" id="no-plan-view">
          <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3 animate-pulse" />
          <p className="text-slate-500 font-medium">Belum ada rencana menu makan.</p>
          <button
            onClick={handleRegenerate}
            className="mt-4 px-5 py-2.5 bg-slate-900 text-white rounded-none font-bold text-xs uppercase tracking-wider hover:bg-slate-800 transition"
          >
            Buat Rencana Sekarang
          </button>
        </div>
      )}
    </div>
  );
}
