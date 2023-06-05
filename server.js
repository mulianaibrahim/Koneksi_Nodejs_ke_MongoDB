const express = require('express');
const bodyParser = require('body-parser');

// Inisialisasi Express
const app = express();
app.use(bodyParser.json());

// Data Mahasiswa
let mahasiswa = [
  { id: 1, nama: 'Muliana', nim: '123456789', kelas: 'A', jenisKelamin: 'perempuan' },
  { id: 2, nama: 'maulida', nim: '987654321', kelas: 'B', jenisKelamin: 'Perempuan' }
];

// Mendapatkan daftar semua mahasiswa
app.get('/api/mahasiswa', (req, res) => {
  res.json(mahasiswa);
});

// Mendapatkan mahasiswa berdasarkan ID
app.get('/api/mahasiswa/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const mhs = mahasiswa.find(m => m.id === id);

  if (!mhs) {
    res.status(404).json({ error: 'Mahasiswa tidak ditemukan.' });
  } else {
    res.json(mhs);
  }
});

// Menambahkan mahasiswa baru
app.post('/api/mahasiswa', (req, res) => {
  const mhs = req.body;
  mhs.id = mahasiswa.length + 1;
  mahasiswa.push(mhs);
  res.status(201).json(mhs);
});

// Mengubah data mahasiswa berdasarkan ID
app.put('/api/mahasiswa/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const mhsIndex = mahasiswa.findIndex(m => m.id === id);

  if (mhsIndex === -1) {
    res.status(404).json({ error: 'Mahasiswa tidak ditemukan.' });
  } else {
    const mhs = req.body;
    mhs.id = id;
    mahasiswa[mhsIndex] = mhs;
    res.json(mhs);
  }
});

// Menghapus mahasiswa berdasarkan ID
app.delete('/api/mahasiswa/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const mhsIndex = mahasiswa.findIndex(m => m.id === id);

  if (mhsIndex === -1) {
    res.status(404).json({ error: 'Mahasiswa tidak ditemukan.' });
  } else {
    const deletedMhs = mahasiswa.splice(mhsIndex, 1)[0];
    res.json(deletedMhs);
  }
});

// Menjalankan server pada port 3000
app.listen(3000, () => {
  console.log('Server berjalan pada port 3000...');
});
