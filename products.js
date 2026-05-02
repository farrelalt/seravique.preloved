// ============================================================
// SERAVIQUE — DATA PRODUK
// ============================================================
// Cara menambah produk baru:
// 1. Copy salah satu blok produk di bawah
// 2. Ganti id dengan angka unik berikutnya
// 3. Isi semua field sesuai produkmu
// 4. Tambahkan di dalam array products = [ ... ]
// ============================================================

// ============================================================
// SECTION 1: DAFTAR KATEGORI
// (Tambah/hapus kategori di sini jika perlu)
// ============================================================
const CATEGORIES = [
    { id: "tops", label: "Tops", icon: "👕" },
    { id: "bottoms", label: "Bottoms", icon: "👖" },
    { id: "outerwear", label: "Outerwear", icon: "🧥" },
    { id: "dress", label: "Dress", icon: "👗" },
    { id: "set", label: "Co-ord Set", icon: "🪡" },
];

// ============================================================
// SECTION 2: DAFTAR KONDISI BARANG
// (Jangan ubah value-nya, hanya label yang boleh diganti)
// ============================================================
const CONDITIONS = [
    { value: "new", label: "Brand New" },
    { value: "like-new", label: "Like New" },
    { value: "good", label: "Good" },
    { value: "fair", label: "Fair" },
];

