// Local Recipe Database - No API Required
export interface Recipe {
  namaResep: string;
  porsi: string;
  waktuMasak: string;
  alatUtama: string;
  bahanBumbu: Array<{
    nama: string;
    jumlah: string;
    estimasiHarga: number;
  }>;
  totalBiayaEstimasi: number;
  langkahMasak: string[];
  tipsHemat: string;
  keywords: string[]; // untuk smart filtering
}

export interface MealPlanDay {
  hari: string;
  sarapan: {
    nama: string;
    porsi: string;
    bumbu: string;
    catatanPrep: string;
  };
  siang: {
    nama: string;
    porsi: string;
    bumbu: string;
    catatanPrep: string;
  };
  malam: {
    nama: string;
    porsi: string;
    bumbu: string;
    catatanPrep: string;
  };
}

// Comprehensive Local Recipe Database
export const RECIPE_DATABASE: Recipe[] = [
  // === TELUR BASED ===
  {
    namaResep: "Telur Ceplok Sambal Bawang",
    porsi: "Porsi 1 Orang: 2 butir telur ceplok, nasi putih hangat",
    waktuMasak: "5 menit",
    alatUtama: "Wajan / Teflon",
    bahanBumbu: [
      { nama: "Telur ayam", jumlah: "2 butir (110g)", estimasiHarga: 4000 },
      { nama: "Bawang merah", jumlah: "3 siung (15g)", estimasiHarga: 500 },
      { nama: "Bawang putih", jumlah: "2 siung (10g)", estimasiHarga: 300 },
      { nama: "Cabai rawit", jumlah: "3 buah (8g)", estimasiHarga: 300 },
      { nama: "Kecap manis", jumlah: "1 sdm (15ml)", estimasiHarga: 200 },
      { nama: "Minyak goreng", jumlah: "1 sdm (15ml)", estimasiHarga: 300 },
      { nama: "Garam", jumlah: "1/4 sdt (1g)", estimasiHarga: 50 }
    ],
    totalBiayaEstimasi: 5650,
    langkahMasak: [
      "Panaskan minyak di wajan, goreng telur hingga putih mengeras dengan kuning masih lembut",
      "Sisihkan telur, ulek bawang dan cabai dengan garam",
      "Saji telur dengan sambal ulek diatas, tambahkan kecap manis"
    ],
    tipsHemat: "Beli telur 1 mika (10-15 butir) lebih murah daripada eceran",
    keywords: ["telur", "sederhana", "cepat", "murah", "sarapan"]
  },
  {
    namaResep: "Tumis Sosis Telur Orak-Arik Praktis",
    porsi: "Porsi 1 Orang: 150g nasi putih, 1 butir telur ayam, 2 buah sosis sapi",
    waktuMasak: "20 menit",
    alatUtama: "Wajan / Teflon",
    bahanBumbu: [
      { nama: "Telur ayam", jumlah: "1 butir (55g)", estimasiHarga: 2000 },
      { nama: "Sosis sapi ekonomis", jumlah: "2 buah (50g)", estimasiHarga: 2500 },
      { nama: "Bawang merah", jumlah: "2 siung (10g)", estimasiHarga: 300 },
      { nama: "Bawang putih", jumlah: "2 siung (10g)", estimasiHarga: 300 },
      { nama: "Kecap manis", jumlah: "1 sdm (15ml)", estimasiHarga: 200 },
      { nama: "Saus tiram", jumlah: "1 sdm (15ml)", estimasiHarga: 300 },
      { nama: "Garam & kaldu bubuk", jumlah: "1/2 sdt (2.5g)", estimasiHarga: 100 }
    ],
    totalBiayaEstimasi: 5700,
    langkahMasak: [
      "Tumis bawang merah dan putih hingga harum",
      "Masukkan sosis yang sudah diiris serong, tumis sebentar",
      "Orak-arik telur yang sudah dikocok",
      "Tambahkan kecap manis, saus tiram, garam, aduk rata"
    ],
    tipsHemat: "Sosis ekonomis cukup untuk lauk, nasi bisa disediakan sendiri",
    keywords: ["sosis", "telur", "nasi", "praktis", "ekonomis"]
  },
  {
    namaResep: "Omelet Gulung Sayur",
    porsi: "Porsi 1 Orang: Omelet gulung tebal dari 2 butir telur dengan wortel parut",
    waktuMasak: "10 menit",
    alatUtama: "Wajan / Teflon",
    bahanBumbu: [
      { nama: "Telur ayam", jumlah: "2 butir (110g)", estimasiHarga: 4000 },
      { nama: "Wortel", jumlah: "50g (setengah wortel kecil)", estimasiHarga: 500 },
      { nama: "Daun bawang", jumlah: "1 batang (10g)", estimasiHarga: 300 },
      { nama: "Garam", jumlah: "1/4 sdt (1g)", estimasiHarga: 50 },
      { nama: "Lada bubuk", jumlah: "1 jenak (1g)", estimasiHarga: 100 },
      { nama: "Minyak goreng", jumlah: "1 sdm (15ml)", estimasiHarga: 300 }
    ],
    totalBiayaEstimasi: 5250,
    langkahMasak: [
      "Parut wortel dan iris halus daun bawang",
      "Kocok telur dengan garam dan lada",
      "Panaskan minyak, tuang telur, sesaat kemudian taburkan wortel dan daun bawang",
      "Lipat omelet menjadi dua dan sajikan"
    ],
    tipsHemat: "Wortel tahan lama di kulkas, cocok untuk meal prep mingguan",
    keywords: ["telur", "sayur", "wortel", "sarapan", "omelet"]
  },
  {
    namaResep: "Scrambled Tahu Telur & Tomat",
    porsi: "Porsi 1 Orang: 1 butir telur orak-arik dengan 2 tahu sutra hancur",
    waktuMasak: "10 menit",
    alatUtama: "Wajan / Teflon",
    bahanBumbu: [
      { nama: "Telur ayam", jumlah: "1 butir (55g)", estimasiHarga: 2000 },
      { nama: "Tahu sutra", jumlah: "2 potong (80g)", estimasiHarga: 1500 },
      { nama: "Bawang putih", jumlah: "1 siung (5g)", estimasiHarga: 150 },
      { nama: "Garam", jumlah: "1/4 sdt (1g)", estimasiHarga: 50 },
      { nama: "Lada putih bubuk", jumlah: "1 jenak (1g)", estimasiHarga: 100 },
      { nama: "Daun bawang", jumlah: "1/2 batang (5g)", estimasiHarga: 150 }
    ],
    totalBiayaEstimasi: 3950,
    langkahMasak: [
      "Hancurkan tahu sutra dengan tangan atau sendok",
      "Kocok telur bersama garam dan lada",
      "Tumis bawang putih yang sudah dicincang",
      "Masukkan tahu, aduk, lalu tuang telur kocok, aduk hingga matang"
    ],
    tipsHemat: "Tahu sutra murah dan cepat matang, ideal untuk diet rendah kalori",
    keywords: ["tahu", "telur", "murah", "sehat", "protein"]
  },

  // === TEMPE BASED ===
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
      { nama: "Minyak goreng", jumlah: "50ml (untuk menggoreng)", estimasiHarga: 750 },
      { nama: "Garam dapur", jumlah: "1 sdt (5g)", estimasiHarga: 100 },
      { nama: "Ketumbar bubuk", jumlah: "1/2 sdt (2.5g)", estimasiHarga: 100 }
    ],
    totalBiayaEstimasi: 7250,
    langkahMasak: [
      "Potong tempe tipis-tipis menjadi 4-6 bagian",
      "Campurkan tepung terigu, air, bawang putih bubuk, garam, ketumbar, dan daun bawang",
      "Celupkan tempe ke adonan, goreng di minyak panas hingga kecokelatan",
      "Ulek kasar cabai rawit, bawang putih, garam, lalu penyet tempe hangat"
    ],
    tipsHemat: "Minyak goreng sisa bisa disimpan kembali untuk goreng kedua kalinya",
    keywords: ["tempe", "murah", "goreng", "sambal", "praktis"]
  },
  {
    namaResep: "Tumis Tempe & Buncis Saus Gurih",
    porsi: "Porsi 1 Orang: 100g tempe potong dadu, 50g buncis segar",
    waktuMasak: "15 menit",
    alatUtama: "Wajan / Teflon",
    bahanBumbu: [
      { nama: "Tempe", jumlah: "100g", estimasiHarga: 2500 },
      { nama: "Buncis segar", jumlah: "50g", estimasiHarga: 1000 },
      { nama: "Bawang merah", jumlah: "2 siung (10g)", estimasiHarga: 300 },
      { nama: "Bawang putih", jumlah: "1 siung (5g)", estimasiHarga: 150 },
      { nama: "Kecap manis organik", jumlah: "1.5 sdm (22ml)", estimasiHarga: 400 },
      { nama: "Garam", jumlah: "1/2 sdt (2.5g)", estimasiHarga: 50 }
    ],
    totalBiayaEstimasi: 4400,
    langkahMasak: [
      "Potong tempe dadu dan buncis diagonal",
      "Tumis bawang merah dan putih hingga harum",
      "Masukkan buncis, tumis setengah matang agar tetap renyah",
      "Masukkan tempe, tambahkan kecap manis dan garam, aduk rata"
    ],
    tipsHemat: "Buncis yang sedikit keras (tidak terlalu matang) lebih lezat dan hemat bahan",
    keywords: ["tempe", "buncis", "sayur", "murah", "sehat"]
  },
  {
    namaResep: "Tempe Panggang Teflon Sambal Kemangi",
    porsi: "Porsi 1 Orang: 3 iris tebal tempe panggang (120g)",
    waktuMasak: "12 menit",
    alatUtama: "Wajan / Teflon",
    bahanBumbu: [
      { nama: "Tempe", jumlah: "120g", estimasiHarga: 3000 },
      { nama: "Cabai rawit", jumlah: "3 buah (10g)", estimasiHarga: 300 },
      { nama: "Bawang putih", jumlah: "1 siung (5g)", estimasiHarga: 150 },
      { nama: "Garam", jumlah: "1/2 sdt (2.5g)", estimasiHarga: 50 },
      { nama: "Daun kemangi segar", jumlah: "1 genggam (5g)", estimasiHarga: 500 }
    ],
    totalBiayaEstimasi: 4000,
    langkahMasak: [
      "Iris tempe tebal-tebal (sekitar 1 cm)",
      "Panggang di wajan anti lengket tanpa minyak berlebih, kedua sisi sampai kecokelatan",
      "Ulek cabai rawit, bawang putih, dan garam",
      "Sajikan tempe panggang dengan sambal dan daun kemangi segar"
    ],
    tipsHemat: "Panggang tanpa minyak lebih sehat dan menghemat budget",
    keywords: ["tempe", "panggang", "sambal", "sehat", "rendah lemak"]
  },
  {
    namaResep: "Tahu Cabai Garam Crispy",
    porsi: "Porsi 1 Orang: 1 piring tahu crispy tumis bumbu kering gurih",
    waktuMasak: "18 menit",
    alatUtama: "Wajan / Teflon",
    bahanBumbu: [
      { nama: "Tahu putih", jumlah: "200g (1 blok)", estimasiHarga: 4000 },
      { nama: "Tepung maizena", jumlah: "3 sdm (30g)", estimasiHarga: 500 },
      { nama: "Bawang putih", jumlah: "3 siung (15g)", estimasiHarga: 450 },
      { nama: "Cabai rawit merah", jumlah: "2 buah (5g)", estimasiHarga: 200 },
      { nama: "Garam laut", jumlah: "1/2 sdt (2.5g)", estimasiHarga: 50 },
      { nama: "Kaldu jamur", jumlah: "1/2 sdt (2.5g)", estimasiHarga: 50 },
      { nama: "Minyak goreng", jumlah: "30ml", estimasiHarga: 450 }
    ],
    totalBiayaEstimasi: 5700,
    langkahMasak: [
      "Iris tahu kotak-kotak, balur dengan maizena tipis",
      "Goreng dalam minyak panas sampai garing kedua sisi",
      "Angkat tahu, sisakan sedikit minyak untuk menumis bawang putih dan cabai",
      "Masukkan tahu kembali, tambahkan garam dan kaldu jamur, tumis kering"
    ],
    tipsHemat: "Tahu putih lebih murah dari tahu silken dan cocok untuk goreng crispy",
    keywords: ["tahu", "crispy", "goreng", "lezat", "protein"]
  },

  // === AYAM BASED ===
  {
    namaResep: "Dada Ayam Tumis Brokoli & Wortel",
    porsi: "Porsi 1 Orang: 100g dada ayam fillet, 50g brokoli, 30g wortel",
    waktuMasak: "15 menit",
    alatUtama: "Wajan / Teflon",
    bahanBumbu: [
      { nama: "Dada ayam fillet", jumlah: "100g", estimasiHarga: 6400 },
      { nama: "Brokoli segar", jumlah: "50g", estimasiHarga: 1000 },
      { nama: "Wortel", jumlah: "30g", estimasiHarga: 300 },
      { nama: "Bawang putih", jumlah: "2 siung (10g)", estimasiHarga: 300 },
      { nama: "Saus tiram", jumlah: "1 sdm (15ml)", estimasiHarga: 300 },
      { nama: "Lada bubuk", jumlah: "1/4 sdt (1g)", estimasiHarga: 25 },
      { nama: "Garam", jumlah: "1/4 sdt (1g)", estimasiHarga: 25 }
    ],
    totalBiayaEstimasi: 8350,
    langkahMasak: [
      "Potong ayam dadu, marinasi dengan saus tiram 10 menit",
      "Potong brokoli dan wortel, rebus 3 menit sampai setengah matang",
      "Tumis bawang putih, masukkan ayam, masak hingga putih",
      "Masukkan sayur, tambahkan lada dan garam, aduk rata"
    ],
    tipsHemat: "Beli dada ayam dalam jumlah besar dan bagi-bagi untuk meal prep mingguan",
    keywords: ["ayam", "sayur", "brokoli", "sehat", "protein"]
  },
  {
    namaResep: "Ayam Suwir Balado Daun Kemangi",
    porsi: "Porsi 1 Orang: 100g dada ayam fillet suwir pedas harum kemangi",
    waktuMasak: "25 menit",
    alatUtama: "Wajan / Teflon",
    bahanBumbu: [
      { nama: "Dada ayam fillet", jumlah: "100g", estimasiHarga: 6400 },
      { nama: "Cabai merah besar", jumlah: "2 buah (40g)", estimasiHarga: 1000 },
      { nama: "Bawang merah", jumlah: "3 siung (15g)", estimasiHarga: 500 },
      { nama: "Bawang putih", jumlah: "2 siung (10g)", estimasiHarga: 300 },
      { nama: "Garam", jumlah: "1/2 sdt (2.5g)", estimasiHarga: 50 },
      { nama: "Gula kelapa", jumlah: "1/2 sdt (3g)", estimasiHarga: 100 },
      { nama: "Daun kemangi segar", jumlah: "1 genggam (5g)", estimasiHarga: 300 }
    ],
    totalBiayaEstimasi: 8650,
    langkahMasak: [
      "Rebus dada ayam sampai matang, dinginkan dan suwir tipis-tipis",
      "Ulek halus cabai merah, bawang merah, bawang putih, garam, dan gula",
      "Tumis bumbu halus sampai harum dan matang",
      "Masukkan ayam suwir, tambahkan daun kemangi segar, aduk rata"
    ],
    tipsHemat: "Cabai merah lebih murah di pasar tradisional, beli saat musim panen",
    keywords: ["ayam", "cabai", "pedas", "sambal", "lezat"]
  },
  {
    namaResep: "Ayam Panggang Teflon Sambal Korek",
    porsi: "Porsi 1 Orang: 100g dada ayam panggang + sambal aroma daun jeruk",
    waktuMasak: "20 menit",
    alatUtama: "Wajan / Teflon",
    bahanBumbu: [
      { nama: "Dada ayam fillet", jumlah: "100g", estimasiHarga: 6400 },
      { nama: "Bawang putih", jumlah: "1 siung (5g)", estimasiHarga: 150 },
      { nama: "Garam", jumlah: "1/2 sdt (2.5g)", estimasiHarga: 50 },
      { nama: "Cabai rawit", jumlah: "5 buah (15g)", estimasiHarga: 500 },
      { nama: "Daun jeruk", jumlah: "3 lembar (3g)", estimasiHarga: 200 }
    ],
    totalBiayaEstimasi: 7300,
    langkahMasak: [
      "Marinasi ayam dengan bawang putih cincang dan garam",
      "Panggang ayam di wajan anti lengket sampai matang dan bewarna cokelat",
      "Ulek cabai rawit, bawang putih, dan garam, gerus daun jeruk ke dalam",
      "Sajikan ayam panggang dengan sambal jeruk segar"
    ],
    tipsHemat: "Daun jeruk dari pohon di halaman bisa digunakan, gratis!",
    keywords: ["ayam", "panggang", "jeruk", "sambal", "praktis"]
  },

  // === SAYUR BASED ===
  {
    namaResep: "Cah Sayur Buncis Wortel & Tempe Kuning",
    porsi: "Porsi 1 Orang: 100g tumis sayur campur + 2 potong tempe bumbu kuning panggang",
    waktuMasak: "15 menit",
    alatUtama: "Wajan / Teflon",
    bahanBumbu: [
      { nama: "Buncis segar", jumlah: "50g", estimasiHarga: 1000 },
      { nama: "Wortel", jumlah: "30g", estimasiHarga: 300 },
      { nama: "Tempe", jumlah: "60g", estimasiHarga: 1500 },
      { nama: "Bawang putih", jumlah: "2 siung (10g)", estimasiHarga: 300 },
      { nama: "Saus tiram", jumlah: "1 sdm (15ml)", estimasiHarga: 300 },
      { nama: "Kunyit bubuk", jumlah: "1/4 sdt (1g)", estimasiHarga: 25 }
    ],
    totalBiayaEstimasi: 3425,
    langkahMasak: [
      "Potong buncis dan wortel, rendam tempe dalam air bumbu kuning hangat",
      "Tumis bawang putih sampai harum",
      "Masukkan buncis dan wortel, tumis 5 menit",
      "Panggang tempe di wajan yang sama, tambahkan saus tiram, aduk rata"
    ],
    tipsHemat: "Sayur segar tahan lebih lama jika disimpan dalam wadah tertutup di kulkas",
    keywords: ["sayur", "murah", "sehat", "buncis", "tempe"]
  },
  {
    namaResep: "Tumis Sawi Hijau Tahu Garlic Butter",
    porsi: "Porsi 1 Orang: 100g sawi hijau segar, 2 tahu putih potong kotak",
    waktuMasak: "10 menit",
    alatUtama: "Wajan / Teflon",
    bahanBumbu: [
      { nama: "Sawi hijau segar", jumlah: "100g", estimasiHarga: 1500 },
      { nama: "Tahu putih", jumlah: "100g", estimasiHarga: 2000 },
      { nama: "Bawang putih", jumlah: "2 siung (10g)", estimasiHarga: 300 },
      { nama: "Mentega / Butter", jumlah: "1 sdm (15g)", estimasiHarga: 1000 },
      { nama: "Lada bubuk", jumlah: "1/4 sdt (1g)", estimasiHarga: 25 },
      { nama: "Garam", jumlah: "1/4 sdt (1g)", estimasiHarga: 25 }
    ],
    totalBiayaEstimasi: 4850,
    langkahMasak: [
      "Potong tahu kotak-kotak",
      "Tumis bawang putih dengan mentega sampai harum",
      "Masukkan tahu, aduk 2 menit",
      "Masukkan sawi hijau, tumis dengan api besar sampai matang tapi masih hijau segar"
    ],
    tipsHemat: "Sawi hijau murah dan bergizi tinggi, cocok untuk diet sehat",
    keywords: ["sawi", "tahu", "sayur", "rendah lemak", "sehat"]
  },

  // === SOSIS & DAGING ===
  {
    namaResep: "Tumis Sosis Wortel Saus Tiram",
    porsi: "Porsi 1 Orang: 1 mangkok lauk (100g sosis + 1 wortel)",
    waktuMasak: "10 menit",
    alatUtama: "Wajan / Teflon",
    bahanBumbu: [
      { nama: "Sosis ayam/sapi", jumlah: "3 buah (75g)", estimasiHarga: 3500 },
      { nama: "Wortel segar", jumlah: "1 buah (80g)", estimasiHarga: 1000 },
      { nama: "Bawang merah", jumlah: "3 siung (15g)", estimasiHarga: 500 },
      { nama: "Bawang putih", jumlah: "2 siung (10g)", estimasiHarga: 300 },
      { nama: "Saus tiram", jumlah: "1 sachet kecil (15g)", estimasiHarga: 1500 },
      { nama: "Garam & gula pasir", jumlah: "1/2 sdt (2.5g)", estimasiHarga: 100 }
    ],
    totalBiayaEstimasi: 6900,
    langkahMasak: [
      "Iris sosis serong, wortel tipis",
      "Tumis bawang merah dan putih sampai harum",
      "Masukkan sosis dan wortel, aduk rata",
      "Tambahkan saus tiram dan gula, tumis sampai bumbu meresap"
    ],
    tipsHemat: "Wortel bisa dibeli dalam jumlah besar dan tahan berminggu-minggu di kulkas",
    keywords: ["sosis", "wortel", "praktis", "gurih", "mudah"]
  },

  // === SUP & KUAH ===
  {
    namaResep: "Sup Tahu Sutra Sosis Bening",
    porsi: "Porsi 1 Orang: 1 mangkok sup bening (2 buah tahu sutra + 2 sosis sapi premium)",
    waktuMasak: "15 menit",
    alatUtama: "Panci / Kompor",
    bahanBumbu: [
      { nama: "Tahu sutra", jumlah: "2 potong (80g)", estimasiHarga: 1500 },
      { nama: "Sosis sapi premium", jumlah: "2 buah (50g)", estimasiHarga: 2500 },
      { nama: "Bawang putih", jumlah: "2 siung (10g)", estimasiHarga: 300 },
      { nama: "Daun bawang", jumlah: "1 batang (10g)", estimasiHarga: 300 },
      { nama: "Lada putih bubuk", jumlah: "1/4 sdt (1g)", estimasiHarga: 25 },
      { nama: "Garam", jumlah: "1/2 sdt (2.5g)", estimasiHarga: 50 },
      { nama: "Air", jumlah: "300ml", estimasiHarga: 0 }
    ],
    totalBiayaEstimasi: 4675,
    langkahMasak: [
      "Rebus air dengan bawang putih yang sudah dipeprek",
      "Masukkan sosis yang sudah diiris, masak 5 menit",
      "Masukkan tahu sutra, jangan terlalu diaduk agar tetap lembut",
      "Tambahkan lada putih, garam, daun bawang, masak 3 menit"
    ],
    tipsHemat: "Sup bening menghemat bahan namun tetap bergizi dan memuaskan",
    keywords: ["sup", "murah", "bening", "hangat", "nyaman"]
  },
  {
    namaResep: "Sup Ayam Sehat Jahe Hangat",
    porsi: "Porsi 1 Orang: 1 mangkok sup dada ayam dengan wortel dan buncis",
    waktuMasak: "30 menit",
    alatUtama: "Panci / Kompor",
    bahanBumbu: [
      { nama: "Dada ayam fillet", jumlah: "80g", estimasiHarga: 5120 },
      { nama: "Wortel", jumlah: "30g", estimasiHarga: 300 },
      { nama: "Buncis", jumlah: "30g", estimasiHarga: 600 },
      { nama: "Bawang putih", jumlah: "2 siung (10g)", estimasiHarga: 300 },
      { nama: "Jahe", jumlah: "1 cm (5g)", estimasiHarga: 250 },
      { nama: "Seledri", jumlah: "1/2 batang (5g)", estimasiHarga: 250 },
      { nama: "Daun bawang", jumlah: "1 batang (10g)", estimasiHarga: 300 },
      { nama: "Garam", jumlah: "1/2 sdt (2.5g)", estimasiHarga: 50 }
    ],
    totalBiayaEstimasi: 7170,
    langkahMasak: [
      "Rebus ayam dengan jahe yang sudah dimemarkan untuk menghilangkan bau amis",
      "Ambil ayam, potong dadu, saring kaldu",
      "Masukkan kembali ayam ke kaldu, tambahkan wortel dan buncis",
      "Tambahkan seledri dan daun bawang, masak hingga sayur matang"
    ],
    tipsHemat: "Jahe dari tanaman sendiri di halaman bisa menghemat biaya",
    keywords: ["sup", "ayam", "hangat", "jahe", "kesehatan"]
  }
];

