import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Initialize Gemini SDK with telemetry header as required by the skill
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
} else {
  console.warn("WARNING: GEMINI_API_KEY is not defined in environment variables. App will use smart Indonesian meal-prep generation fallback simulation.");
}

app.use(express.json());

// API: Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", aiEnabled: !!ai });
});

// API: Recommend recipes based on available stock
app.post("/api/gemini/recipe", async (req, res) => {
  const { stocks, customRequest } = req.body;
  const stockList = stocks && stocks.length > 0 ? stocks.join(", ") : "Telur, Tempe, Beras, Bawang Merah, Bawang Putih, Cabai";
  
  const prompt = `Kamu adalah koki profesional dan konsultan nutrisi berpengalaman ahli perencana menu masakan sehat praktis personal di Indonesia.
Berdasarkan daftar bahan makanan dan bumbu yang dimiliki pengguna saat ini: [${stockList}].
${customRequest ? `Permintaan khusus pengguna: "${customRequest}"` : ""}

Buatlah 3 rekomendasi resep meal prep sehat dan cerdas yang sangat praktis (bisa dibuat menggunakan kompor atau fasilitas dapur umum), efisien, dan bergizi seimbang.

Setiap resep wajib menyertakan:
1. "porsi": Detail kebutuhan porsi yang akurat untuk 1 orang secara spesifik (contoh: "Porsi 1 Orang: 120 gram dada ayam panggang, 150 gram nasi putih hangat, 50 gram buncis").
2. "bahanBumbu": Daftar lengkap bumbu beserta takaran yang tepat dan presisi (contoh jumlah: "2 siung (10g)", "1/2 sdt (2.5g)", "1 sdm (15ml)") serta estimasi harganya dalam Rupiah.

Kembalikan jawaban dalam bentuk JSON array dengan struktur persis seperti berikut:
[
  {
    "namaResep": "Nama Masakan",
    "porsi": "Porsi 1 Orang: 120g dada ayam, 150g nasi putih, 50g brokoli",
    "waktuMasak": "15 menit",
    "alatUtama": "Wajan / Teflon",
    "bahanBumbu": [
      {"nama": "Telur ayam", "jumlah": "2 butir (110g)", "estimasiHarga": 4000},
      {"nama": "Bawang merah", "jumlah": "3 siung (15g), iris halus", "estimasiHarga": 500},
      {"nama": "Bawang putih", "jumlah": "1 siung (5g), iris tipis", "estimasiHarga": 300},
      {"nama": "Cabai rawit merah", "jumlah": "4 buah (10g), iris serong", "estimasiHarga": 500},
      {"nama": "Kecap manis", "jumlah": "1 sdm (15ml)", "estimasiHarga": 200},
      {"nama": "Garam dapur", "jumlah": "1/2 sdt (2.5g)", "estimasiHarga": 100}
    ],
    "totalBiayaEstimasi": 5600,
    "langkahMasak": [
      "Kocok telur bersama irisan bawang merah, bawang putih, garam, dan cabai.",
      "Panaskan sedikit minyak di teflon atau rice cooker yang sudah panas.",
      "Tuang kocokan telur, masak hingga kedua sisi matang kecokelatan.",
      "Sajikan hangat bersama nasi putih sesuai porsi."
    ],
    "tipsHemat": "Beli telur per kilogram di pasar tradisional untuk mendapatkan kualitas terbaik dan harga yang lebih efisien."
  }
]`;

  if (!ai) {
    // Elegant fallback simulation when API key is missing
    return res.json(getFallbackRecipes(stocks, customRequest));
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              namaResep: { type: Type.STRING },
              porsi: { type: Type.STRING },
              waktuMasak: { type: Type.STRING },
              alatUtama: { type: Type.STRING },
              bahanBumbu: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    nama: { type: Type.STRING },
                    jumlah: { type: Type.STRING },
                    estimasiHarga: { type: Type.INTEGER }
                  },
                  required: ["nama", "jumlah", "estimasiHarga"]
                }
              },
              totalBiayaEstimasi: { type: Type.INTEGER },
              langkahMasak: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              tipsHemat: { type: Type.STRING }
            },
            required: ["namaResep", "porsi", "waktuMasak", "alatUtama", "bahanBumbu", "totalBiayaEstimasi", "langkahMasak", "tipsHemat"]
          }
        }
      }
    });

    const text = response.text || "[]";
    const data = JSON.parse(text.trim());
    return res.json(data);
  } catch (error: any) {
    console.error("Gemini Recipe Generation Error:", error);
    return res.status(500).json({ error: "Gagal memproses rekomendasi resep AI. Menggunakan resep lokal.", fallback: getFallbackRecipes(stocks, customRequest) });
  }
});

