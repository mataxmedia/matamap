# Tutorial Matamap

Matamap adalah aplikasi web untuk membuat denah 2D tampak atas: bidang geometri berukuran presisi (dalam meter), legenda, keterangan kegiatan, dan ekspor PNG/PDF resolusi 4K.

---

## 1. Persiapan

1. Simpan tiga file dalam **satu folder**: `index.html`, `style.css`, `script.js`.
2. Buka `index.html` di browser (Chrome, Edge, atau Firefox versi terbaru).
3. Sambungan internet dibutuhkan hanya untuk memuat font antarmuka *Space Mono*. Tanpa internet, aplikasi tetap berjalan dengan font monospace bawaan.

> **Penting:** Matamap **tidak menyimpan otomatis**. Setiap halaman dibuka atau di-refresh, kanvas kembali kosong. Gunakan **Simpan JSON** (bagian 8) sebelum menutup halaman.

---

## 2. Mengenal Tampilan

| Area | Isi |
|---|---|
| **Header (atas)** | Tombol **Baru**, **Ekspor PNG 4K**, **Ekspor PDF 4K** |
| **Panel kiri** | Proyek, Gambar di kanvas, Bidang terpilih, Ukuran denah, Legenda, Informasi |
| **Kanvas (tengah)** | Lembar kerja rasio 16:9. Sisi kiri adalah area denah, sisi kanan adalah blok informasi (judul, lokasi, desainer, tanggal, legenda, keterangan, batang skala) |
| **Kontrol zoom** | Pojok kanan bawah: **−**, persentase zoom, **+**, **Fit** |

Apa yang Anda lihat di kanvas sama dengan hasil ekspor, kecuali garis seleksi dan handle (hanya muncul di layar).

**Sistem koordinat:** titik 0,0 ada di **pojok kiri atas** denah. Sumbu X ke kanan, sumbu Y ke bawah, satuan meter. Posisi X dan Y sebuah bidang adalah posisi **titik tengahnya**.

---

## 3. Langkah Awal: Atur Denah dan Informasi

### 3.1 Ukuran denah
Di bagian **Ukuran denah**:
- **Lebar (m)** dan **Panjang (m)**: dimensi area denah. Bawaan: 20 × 12 m.
- **Grid (m)**: jarak antar garis grid. Bawaan: 1 m. Garis tebal muncul setiap 5 kotak. Jika grid terlalu rapat, aplikasi menggandakan jaraknya secara otomatis agar tetap terbaca.
- **Tempel ke grid**: jika dicentang, semua penempatan, pergeseran, dan perubahan ukuran "menempel" ke kelipatan grid. Matikan untuk penempatan bebas.

Garis dimensi dan angka lebar/panjang tergambar otomatis di luar tepi denah.

### 3.2 Informasi kegiatan
Di bagian **Informasi**, isi:
- **Nama kegiatan**: tampil besar sebagai judul (otomatis huruf kapital).
- **Nama lokasi**, **Desainer**, **Tanggal** (teks bebas, mis. "12 Desember 2026").
- **Keterangan**: catatan tambahan, boleh beberapa baris.

Semua tampil langsung di blok informasi sisi kanan lembar.

---

## 4. Membuat Bidang

Buka bagian **Gambar di kanvas**. Tersedia tujuh alat bentuk: **Persegi, Elips, Segitiga, Trapesium, Segi enam, Bentuk L**, dan **Poligon titik**.

### Cara A: Seret langsung di kanvas
1. Klik salah satu bentuk (tombolnya berubah merah, tanda alat aktif).
2. Tekan dan **seret** di kanvas dari satu sudut ke sudut seberang.
3. Ukuran (mis. `6.00 × 4.00 m`) tampil langsung selama menyeret.
4. Lepas mouse. Bidang jadi dan otomatis terpilih.

### Cara B: Tentukan ukuran lalu letakkan
1. Isi **Lebar (m)** dan **Tinggi (m)** di bawah tombol bentuk (bawaan 4 × 3).
2. Klik bentuk yang diinginkan.
3. **Klik satu kali** di kanvas. Bidang diletakkan dengan ukuran tadi, dengan titik tengah di lokasi klik.

> Seretan yang terlalu kecil (di bawah 0,05 m pada salah satu sisi) dianggap klik biasa, sehingga memakai Cara B.

### Cara C: Poligon dari titik-titik
Untuk bentuk bebas seperti tikungan, area tidak beraturan, atau ruang berbentuk khusus.
1. Klik **Poligon titik**.
2. **Klik** di kanvas untuk menaruh titik demi titik. Garis putus-putus dan panjang sisi aktif (dalam meter) tampil selama Anda bergerak.
3. Tutup bentuk dengan salah satu cara:
   - klik **titik pertama** (kotak yang lebih besar),
   - **klik ganda**, atau
   - tekan **Enter**.
4. Minimal **3 titik**. Tekan **Esc** untuk membatalkan.