// ============================================================
// SECTION 3: DATA PRODUK
// ============================================================
// Field yang tersedia:
//   id        : angka unik (wajib)
//   name      : nama produk (wajib)
//   brand     : nama brand (wajib)
//   category  : harus sesuai id di CATEGORIES (wajib)
//   price     : harga dalam Rupiah, angka saja (wajib)
//   condition : harus sesuai value di CONDITIONS (wajib)
//   size      : ukuran, bisa array ["S","M"] atau string "M"
//   color     : warna barang
//   desc      : deskripsi singkat (akan muncul di modal)
//   notes     : catatan jujur kondisi barang
//   image     : path ke gambar, mis. "images/produk1.jpg"
//              (jika dikosongkan akan tampil placeholder)
//   featured  : true = tampil di homepage, false = tidak
// ============================================================
const products = [

    // ── TOPS ──────────────────────────────────────────────────

    {
        id: 1,
        name: "Stone Dye Short Sleeve Tee",
        brand: "Volcom",
        category: "tops",
        price: 110000,
        condition: "excellent",
        size: ["S/P/8"],
        color: "Putih",
        desc: "KKaos putih Volcom lengan pendek cocok digunakan untuk aktivitas santai.",
        sizeGuide: "S muat untuk lingkar dada 80–88 cm.",
        notes: "Kondisi Excellent, Kondisi sangat baik, hanya pemakaian ringan, tanpa cacat berarti.",
        image: "images/volcom/volcom_v01.png",
        featured: true,
    },
    {
        id: 2,
        name: "GSL Solid V CT S122",
        brand: "Volcom",
        category: "tops",
        price: 110000,
        condition: "excellent",
        size: ["M/M/10"],
        color: "Putih",
        desc: "Kaos V Neck untuk wanita. Bahan stretch nyaman dipakai seharian.",
        sizeGuide: "M muat untuk lingkar dada 80–88 cm.",
        notes: "Kondisi Excellent, Kondisi sangat baik, hanya pemakaian ringan, tanpa cacat berarti.",
        image: "images/volcom/volcom_v02.png",
        featured: true,
    },
    {
        id: 3,
        name: "Striped Boxy Tee",
        brand: "Uniqlo",
        category: "tops",
        price: 75000,
        condition: "like-new",
        size: ["M"],
        color: "Navy-Putih",
        desc: "Kaos bergaris boxy cut dari Uniqlo. Bahan katun tebal, tidak mudah kusut.",
        notes: "Hampir baru, dipakai 2x saja. Warna masih segar.",
        image: "",
        featured: false,
    },
    {
        id: 4,
        name: "White Basic Tee Premium",
        brand: "Cotton On",
        category: "tops",
        price: 55000,
        condition: "good",
        size: ["S", "M", "L"],
        color: "Putih",
        desc: "Kaos putih polos premium dengan bahan cotton combed tebal. Dasar yang sempurna untuk berbagai outfit.",
        notes: "Kondisi bagus, tidak ada noda. Sudah dicuci dan disetrika.",
        image: "",
        featured: false,
    },

    // ── BOTTOMS ───────────────────────────────────────────────

    {
        id: 5,
        name: "Wide Leg Trousers",
        brand: "Zara",
        category: "bottoms",
        price: 175000,
        condition: "like-new",
        size: ["S"],
        color: "Krem",
        desc: "Celana panjang wide leg bahan crepe yang jatuh cantik. Potongan tinggi pinggang sangat flattering.",
        sizeGuide: "S muat untuk lingkar pinggang 64–68 cm, lingkar pinggul 88–92 cm, panjang celana ±95 cm. Rekomendasi tinggi badan 155–165 cm.",
        notes: "Beli tapi tidak pernah dipakai, masih ada tag-nya. Kondisi brand new.",
        image: "",
        featured: true,
    },
    {
        id: 6,
        name: "Cargo Pants Y2K",
        brand: "Stradivarius",
        category: "bottoms",
        price: 130000,
        condition: "good",
        size: ["M"],
        color: "Hitam",
        desc: "Cargo pants hitam dengan banyak saku samping. Potongan relaxed fit, perfect untuk tampilan kasual.",
        notes: "Sudah dipakai beberapa kali, kondisi masih bagus. Tidak ada kerusakan.",
        image: "",
        featured: false,
    },
    {
        id: 7,
        name: "Mini Skirt Pleated",
        brand: "Pull&Bear",
        category: "bottoms",
        price: 85000,
        condition: "like-new",
        size: ["XS", "S"],
        color: "Abu-abu",
        desc: "Mini skirt plisket warna abu-abu elegan. Bahan ringan dan nyaman bergerak.",
        notes: "Dipakai 1x ke acara. Kondisi sangat baik.",
        image: "",
        featured: true,
    },

    // ── OUTERWEAR ─────────────────────────────────────────────

    {
        id: 8,
        name: "Oversized Blazer",
        brand: "Zara",
        category: "outerwear",
        price: 245000,
        condition: "good",
        size: ["M", "L"],
        color: "Krem",
        desc: "Blazer oversized warna krem yang timeless. Bisa dipakai ke kantor maupun acara kasual.",
        notes: "Dipakai 3x. Ada sedikit kerutan di bagian siku tapi tidak mengganggu penampilan.",
        image: "",
        featured: true,
    },
    {
        id: 9,
        name: "Denim Jacket Light Wash",
        brand: "Levi's",
        category: "outerwear",
        price: 295000,
        condition: "good",
        size: ["S"],
        color: "Denim Muda",
        desc: "Jaket denim Levi's light wash klasik. Bahan tebal dan kualitas asli Levi's.",
        notes: "Sudah beberapa kali pakai. Ada satu lubang kecil di bagian dalam yang tidak terlihat.",
        image: "",
        featured: false,
    },
    {
        id: 10,
        name: "Knit Cardigan Longline",
        brand: "H&M",
        category: "outerwear",
        price: 115000,
        condition: "like-new",
        size: ["S", "M"],
        color: "Oat",
        desc: "Kardigan rajut panjang warna oat yang hangat dan nyaman. Cocok untuk transisi musim.",
        notes: "Hampir baru, tidak ada pilling. Dipakai 2x saja.",
        image: "",
        featured: true,
    },

    // ── DRESS ─────────────────────────────────────────────────

    {
        id: 11,
        name: "Midi Slip Dress",
        brand: "& Other Stories",
        category: "dress",
        price: 220000,
        condition: "new",
        size: ["S"],
        color: "Hitam",
        desc: "Slip dress midi warna hitam berbahan satin matte. Elegan dan bisa dipadukan banyak outerwear.",
        notes: "Brand new, belum pernah dipakai. Masih ada tag aslinya.",
        image: "",
        featured: true,
    },
    {
        id: 12,
        name: "Floral Mini Dress",
        brand: "Zara",
        category: "dress",
        price: 150000,
        condition: "good",
        size: ["S", "M"],
        color: "Putih Floral",
        desc: "Mini dress motif bunga ukuran kecil yang feminin. Bahan ringan dan nyaman untuk cuaca panas.",
        notes: "Dipakai 2x, dicuci bersih. Tidak ada noda atau kerusakan.",
        image: "",
        featured: false,
    },

    // ── CO-ORD SET ────────────────────────────────────────────

    {
        id: 13,
        name: "Linen Co-ord Set",
        brand: "Marks & Spencer",
        category: "set",
        price: 310000,
        condition: "like-new",
        size: ["M"],
        color: "Sage Green",
        desc: "Set koordinat linen berwarna sage green — terdiri dari kemeja crop dan celana wide leg. Cocok untuk tampilan casual chic.",
        notes: "Dipakai 1x untuk foto. Kondisi sangat baik, tidak ada kerusakan.",
        image: "",
        featured: true,
    },
    {
        id: 14,
        name: "Knit Crop Set",
        brand: "Shein",
        category: "set",
        price: 85000,
        condition: "good",
        size: ["S"],
        color: "Cokelat Susu",
        desc: "Set rajut crop top dan mini skirt yang matching. Tampilan coordinated yang stylish.",
        notes: "Sudah dipakai beberapa kali. Kondisi baik, tidak ada kerusakan.",
        image: "",
        featured: false,
    },

    // ── TAMBAH PRODUK BARU DI SINI ────────────────────────────
    // Salin template di bawah ini dan isi fieldnya:
    //
    // {
    //   id: 15,                        // naikkan angkanya
    //   name: "Nama Produk",
    //   brand: "Nama Brand",
    //   category: "tops",              // tops / bottoms / outerwear / dress / set
    //   price: 100000,                 // angka saja, tanpa titik
    //   condition: "like-new",         // new / like-new / good / fair
    //   size: ["S", "M"],              // bisa satu: "M" atau array: ["S","M"]
    //   color: "Warna",
    //   desc: "Deskripsi produk.",
    //   sizeGuide: "Panduan ukuran, mis: S muat lingkar dada 80-88cm, panjang 68cm.",
    //              // opsional — hapus baris ini jika tidak ingin tampil
    //   notes: "Catatan kondisi jujur.",
    //   image: "images/foto.jpg",      // kosongkan "" jika belum punya foto
    //   featured: false,               // true untuk tampil di homepage
    // },

]; // <-- JANGAN HAPUS KURUNG TUTUP INI