// API: Generate Weekly Meal Plan
app.post("/api/gemini/generate-plan", async (req, res) => {
  const { preferences, targetWeeklyBudget } = req.body;
  const budget = targetWeeklyBudget || 150000;
  
  const prompt = `Kamu adalah perencana menu makanan (meal planner) profesional dan konsultan gizi di Indonesia.
Buat rencana menu makan (Meal Prep Plan) sehat dan terencana selama 7 hari (Senin s.d. Minggu), masing-masing 3 kali makan sehari (Sarapan, Makan Siang, Makan Malam) dengan mengedepankan efisiensi belanja dan nutrisi seimbang.
Target budget mingguan adalah maksimal Rp ${budget}.
${preferences ? `Gunakan preferensi atau tipe menu berikut untuk merancang rencana makan ini: "${preferences}". Buat masakan yang praktis diolah menggunakan kompor dan peralatan dapur umum standar.` : ""}

Setiap bumbu dan bahan pelengkap harus dihitung secara efisien untuk menghindari pemborosan bahan makanan.

Setiap menu harian (Sarapan, Siang, Malam) WAJIB didetailkan secara sangat spesifik dan akurat untuk porsi SATU orang dan mendaftar seluruh kebutuhan bumbu beserta takarannya secara lengkap dan presisi.

Struktur JSON wajib memiliki parameter sarapan, siang, dan malam dengan:
- "nama": Nama masakan sehat yang ringkas dan menggugah selera.
- "porsi": Porsi akurat untuk 1 orang (contoh: "Porsi 1 Orang: 150 gram nasi merah, 120 gram dada ayam panggang, 60 gram buncis tumis").
- "bumbu": Daftar lengkap bumbu beserta takarannya secara detail dipisahkan koma agar dapat langsung dipraktikkan (contoh: "2 siung bawang merah (10g), 1 siung bawang putih (5g), 2 buah cabai rawit (5g), 1 sdm kecap asin, 1/2 sdt garam, 1/4 sdt lada bubuk").
- "catatanPrep": Catatan khusus meal prep atau cara pengolahan praktis yang higienis dan efisien.

Kembalikan respon JSON dalam struktur persis seperti berikut:
{
  "totalBudgetEstimasi": 125000,
  "kelebihanTips": "Pilah bumbu kering dan simpan di wadah kedap udara, sementara bahan segar seperti sayur dan protein dimarinasi di kulkas agar tetap segar sepanjang minggu.",
  "bumbuDetailMaksimal": [
    {"nama": "Bawang Merah", "jumlah": "100 gram", "estimasiHarga": 4000, "kegunaan": "Bumbu dasar masakan aromatik selama seminggu"},
    {"nama": "Bawang Putih", "jumlah": "50 gram", "estimasiHarga": 2500, "kegunaan": "Penyedap alami untuk tumisan dan sup"},
    {"nama": "Cabai Rawit & Merah", "jumlah": "100 gram", "estimasiHarga": 5000, "kegunaan": "Sensasi pedas segar kaya vitamin C"},
    {"nama": "Lada Bubuk & Ketumbar", "jumlah": "1 pack kecil", "estimasiHarga": 3000, "kegunaan": "Rempah penambah aroma masakan"}
  ],
  "bahanUtamaDetail": [
    {"nama": "Telur Ayam Organik", "jumlah": "10 butir", "estimasiHarga": 22000, "kegunaan": "Protein hewani praktis untuk sarapan berkualitas"},
    {"nama": "Tempe Organik", "jumlah": "2 papan besar", "estimasiHarga": 10000, "kegunaan": "Protein nabati kaya serat & prebiotik"},
    {"nama": "Daging Dada Ayam (Fillet)", "jumlah": "500 gram", "estimasiHarga": 32000, "kegunaan": "Protein hewani utama rendah lemak (bagi jadi 5 porsi)"},
    {"nama": "Paket Sayur Hidroponik (Wortel, Buncis, Sawi)", "jumlah": "1 paket segar", "estimasiHarga": 12000, "kegunaan": "Kebutuhan serat dan mikronutrien mingguan"}
  ],
  "menuMingguan": [
    {
      "hari": "Senin",
      "sarapan": {
        "nama": "Nasi Goreng Oatmeal Aromatik",
        "porsi": "Porsi 1 Orang: 1 piring sedang (120 gram oatmeal matang/nasi + 1 butir telur ayam)",
        "bumbu": "1 siung bawang merah (5g), 1 siung bawang putih (3g), 2 buah cabai rawit (5g), 1 sdm kecap asin (15ml), 1/2 sdt garam (2.5g)",
        "catatanPrep": "Tumis bawang hingga harum sebelum memasukkan oatmeal kering atau nasi dingin."
      },
      "siang": {
        "nama": "Ayam Tumis Brokoli Saus Tiram",
        "porsi": "Porsi 1 Orang: 1 potong dada ayam (120 gram) dengan brokoli segar (60g)",
        "bumbu": "2 siung bawang merah (10g), 1 siung bawang putih (5g), 3 buah cabai rawit (10g), 1 sdm saus tiram (15ml), 1/2 sdt garam",
        "catatanPrep": "Potong dadu ayam dan brokoli lalu marinasi dengan saus tiram di wadah tertutup."
      },
      "malam": {
        "nama": "Tempe Panggang Sambal Daun Kemangi",
        "porsi": "Porsi 1 Orang: 3 iris tempe panggang tebal (120 gram)",
        "bumbu": "3 buah cabai rawit (10g), 1 siung bawang putih (5g), 1/2 sdt garam, 1 genggam daun kemangi segar",
        "catatanPrep": "Panggang tempe di teflon anti lengket dengan sedikit minyak zaitun/kelapa."
      }
    }
  ]
}`;

  if (!ai) {
    return res.json(getFallbackWeeklyPlan(budget));
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            totalBudgetEstimasi: { type: Type.INTEGER },
            kelebihanTips: { type: Type.STRING },
            bumbuDetailMaksimal: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  nama: { type: Type.STRING },
                  jumlah: { type: Type.STRING },
                  estimasiHarga: { type: Type.INTEGER },
                  kegunaan: { type: Type.STRING }
                },
                required: ["nama", "jumlah", "estimasiHarga", "kegunaan"]
              }
            },
            bahanUtamaDetail: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  nama: { type: Type.STRING },
                  jumlah: { type: Type.STRING },
                  estimasiHarga: { type: Type.INTEGER },
                  kegunaan: { type: Type.STRING }
                },
                required: ["nama", "jumlah", "estimasiHarga", "kegunaan"]
              }
            },
            menuMingguan: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  hari: { type: Type.STRING },
                  sarapan: {
                    type: Type.OBJECT,
                    properties: {
                      nama: { type: Type.STRING },
                      porsi: { type: Type.STRING },
                      bumbu: { type: Type.STRING },
                      catatanPrep: { type: Type.STRING }
                    },
                    required: ["nama", "porsi", "bumbu", "catatanPrep"]
                  },
                  siang: {
                    type: Type.OBJECT,
                    properties: {
                      nama: { type: Type.STRING },
                      porsi: { type: Type.STRING },
                      bumbu: { type: Type.STRING },
                      catatanPrep: { type: Type.STRING }
                    },
                    required: ["nama", "porsi", "bumbu", "catatanPrep"]
                  },
                  malam: {
                    type: Type.OBJECT,
                    properties: {
                      nama: { type: Type.STRING },
                      porsi: { type: Type.STRING },
                      bumbu: { type: Type.STRING },
                      catatanPrep: { type: Type.STRING }
                    },
                    required: ["nama", "porsi", "bumbu", "catatanPrep"]
                  }
                },
                required: ["hari", "sarapan", "siang", "malam"]
              }
            }
          },
          required: ["totalBudgetEstimasi", "kelebihanTips", "bumbuDetailMaksimal", "bahanUtamaDetail", "menuMingguan"]
        }
      }
    });

    const text = response.text || "{}";
    const data = JSON.parse(text.trim());
    return res.json(data);
  } catch (error: any) {
    console.error("Gemini Plan Generation Error:", error);
    return res.status(500).json({ error: "Gagal memproses perencana menu AI. Menggunakan rencana cadangan lokal.", fallback: getFallbackWeeklyPlan(budget) });
  }
});