Setelah satu bidang jadi, alat otomatis kembali ke **Pilih / geser**. Untuk membuat lagi, pilih bentuk lagi. Klik tombol bentuk yang sedang aktif, atau tekan **Esc**, untuk membatalkan pemilihan alat.

Bidang baru memakai kategori pertama di legenda (bawaan: *Panggung*) dan bisa diganti kapan saja.

---

## 5. Memilih dan Mengedit Bidang

### 5.1 Memilih dan menggeser
- Pastikan alat **Pilih / geser** aktif (tombol merah di panel).
- **Klik** bidang untuk memilih. Garis putus-putus merah dan handle muncul, dan panel **Bidang terpilih** terbuka.
- **Seret** bidang untuk menggeser (mengikuti grid bila "Tempel ke grid" aktif).
- Klik area kosong untuk membatalkan pilihan.
- Bidang yang tumpang tindih: yang **paling atas** yang terpilih. Atur urutan lewat tombol **Depan** / **Belakang**.

### 5.2 Mengubah ukuran dengan handle
Delapan kotak kecil muncul di sekeliling bidang terpilih:
- Kotak **sudut** mengubah lebar dan tinggi sekaligus.
- Kotak **tengah sisi** mengubah satu dimensi saja.
- Sisi atau sudut seberang **tetap di tempat**.
- Ukuran minimum 0,05 m. Handle tetap berfungsi pada bidang yang sudah diputar.

### 5.3 Memutar
Seret **titik bulat merah** di atas bidang. Tahan **Shift** agar sudut berputar dalam kelipatan 15°.

### 5.4 Mengedit lewat angka (paling presisi)
Di panel **Bidang terpilih**:

| Kolom | Fungsi |
|---|---|
| **Nama** | Teks label di dalam bidang (kosongkan untuk menyembunyikan) |
| **Kategori** | Menentukan warna sesuai legenda |
| **Lebar / Tinggi (m)** | Ukuran tepat, kelipatan 0,05 m |
| **Posisi X / Y (m)** | Posisi titik tengah dari pojok kiri atas |
| **Rotasi (°)** | Sudut putar |
| **Tampilkan ukuran** | Menampilkan teks `lebar × tinggi m` di bawah nama |

Tombol di bagian bawah panel:
- **Duplikat**: salinan bidang, bergeser sejauh satu grid.
- **Depan / Belakang**: naik atau turun satu tingkat dalam urutan tumpukan.
- **Hapus bidang**: menghapus bidang terpilih.

Poligon titik juga bisa diubah ukurannya lewat handle atau angka. Bentuknya ikut diskalakan proporsional dalam kotak pembatasnya.

---

## 6. Legenda

Bagian **Legenda** mengatur kategori warna.
- **Kotak warna**: klik untuk memilih warna kategori.
- **Kolom teks**: nama kategori (tampil huruf kapital di lembar).
- **×**: hapus kategori. Bidang yang memakainya dipindahkan ke kategori pertama. Minimal harus tersisa satu kategori.
- **+ Kategori**: tambah kategori baru.

Semua kategori yang ada ditampilkan di legenda pada blok informasi, termasuk yang belum dipakai. Hapus kategori yang tidak perlu agar rapi. Batasi sekitar 8-10 kategori agar legenda tidak menabrak batang skala di bagian bawah.

Bawaan: Panggung, Area penonton, Properti, Akses / sirkulasi.

---

## 7. Zoom dan Geser Kanvas

| Aksi | Cara |
|---|---|
| Zoom ke arah kursor | **Roda mouse** |
| Zoom bertahap | Tombol **+** dan **−** (pojok kanan bawah) |
| Kembali ke tampilan penuh | Tombol **Fit** |
| Geser kanvas (pan) | Tahan **Spasi** lalu seret, atau seret dengan **klik kanan / klik tengah** |

Rentang zoom 20% sampai 4000%; 100% berarti tampilan pas (fit). Zoom berguna untuk bidang kecil atau tipis yang sulit dipilih. Zoom **tidak** memengaruhi hasil ekspor dan tidak masuk riwayat undo.

---

## 8. Undo, Redo, Simpan, dan Buka Proyek

### Undo dan Redo
- Tombol **Undo** dan **Redo** di bagian **Proyek**, atau pintasan keyboard (lihat bagian 10).
- Riwayat menyimpan hingga 100 langkah, mencakup bidang, legenda, ukuran denah, dan informasi kegiatan.
- Pengetikan di kolom teks digabung dalam jeda singkat, sehingga satu Undo membatalkan satu rangkaian ketikan.

### Simpan proyek
Klik **Simpan JSON**. File `nama-kegiatan.matamap.json` terunduh (nama diambil dari Nama kegiatan). Simpan file ini sebagai cadangan dan sebagai template.