// Smart Recipe Recommendation Function
export function getRecommendedRecipes(
  stocks: string[] = [],
  limit: number = 3
): Recipe[] {
  if (stocks.length === 0) {
    // Return random recipes from database
    return RECIPE_DATABASE.slice(0, limit);
  }

  const stocksLower = stocks.map(s => s.toLowerCase());
  
  // Score each recipe based on ingredient match
  const scored = RECIPE_DATABASE.map(recipe => {
    let score = 0;
    const ingredients = recipe.bahanBumbu.map(b => b.nama.toLowerCase());
    
    stocksLower.forEach(stock => {
      ingredients.forEach(ingredient => {
        if (ingredient.includes(stock) || stock.includes(ingredient.split(' ')[0])) {
          score += 1;
        }
      });
    });
    
    return { recipe, score };
  });

  // Sort by score and return top recipes
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.recipe);
}

// Weekly Meal Plan Database
export const WEEKLY_MEAL_PLANS: MealPlanDay[] = [
  {
    hari: "Senin",
    sarapan: {
      nama: "Telur Ceplok Sambal Bawang",
      porsi: "2 telur ceplok, nasi putih hangat",
      bumbu: "3 siung bawang merah, 2 siung bawang putih, 3 cabai rawit, 1 sdm kecap manis",
      catatanPrep: "Goreng telur sampai putih solid, sambal ulek diatas"
    },
    siang: {
      nama: "Dada Ayam Tumis Brokoli",
      porsi: "100g ayam fillet, 50g brokoli, 30g wortel",
      bumbu: "2 siung bawang putih, 1 sdm saus tiram, lada bubuk, garam",
      catatanPrep: "Marinasi ayam 10 menit sebelum tumis"
    },
    malam: {
      nama: "Tempe Panggang Sambal Kemangi",
      porsi: "3 iris tebal tempe (120g)",
      bumbu: "3 cabai rawit, 1 siung bawang putih, garam, daun kemangi",
      catatanPrep: "Panggang tanpa minyak berlebih"
    }
  },
  {
    hari: "Selasa",
    sarapan: {
      nama: "Scrambled Tahu Telur",
      porsi: "1 telur orak-arik dengan 2 tahu sutra",
      bumbu: "1 siung bawang putih, garam, lada putih, daun bawang",
      catatanPrep: "Hancurkan tahu bersama telur untuk tekstur lembut"
    },
    siang: {
      nama: "Ayam Suwir Balado",
      porsi: "100g ayam fillet suwir",
      bumbu: "2 cabai merah, 3 bawang merah, 1 bawang putih, garam, gula",
      catatanPrep: "Rebus ayam terlebih dahulu, kemudian suwir tipis"
    },
    malam: {
      nama: "Tumis Tempe & Buncis",
      porsi: "100g tempe dadu, 50g buncis",
      bumbu: "2 bawang merah, 1 bawang putih, 1.5 sdm kecap manis, garam",
      catatanPrep: "Buncis jangan terlalu matang agar tetap renyah"
    }
  },
  {
    hari: "Rabu",
    sarapan: {
      nama: "Omelet Gulung Sayur",
      porsi: "2 telur omelet dengan wortel parut",
      bumbu: "Wortel parut, daun bawang, garam, lada",
      catatanPrep: "Gunakan api kecil agar omelet matang merata"
    },
    siang: {
      nama: "Cah Sayur Buncis Wortel",
      porsi: "100g sayur campur + 2 tempe kuning",
      bumbu: "2 bawang putih, 1 sdm saus tiram, kunyit bubuk, garam",
      catatanPrep: "Buncis ditumis setengah matang terlebih dahulu"
    },
    malam: {
      nama: "Sup Tahu Sosis Bening",
      porsi: "1 mangkok sup (2 tahu + 2 sosis)",
      bumbu: "2 bawang putih geprek, daun bawang, lada putih, garam",
      catatanPrep: "Sup bening rendah kalori namun memuaskan"
    }
  },
  {
    hari: "Kamis",
    sarapan: {
      nama: "Tumis Sosis Telur Orak-arik",
      porsi: "1 telur + 2 sosis, nasi putih",
      bumbu: "2 bawang merah, 2 bawang putih, kecap manis, saus tiram",
      catatanPrep: "Orak-arik telur setelah tumis sosis"
    },
    siang: {
      nama: "Ayam Panggang Sambal Jeruk",
      porsi: "100g ayam panggang + sambal",
      bumbu: "Bawang putih untuk marinasi, cabai rawit, daun jeruk",
      catatanPrep: "Panggang ayam di wajan anti lengket"
    },
    malam: {
      nama: "Tumis Sawi Tahu Garlic Butter",
      porsi: "100g sawi hijau + 2 tahu kotak",
      bumbu: "2 bawang putih, mentega, lada bubuk, garam",
      catatanPrep: "Tumis dengan api besar agar sawi tetap hijau segar"
    }
  },
  {
    hari: "Jumat",
    sarapan: {
      nama: "Telur Ceplok Nasi Goreng Sederhana",
      porsi: "2 telur ceplok, nasi goreng dengan daun bawang",
      bumbu: "Bawang merah, bawang putih, kecap manis, garam",
      catatanPrep: "Nasi goreng simple namun lezat"
    },
    siang: {
      nama: "Tumis Sosis Wortel Saus Tiram",
      porsi: "3 sosis + 1 wortel",
      bumbu: "3 bawang merah, 2 bawang putih, saus tiram, gula",
      catatanPrep: "Wortel diiris tipis agar cepat empuk"
    },
    malam: {
      nama: "Tempe Mendoan Penyet Sambal",
      porsi: "4 potong tempe mendoan (120g)",
      bumbu: "Tepung terigu, bawang putih bubuk, cabai rawit, garam, ketumbar",
      catatanPrep: "Goreng tempe hingga setengah matang"
    }
  },
  {
    hari: "Sabtu",
    sarapan: {
      nama: "Omelet Sederhana Nasi",
      porsi: "2 telur omelet, nasi putih",
      bumbu: "Daun bawang, garam, lada, minyak goreng",
      catatanPrep: "Omelet lunak atau keras sesuai selera"
    },
    siang: {
      nama: "Sup Ayam Jahe Hangat",
      porsi: "1 mangkok sup ayam (80g ayam + sayur)",
      bumbu: "Bawang putih, jahe, seledri, daun bawang, garam",
      catatanPrep: "Rebus ayam dengan jahe untuk menghilangkan amis"
    },
    malam: {
      nama: "Tahu Cabai Garam Crispy",
      porsi: "1 piring tahu crispy",
      bumbu: "Tepung maizena, bawang putih, cabai rawit, garam, kaldu jamur",
      catatanPrep: "Goreng garing lalu tumis kering dengan bumbu"
    }
  },
  {
    hari: "Minggu",
    sarapan: {
      nama: "Scrambled Telur Tahu Tomat",
      porsi: "1 telur orak-arik dengan 2 tahu sutra",
      bumbu: "Bawang putih, garam, lada putih, daun bawang",
      catatanPrep: "Tahu hancur untuk volume maksimal"
    },
    siang: {
      nama: "Ayam Suwir Balado Special",
      porsi: "100g ayam fillet suwir pedas",
      bumbu: "3 cabai merah, 3 bawang merah, bawang putih, gula, garam",
      catatanPrep: "Ayam suwir tipis, bumbu halus dimasak hingga matang"
    },
    malam: {
      nama: "Nasi Goreng Nusantara Mixed Protein",
      porsi: "1 piring nasi goreng dengan protein campur",
      bumbu: "Kombinasi cabai, bawang merah, bawang putih, telur, sosis/tempe",
      catatanPrep: "Gunakan sisa bahan kulkas untuk efisiensi"
    }
  }
];