// Helper functions for Indonesian Kost fallbacks
function getFallbackRecipes(stocks: string[] = [], customRequest: string = "") {
  return [
    {
      namaResep: "Tumis Sosis Telur Orak-Arik Praktis",
      porsi: "Porsi 1 Orang: 150g nasi putih, 1 butir telur ayam, 2 buah sosis sapi",
      waktuMasak: "20 menit",
      alatUtama: "Wajan / Teflon",
      bahanBumbu: [
        { nama: "Beras putih", jumlah: "1 cup (150g)", estimasiHarga: 1500 },
        { nama: "Telur ayam", jumlah: "1 butir (55g)", estimasiHarga: 2000 },
        { nama: "Sosis sapi ekonomis", jumlah: "2 buah (50g)", estimasiHarga: 2500 },
        { nama: "Bawang merah", jumlah: "2 siung (10g), iris tipis", estimasiHarga: 300 },
        { nama: "Bawang putih", jumlah: "2 siung (10g), cincang halus", estimasiHarga: 300 },
        { nama: "Kecap manis", jumlah: "1 sdm (15ml)", estimasiHarga: 200 },
        { nama: "Saus tiram", jumlah: "1 sdm (15ml)", estimasiHarga: 300 },
        { nama: "Garam & kaldu bubuk", jumlah: "1/2 sdt (2.5g)", estimasiHarga: 100 },
        { nama: "Sayur kol sisa", jumlah: "2 lembar (20g), iris kasar", estimasiHarga: 200 }
      ],
      totalBiayaEstimasi: 7400,
      langkahMasak: [
        "Rebus atau siapkan nasi putih hangat di piring.",
        "Panaskan wajan dengan sedikit minyak, masukkan irisan bawang merah dan putih hingga harum.",
        "Masukkan sosis sapi ekonomis dan sayur kol sisa, tumis sebentar.",
        "Pinggirkan tumisan di wajan, masukkan telur kocok lalu orak-arik hingga matang.",
        "Tambahkan kecap manis, saus tiram, garam, dan kaldu bubuk, aduk rata lalu sajikan di atas nasi."
      ],
      tipsHemat: "Selalu stok telur satu mika (isi 10-15 butir) karena harganya jauh lebih hemat dibanding beli eceran per butir di warung."
    },
    {
      namaResep: "Tempe Mendoan Penyet Kemangi",
      porsi: "Porsi 1 Orang: 4 potong tempe mendoan (120g)",
      waktuMasak: "15 menit",
      alatUtama: "Teflon / Kompor Portable",
      bahanBumbu: [
        { nama: "Tempe balok", jumlah: "1 papan sedang (150g)", estimasiHarga: 4000 },
        { nama: "Tepung terigu", jumlah: "5 sdm (50g)", estimasiHarga: 1000 },
        { nama: "Bawang putih bubuk", jumlah: "1 sdt (5g)", estimasiHarga: 300 },
        { nama: "Cabai rawit merah", jumlah: "5 buah (12g)", estimasiHarga: 500 },
        { nama: "Daun bawang", jumlah: "1 batang (10g)", estimasiHarga: 500 },
        { nama: "Minyak goreng", jumlah: "100ml (untuk menggoreng)", estimasiHarga: 1500 },
        { nama: "Garam dapur", jumlah: "1 sdt (5g)", estimasiHarga: 100 },
        { nama: "Ketumbar bubuk", jumlah: "1/2 sdt (2.5g)", estimasiHarga: 100 }
      ],
      totalBiayaEstimasi: 8000,
      langkahMasak: [
        "Potong tempe tipis-tipis menjadi 4 atau 6 bagian.",
        "Campurkan tepung terigu, air secukupnya, bawang putih bubuk, garam, ketumbar bubuk, dan irisan daun bawang hingga jadi adonan kental.",
        "Celupkan tempe ke adonan tepung lalu goreng di minyak panas hingga setengah matang atau kering sesuai selera.",
        "Ulek kasar cabai rawit, bawang putih, garam, lalu penyet tempe hangat di atas sambal tersebut."
      ],
      tipsHemat: "Gunakan minyak goreng secara efisien. Sisa minyak menggoreng tempe bisa disimpan kembali (minyak jelantah bersih) untuk sekali goreng lagi."
    },
    {
      namaResep: "Tumis Sosis Wortel Saus Tiram",
      porsi: "Porsi 1 Orang: 1 mangkok lauk (100g sosis + 1 wortel)",
      waktuMasak: "10 menit",
      alatUtama: "Wajan / Teflon",
      bahanBumbu: [
        { nama: "Sosis ayam/sapi", jumlah: "3 buah (75g), iris serong", estimasiHarga: 3500 },
        { nama: "Wortel segar", jumlah: "1 buah (80g), iris tipis", estimasiHarga: 1000 },
        { nama: "Bawang merah", jumlah: "3 siung (15g), iris tipis", estimasiHarga: 400 },
        { nama: "Bawang putih", jumlah: "2 siung (10g), iris tipis", estimasiHarga: 300 },
        { nama: "Saus tiram", jumlah: "1 sachet kecil (15g)", estimasiHarga: 1500 },
        { nama: "Margarin / Minyak goreng", jumlah: "1 sdm (15g)", estimasiHarga: 500 },
        { nama: "Garam & gula pasir", jumlah: "1/2 sdt (2.5g)", estimasiHarga: 100 }
      ],
      totalBiayaEstimasi: 7300,
      langkahMasak: [
        "Panaskan margarin di wajan, tumis bawang bombay/bawang merah hingga harum.",
        "Masukkan wortel yang diiris tipis agar cepat empuk, tambahkan sedikit air.",
        "Masukkan potongan sosis, aduk rata.",
        "Tambahkan saus tiram, lada bubuk, sedikit garam, aduk hingga bumbu meresap dan air menyusut.",
        "Sajikan sebagai lauk pendamping nasi putih."
      ],
      tipsHemat: "Beli wortel eceran di pasar tradisional, pilih yang segar dan keras. 1 kg wortel bisa dapat banyak sekali dan tahan berminggu-minggu di kulkas kost."
    }
  ];
}

