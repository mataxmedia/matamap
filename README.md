# Tutorial Penggunaan Matamap

**Matamap** adalah aplikasi web untuk membuat **denah 2D tampak atas**. Bidang digambar dengan ukuran presisi dalam meter, lalu dilengkapi legenda warna, informasi kegiatan, dan batang skala. Hasilnya bisa diekspor ke **PNG** dan **PDF** beresolusi 4K (3840 × 2160 px).

Cocok untuk denah panggung, tata letak pameran, area penonton, layout acara, dan denah ruang sederhana lainnya.

---

## Daftar Isi

1. [Gambaran Repo](#1-gambaran-repo)
2. [Persiapan dan Cara Menjalankan](#2-persiapan-dan-cara-menjalankan)
3. [Mengenal Tampilan](#3-mengenal-tampilan)
4. [Mengatur Ukuran Denah dan Grid](#4-mengatur-ukuran-denah-dan-grid)
5. [Mengisi Informasi Kegiatan](#5-mengisi-informasi-kegiatan)
6. [Membuat Bidang](#6-membuat-bidang)
7. [Memilih dan Mengedit Bidang](#7-memilih-dan-mengedit-bidang)
8. [Legenda](#8-legenda)
9. [Zoom dan Geser Kanvas](#9-zoom-dan-geser-kanvas)
10. [Undo, Redo, Simpan, dan Buka Proyek](#10-undo-redo-simpan-dan-buka-proyek)
11. [Ekspor PNG dan PDF](#11-ekspor-png-dan-pdf)
12. [Pintasan Keyboard](#12-pintasan-keyboard)
13. [Contoh Alur: Denah Panggung 14 × 9 m](#13-contoh-alur-denah-panggung-14--9-m)
14. [Tips Kerja yang Rapi](#14-tips-kerja-yang-rapi)
15. [Pemecahan Masalah](#15-pemecahan-masalah)
16. [Batasan Saat Ini](#16-batasan-saat-ini)
17. [Catatan untuk Pengembang](#17-catatan-untuk-pengembang)

---

## 1. Gambaran Repo

Repo: `https://github.com/mataxmedia/matamap`

Matamap adalah aplikasi web statis murni (HTML, CSS, JavaScript) tanpa build step dan tanpa framework. Repo ini berisi empat file:

| File | Fungsi |
|---|---|
| `index.html` | Kerangka antarmuka: header, panel kiri, kanvas, kontrol zoom |
| `style.css` | Tampilan antarmuka |
| `script.js` | Seluruh logika: menggambar di kanvas, edit bidang, undo/redo, simpan/buka JSON, ekspor |
| `README.md` | Tutorial singkat bawaan repo |

Poin teknis:

- Seluruh denah digambar pada elemen `<canvas>`.
- Satu-satunya sumber daya eksternal adalah font **Space Mono** dari Google Fonts. Tanpa internet, aplikasi tetap jalan dengan font monospace bawaan.
- Data proyek tidak disimpan di server. Semua ada di browser, dan Anda menyimpannya sendiri sebagai file JSON.

---

## 2. Cara Menjalankan

Akses lewat alamat https://mataxmedia.github.io/matamap/


---

## 3. Mengenal Tampilan

| Area | Isi |
|---|---|
| **Header (atas)** | Judul MATAMAP, tombol **Baru**, **Ekspor PNG**, **Ekspor PDF** |
| **Panel kiri** | Proyek, Gambar di Kanvas, Bidang Terpilih, Ukuran denah, Legenda, Informasi |
| **Kanvas (tengah)** | Lembar kerja rasio 16:9. Sisi kiri adalah area denah. Sisi kanan adalah blok informasi (judul, lokasi, desainer, tanggal, legenda, keterangan, batang skala) |
| **Kontrol zoom** | Pojok kanan bawah: **−**, persentase zoom, **+**, **Fit**, **Geser** |

Apa yang tampil di kanvas sama dengan hasil ekspor, kecuali garis seleksi dan handle (hanya muncul di layar).

**Sistem koordinat:**

- Titik **0,0** ada di **pojok kiri atas** denah.
- Sumbu X ke kanan, sumbu Y ke bawah, satuan **meter**.
- Posisi X dan Y sebuah bidang adalah posisi **titik tengahnya**, bukan sudutnya.

---

## 4. Mengatur Ukuran Denah dan Grid

Buka bagian **Ukuran denah** di panel kiri:

| Kolom | Fungsi | Catatan |
|---|---|---|
| **Lebar (m)** | Lebar area denah | Bawaan 20 m |
| **Panjang (m)** | Panjang area denah | Bawaan 12 m |
| **Grid (m)** | Jarak antar garis grid | Bawaan 1 m. Garis tebal muncul setiap 5 kotak. Jika terlalu rapat, jaraknya digandakan otomatis agar tetap terbaca |
| **Tempel ke Grid** | Semua penempatan, pergeseran, dan perubahan ukuran "menempel" ke kelipatan grid | Matikan untuk penempatan bebas |

Garis dimensi dan angka lebar/panjang tergambar otomatis di luar tepi denah.

**Saran:** tentukan ukuran denah dan grid **di awal**, sebelum menggambar, supaya semua bidang langsung rapi pada kelipatan yang sama.

---

## 5. Mengisi Informasi Kegiatan

Buka bagian **Informasi**:

| Kolom | Tampil sebagai |
|---|---|
| **Nama Kegiatan** | Judul besar (otomatis huruf kapital). Juga dipakai sebagai nama file simpan dan ekspor |
| **Nama Lokasi** | Lokasi kegiatan |
| **Desainer** | Nama pembuat denah |
| **Tanggal** | Teks bebas, misalnya `12 Desember 2026` |
| **Keterangan** | Catatan tambahan, boleh beberapa baris |

Semuanya langsung muncul di blok informasi sisi kanan lembar.

---

## 6. Membuat Bidang

Buka bagian **Gambar di Kanvas**. Tersedia tujuh alat bentuk:

**Persegi · Elips · Segitiga · Trapesium · Segi enam · Bentuk L · Poligon titik**

### Cara A: Seret langsung di kanvas

1. Klik salah satu bentuk (tombolnya berubah merah, tanda alat aktif).
2. Tekan dan **seret** di kanvas dari satu sudut ke sudut seberang.
3. Ukuran (misalnya `6.00 × 4.00 m`) tampil langsung selama menyeret.
4. Lepas mouse. Bidang jadi dan otomatis terpilih.

### Cara B: Tentukan ukuran dulu, lalu letakkan

1. Isi **Lebar (m)** dan **Tinggi (m)** di bawah tombol bentuk (bawaan 4 × 3).
2. Klik bentuk yang diinginkan.
3. **Klik satu kali** di kanvas. Bidang diletakkan dengan ukuran tadi, titik tengahnya di lokasi klik.

> Seretan yang terlalu kecil (di bawah 0,05 m pada salah satu sisi) dianggap klik biasa, sehingga memakai Cara B.

### Cara C: Poligon dari titik-titik

Untuk bentuk bebas seperti tikungan, area tidak beraturan, atau ruang berbentuk khusus.

1. Klik **Poligon titik**.
2. **Klik** di kanvas untuk menaruh titik demi titik. Garis putus-putus dan panjang sisi aktif (dalam meter) tampil selama Anda menggerakkan mouse.
3. Tutup bentuk dengan salah satu cara:
   - klik **titik pertama** (kotak yang lebih besar),
   - **klik ganda**, atau
   - tekan **Enter**.
4. Minimal **3 titik**. Tekan **Esc** untuk membatalkan.

### Perilaku alat

- Setelah satu bidang jadi, alat otomatis kembali ke **Pilih / Geser**. Untuk membuat lagi, pilih bentuk lagi.
- Klik tombol bentuk yang sedang aktif, atau tekan **Esc**, untuk membatalkan pemilihan alat.
- Bidang baru memakai **kategori pertama** di legenda (bawaan: *Panggung*) dan bisa diganti kapan saja.

---

## 7. Memilih dan Mengedit Bidang

### 7.1 Memilih dan menggeser

- Pastikan alat **Pilih / Geser** aktif (tombol merah di panel).
- **Klik** bidang untuk memilih. Garis putus-putus merah dan handle muncul, dan panel **Bidang Terpilih** terbuka.
- **Seret** bidang untuk menggeser (mengikuti grid bila *Tempel ke Grid* aktif).
- Klik area kosong untuk membatalkan pilihan.
- Pada bidang yang tumpang tindih, yang **paling atas** yang terpilih. Atur urutan dengan tombol **Depan** / **Belakang**.

### 7.2 Mengubah ukuran dengan handle

Delapan kotak kecil muncul di sekeliling bidang terpilih:

- Kotak **sudut** mengubah lebar dan tinggi sekaligus.
- Kotak **tengah sisi** mengubah satu dimensi saja.
- Sisi atau sudut seberangnya **tetap di tempat**.
- Ukuran minimum 0,05 m. Handle tetap berfungsi pada bidang yang sudah diputar.

### 7.3 Memutar

Seret **titik bulat merah** di atas bidang. Tahan **Shift** agar sudut berputar dalam kelipatan 15°.

### 7.4 Mengedit lewat angka (paling presisi)

Di panel **Bidang Terpilih**:

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

Poligon titik juga bisa diubah ukurannya lewat handle atau angka. Bentuknya ikut diskalakan proporsional di dalam kotak pembatasnya.

---

## 8. Legenda

Bagian **Legenda** mengatur kategori warna.

- **Kotak warna**: klik untuk memilih warna kategori.
- **Kolom teks**: nama kategori (tampil huruf kapital di lembar).
- **×**: hapus kategori. Bidang yang memakainya dipindahkan ke kategori pertama. Minimal harus tersisa satu kategori.
- **+ Kategori**: tambah kategori baru.

Catatan:

- Semua kategori yang ada ditampilkan di legenda pada blok informasi, **termasuk yang belum dipakai**. Hapus kategori yang tidak perlu agar rapi.
- Batasi sekitar **8-10 kategori** agar legenda tidak menabrak batang skala di bagian bawah.
- Kategori bawaan: *Panggung, Area penonton, Properti, Akses / sirkulasi*.

---

## 9. Zoom dan Geser Kanvas

| Aksi | Cara |
|---|---|
| Zoom ke arah kursor | **Roda mouse** |
| Zoom bertahap | Tombol **+** dan **−** (pojok kanan bawah) |
| Kembali ke tampilan penuh | Tombol **Fit** |
| Geser kanvas (pan) | Tombol **Geser** lalu seret, atau tahan **Spasi** lalu seret, atau seret dengan **klik kanan / klik tengah** |

- Rentang zoom 20% sampai 4000%; 100% berarti tampilan pas (fit).
- Zoom berguna untuk bidang kecil atau tipis yang sulit dipilih.
- Zoom **tidak** memengaruhi hasil ekspor dan tidak masuk riwayat undo.

---

## 10. Undo, Redo, Simpan, dan Buka Proyek

Tombol-tombolnya ada di bagian **Proyek**: **Undo**, **Redo**, **Simpan**, **Buka JSON**.

### Undo dan Redo

- Riwayat menyimpan hingga **100 langkah**, mencakup bidang, legenda, ukuran denah, dan informasi kegiatan.
- Pengetikan di kolom teks digabung dalam jeda singkat, sehingga satu Undo membatalkan satu rangkaian ketikan.

### Simpan proyek

Klik **Simpan**. File `nama-kegiatan.matamap.json` terunduh (nama diambil dari *Nama Kegiatan*). Simpan file ini sebagai **cadangan** sekaligus **template** untuk denah berikutnya.

### Buka proyek

Klik **Buka JSON**, lalu pilih file `.json` hasil simpanan. Seluruh denah dipulihkan. File yang tidak sesuai ditolak dengan pesan peringatan. Pembukaan file masih bisa dibatalkan dengan **Undo**.

### Mulai baru

Tombol **Baru** di header memuat ulang halaman dan menghapus semuanya (ada konfirmasi). Simpan dulu jika masih dibutuhkan.

---

## 11. Ekspor PNG dan PDF

Klik **Ekspor PNG** atau **Ekspor PDF** di header.

| Format | Hasil |
|---|---|
| **PNG** | Gambar 3840 × 2160 piksel (4K), kualitas penuh |
| **PDF** | Satu halaman landscape 16:9 berisi gambar 4K (JPEG kualitas 95) |

Catatan:

- Nama file diambil dari **Nama Kegiatan**.
- Ekspor selalu memakai **tampilan penuh** tanpa garis seleksi dan handle, apa pun posisi zoom saat ini.
- PDF berisi **gambar (raster)**, bukan vektor. Ketajamannya setara PNG 4K, tetapi garisnya tidak bisa diedit di aplikasi desain.
- Batang skala di blok informasi ikut tercetak. Panjangnya dipilih otomatis sesuai ukuran denah.
- Jika file tidak terunduh, periksa izin unduhan di browser.

---

## 12. Pintasan Keyboard

| Tombol | Fungsi |
|---|---|
| `Ctrl/Cmd + Z` | Undo |
| `Ctrl/Cmd + Y` atau `Ctrl/Cmd + Shift + Z` | Redo |
| `Delete` / `Backspace` | Hapus bidang terpilih |
| `← ↑ → ↓` | Geser bidang terpilih (sebesar grid, atau 0,1 m jika *Tempel ke Grid* mati) |
| `Esc` | Batalkan alat gambar / poligon yang sedang berjalan |
| `Enter` | Tutup poligon (alat Poligon titik) |
| `Spasi` + seret | Geser kanvas |
| `Shift` + seret titik putar | Putar dalam kelipatan 15° |

Pintasan tidak aktif saat kursor berada di kolom input atau teks.

---

## 13. Contoh Alur: Denah Panggung 14 × 9 m

1. **Ukuran denah:** Lebar `14`, Panjang `9`, Grid `0,5`, centang *Tempel ke Grid*.
2. **Informasi:** isi nama kegiatan, lokasi, desainer, dan tanggal.
3. **Legenda:** ubah nama dan warna kategori sesuai kebutuhan (misalnya Panggung, Penonton, Properti, Akses).
4. **Panggung:** pilih **Persegi**, seret dari kiri atas hingga berukuran 8 × 4 m. Beri nama "Panggung" dan kategori *Panggung*.
5. **Area penonton:** isi Lebar `12` dan Tinggi `3`, pilih **Persegi**, lalu klik sekali di bawah panggung. Atur kategori *Area penonton*.
6. **Properti bulat:** pilih **Elips**, seret ukuran 1 × 1 m di atas panggung, kategori *Properti*.
7. **Ruang tak beraturan:** pilih **Poligon titik**, klik titik-titik sudutnya, tutup dengan klik titik awal.
8. **Rapikan:** pakai panel **Bidang Terpilih** untuk mengoreksi posisi X/Y dan rotasi, dan **Depan/Belakang** untuk urutan tumpukan.
9. Klik **Simpan** untuk cadangan, lalu **Ekspor PNG** dan/atau **Ekspor PDF**.

---

## 14. Tips Kerja yang Rapi

- **Atur denah dan grid dulu**, baru gambar.
- Gunakan **Cara B** (ukuran dulu, klik sekali) untuk banyak objek berukuran sama, misalnya kursi atau meja.
- Gunakan **Duplikat** lalu ubah posisi lewat angka untuk barisan objek yang sejajar.
- Beri **nama pendek** pada bidang agar label muat di dalamnya.
- **Simpan sering.** Karena tidak ada simpan otomatis, simpan setelah setiap tahap besar.
- Simpan satu file JSON sebagai **template** untuk jenis acara yang sering dibuat, lalu buka dan ubah isinya.
- Rapikan legenda: hapus kategori yang tidak dipakai sebelum ekspor.

---

## 15. Pemecahan Masalah

| Masalah | Solusi |
|---|---|
| Bidang tipis sulit dipilih | Zoom dengan roda mouse, atau ubah ukurannya lewat panel angka |
| Handle saling menumpuk pada bidang kecil | Zoom in, atau ubah ukuran lewat kolom Lebar/Tinggi di panel |
| Bidang tidak bisa ditempatkan tepat di titik tertentu | Matikan *Tempel ke Grid*, kecilkan nilai **Grid**, atau ketik posisi X/Y |
| Seretan membuat bidang yang tidak diinginkan | Tekan `Ctrl+Z`, atau pakai Cara B |
| Kanvas tidak bisa digeser | Klik tombol **Geser**, atau pastikan **Spasi** ditekan sebelum menyeret, atau pakai klik kanan/tengah |
| Hasil ekspor tidak muncul | Periksa izin unduhan di browser |
| Pekerjaan hilang setelah refresh | Memang disengaja. Gunakan **Simpan** sebelum menutup halaman |
| File JSON ditolak | File harus berasal dari **Simpan** Matamap dan belum diubah manual |
| Tampilan font berbeda | Font Space Mono butuh internet. Tanpa internet dipakai font monospace bawaan |

---

## 16. Batasan Saat Ini

- Belum ada pilih-banyak (multi-select), grup, atau kunci objek.
- Titik poligon tidak bisa digeser setelah bentuk jadi. Hapus lalu gambar ulang, atau ubah ukuran keseluruhan.
- Belum ada teks bebas, panah, pustaka simbol (pintu, kursi, dll.), maupun garis dimensi antar dua titik.
- Ekspor PDF berupa gambar, bukan vektor.
- Tidak ada simpan otomatis.

---

## 17. Catatan untuk Pengembang

- **Stack:** HTML + CSS + JavaScript murni, tanpa dependensi build. Cukup edit file lalu refresh browser.
- **Kanvas:** elemen `<canvas id="cv">` dengan resolusi internal 2880 × 1620 (16:9). Ekspor diproduksi pada 3840 × 2160.
- **Cache:** `index.html` memuat `style.css?v=3` dan `script.js?v=3`. Naikkan angka versi setiap mengubah file agar browser tidak memakai cache lama.
- **Elemen UI penting (id):** `nw` (Baru), `exPng`, `exPdf`, `bUn`, `bRe`, `bSave`, `bOpen`, `fOpen` (input file JSON), `shapes` (tombol bentuk), `sel` (panel bidang terpilih), `cats` (daftar legenda), `zo`/`zi`/`zf`/`zh` (kontrol zoom).
- **Menambah bentuk atau fitur:** logika menggambar dan interaksi ada di `script.js`. Tambahkan juga tombolnya lewat daftar bentuk yang dirender ke elemen `#shapes`.

---

*Matamap dibuat dengan bantuan Claude. 