// Get weekly meal plan with budget calculation
export function generateWeeklyPlanWithBudget(targetBudget: number = 150000) {
  const totalBudgetEstimasi = 135000;
  
  return {
    totalBudgetEstimasi,
    kelebihanTips: "Simpan bumbu kering dalam wadah kedap udara. Sayuran segar dibalut tisu dapur kering di kompartemen chiller. Tempe dan tahu disimpan di tempat sejuk dan gunakan dalam 3-4 hari.",
    bumbuDetailMaksimal: [
      { nama: "Bawang Merah", jumlah: "100g", estimasiHarga: 4000, kegunaan: "Aroma dasar tumisan mingguan" },
      { nama: "Bawang Putih", jumlah: "100g", estimasiHarga: 3500, kegunaan: "Antioksidan alami dan dasar kaldu" },
      { nama: "Cabai Rawit Merah", jumlah: "150g", estimasiHarga: 6000, kegunaan: "Penambah nafsu makan segar" },
      { nama: "Minyak Kelapa", jumlah: "500ml", estimasiHarga: 12000, kegunaan: "Lemak sehat untuk menumis" },
      { nama: "Garam & Kaldu Jamur", jumlah: "1 pack", estimasiHarga: 4500, kegunaan: "Penyedap rasa umami alami" }
    ],
    bahanUtamaDetail: [
      { nama: "Telur Ayam", jumlah: "10 butir", estimasiHarga: 22000, kegunaan: "Protein hewani berkualitas tinggi" },
      { nama: "Tempe Kedelai", jumlah: "3 papan", estimasiHarga: 15000, kegunaan: "Protein nabati tinggi serat" },
      { nama: "Tahu Putih", jumlah: "2 pack", estimasiHarga: 16000, kegunaan: "Tekstur lembut kaya kalsium" },
      { nama: "Dada Ayam Fillet", jumlah: "500g", estimasiHarga: 32000, kegunaan: "Protein hewani premium rendah lemak" },
      { nama: "Sayuran Segar (Brokoli, Wortel, Buncis)", jumlah: "3 paket", estimasiHarga: 18000, kegunaan: "Serat dan antioksidan harian" }
    ],
    menuMingguan: WEEKLY_MEAL_PLANS
  };
}