function getFallbackWeeklyPlan(targetBudget: number) {
  return {
    totalBudgetEstimasi: 135000,
    kelebihanTips: "Tips Nutrisi & Efisiensi: Kelompokkan bumbu kering dalam wadah kedap udara. Simpan sayuran segar dibalut tisu dapur kering dalam kompartemen chiller agar kesegaran dan kandungan vitaminnya wangi terjaga hingga akhir pekan.",
    bumbuDetailMaksimal: [
      { nama: "Bawang Merah", jumlah: "100g", estimasiHarga: 4000, kegunaan: "Aroma dasar tumisan & nasi gandum aromatik" },
      { nama: "Bawang Putih", jumlah: "100g", estimasiHarga: 3500, kegunaan: "Antioksidan alami, dasar kaldu sup dan marinasi protein" },
      { nama: "Cabai Rawit Merah", jumlah: "150g", estimasiHarga: 6000, kegunaan: "Penambah nafsu makan segar dan kaya vitamin C" },
      { nama: "Minyak Kelapa / Margarin Sehat", jumlah: "500ml", estimasiHarga: 12000, kegunaan: "Lemak sehat untuk menumis ringan" },
      { nama: "Garam Laut & Kaldu Jamur", jumlah: "1 pack", estimasiHarga: 4500, kegunaan: "Penyedap rasa umami alami bebas MSG berlebih" }
    ],
    bahanUtamaDetail: [
      { nama: "Telur Ayam Organik", jumlah: "10 butir", estimasiHarga: 22000, kegunaan: "Sumber protein hewani berkualitas tinggi dan asam amino lengkap" },
      { nama: "Tempe Kedelai Organik", jumlah: "3 papan", estimasiHarga: 15000, kegunaan: "Protein nabati tinggi serat, bagus untuk mikrobioma pencernaan" },
      { nama: "Tahu Sutra Putih", jumlah: "1 pack isi 10", estimasiHarga: 8000, kegunaan: "Tekstur lembut kaya kalsium untuk sup bening" },
      { nama: "Dada Ayam Fillet Segar", jumlah: "500g", estimasiHarga: 32000, kegunaan: "Protein hewani premium rendah lemak, dipotong porsi harian" },
      { nama: "Sayuran Hidroponik (Brokoli, Wortel, Buncis)", jumlah: "3 paket", estimasiHarga: 18000, kegunaan: "Serat makanan, antioksidan, dan fitonutrisi esensial harian" },
      { nama: "Sosis Sapi Premium", jumlah: "1 pack isi 6", estimasiHarga: 15000, kegunaan: "Pelengkap protein praktis bercita rasa gurih" }
    ],
    menuMingguan: [
      {
        hari: "Senin",
        sarapan: {
          nama: "Nasi Goreng Oatmeal Telur Aromatik",
          porsi: "Porsi 1 Orang: 120g oatmeal/nasi matang, 1 butir telur ayam organik, daun bawang",
          bumbu: "1 siung bawang merah (5g), 1 siung bawang putih (3g), 2 buah cabai rawit (5g), 1 sdm kecap asin, 1/2 sdt garam",
          catatanPrep: "Tumis bumbu dengan sedikit minyak kelapa hingga harum sebelum memasukkan karbohidrat."
        },
        siang: {
          nama: "Dada Ayam Tumis Brokoli & Wortel",
          porsi: "Porsi 1 Orang: 100g dada ayam fillet, 50g brokoli, 30g wortel",
          bumbu: "2 siung bawang putih cincang (10g), 1 sdm saus tiram rendah natrium, 1/4 sdt lada bubuk, 1/2 sdt garam",
          catatanPrep: "Marinasi potongan ayam dengan saus tiram 10 menit sebelum ditumis agar meresap."
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
}


// Server integration for production or development
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