### Buka proyek
Klik **Buka JSON**, lalu pilih file `.json` hasil simpanan. Seluruh denah dipulihkan. File yang tidak sesuai ditolak dengan pesan peringatan. Pembukaan file masih bisa dibatalkan dengan **Undo**.

### Mulai baru
Tombol **Baru** di header memuat ulang halaman dan menghapus semuanya (ada konfirmasi).

---

## 9. Ekspor

Klik **Ekspor PNG 4K** atau **Ekspor PDF 4K** di header.

| Format | Hasil |
|---|---|
| **PNG** | Gambar 3840 × 2160 piksel (4K), kualitas penuh |
| **PDF** | Satu halaman landscape 16:9 berisi gambar 4K (JPEG kualitas 95) |

Catatan:
- Nama file diambil dari **Nama kegiatan**.
- Ekspor selalu memakai **tampilan penuh** tanpa garis seleksi dan handle, apa pun posisi zoom saat ini.
- PDF berisi gambar (raster), bukan vektor. Ketajamannya setara PNG 4K, tetapi garisnya tidak bisa diedit di aplikasi desain.
- Batang skala di blok informasi ikut tercetak. Panjangnya dipilih otomatis sesuai ukuran denah.

---

## 10. Pintasan Keyboard

| Tombol | Fungsi |
|---|---|
| `Ctrl/Cmd + Z` | Undo |
| `Ctrl/Cmd + Y` atau `Ctrl/Cmd + Shift + Z` | Redo |
| `Delete` / `Backspace` | Hapus bidang terpilih |
| `← ↑ → ↓` | Geser bidang terpilih (sebesar grid, atau 0,1 m jika tempel-grid mati) |
| `Esc` | Batalkan alat gambar / poligon yang sedang berjalan |
| `Enter` | Tutup poligon (alat Poligon titik) |
| `Spasi` + seret | Geser kanvas |
| `Shift` + seret titik putar | Putar dalam kelipatan 15° |

Pintasan tidak aktif saat kursor sedang berada di kolom input atau teks.

---

## 11. Contoh Alur: Denah Panggung 14 × 9 m

1. **Ukuran denah:** Lebar 14, Panjang 9, Grid 0,5, centang *Tempel ke grid*.
2. **Informasi:** isi nama kegiatan, lokasi, desainer, dan tanggal.
3. **Legenda:** ubah nama dan warna kategori sesuai kebutuhan (mis. Panggung, Penonton, Properti, Akses).
4. **Panggung:** pilih **Persegi**, seret dari kiri atas hingga berukuran 8 × 4 m. Beri nama "Panggung" dan kategori *Panggung*.
5. **Area penonton:** pilih **Persegi**, isi Lebar 12 dan Tinggi 3, lalu klik sekali di bawah panggung. Atur kategori *Area penonton*.
6. **Properti bulat:** pilih **Elips**, seret ukuran 1 × 1 m di atas panggung, kategori *Properti*.
7. **Ruang tak beraturan:** pilih **Poligon titik**, klik titik-titik sudutnya, tutup dengan klik titik awal.
8. **Rapikan:** pakai panel **Bidang terpilih** untuk mengoreksi posisi X/Y dan rotasi, dan **Depan/Belakang** untuk urutan tumpukan.
9. **Simpan JSON**, lalu **Ekspor PNG 4K** dan/atau **Ekspor PDF 4K**.

---

## 12. Pemecahan Masalah

| Masalah | Solusi |
|---|---|
| Bidang tipis sulit dipilih | Zoom dengan roda mouse, atau perbesar sementara lewat panel angka |
| Handle saling menumpuk pada bidang kecil | Zoom in, atau ubah ukuran lewat kolom Lebar/Tinggi di panel |
| Bidang tidak bisa ditempatkan tepat di titik tertentu | Matikan *Tempel ke grid*, atau kecilkan nilai **Grid**, atau ketik posisi X/Y |
| Seretan membuat bidang di luar yang diinginkan | Tekan `Ctrl+Z`, atau pakai Cara B (klik dengan ukuran tetap) |
| Kanvas tidak bisa digeser | Pastikan **Spasi** ditekan sebelum menyeret, atau gunakan klik kanan/tengah |
| Hasil ekspor tidak muncul | Periksa izin unduhan di browser |
| Pekerjaan hilang setelah refresh | Memang disengaja. Gunakan **Simpan JSON** sebelum menutup halaman |
| File JSON ditolak | File harus berasal dari **Simpan JSON** Matamap dan belum diubah manual |

---

## 13. Batasan Saat Ini

- Belum ada pilih-banyak (multi-select), grup, atau kunci objek.
- Titik poligon tidak bisa digeser setelah bentuk jadi; hapus lalu gambar ulang, atau ubah ukuran keseluruhan.
- Belum ada teks bebas, panah, pustaka simbol (pintu, kursi, dll.), maupun garis dimensi antar dua titik.
- Ekspor PDF berupa gambar, bukan vektor.
- Tidak ada simpan otomatis.