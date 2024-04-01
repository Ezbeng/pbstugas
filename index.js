const express = require('express')
const app = express()
const port = 3002

const bodyParser = require('body-parser')
const db = require('./config.js')
const { error } = require('console')
const response = require('./response.js')

app.use(bodyParser.json())

app.get('/barang', (req,res)=>{
    const sql = 'SELECT * FROM tb_barang'
    db.query(sql,(error, result)=>{
       response(200,result,'data barang',res)
    })
})
app.get('/pelanggan', (req,res)=>{
    const sql = 'SELECT * FROM tb_pelanggan'
    db.query(sql,(error, result)=>{
       response(200,result,'data pelanggan',res)
    })
})
app.get('/penjualan', (req,res)=>{
    const sql = 'SELECT * FROM tb_penjualan'
    db.query(sql,(error, result)=>{
       response(200,result,'data penjualan',res)
    })
})

app.get('/barang/:stok', (req,res)=>{
    const stok = req.params.stok
    const sql = `SELECT * FROM tb_barang where stok = '${stok}'`
    db.query(sql, (err, result)=>{
        if(err) throw err
        response(200,result,"get detail barang",res)
    })
})
app.get('/pelanggan/:alamat', (req,res)=>{
    const alamat = req.params.alamat
    const sql = `SELECT * FROM tb_pelanggan where alamat = '${alamat}'`
    db.query(sql, (err, result)=>{
        if(err) throw err
        response(200,result,"get detail alamat",res)
    })
})
app.get('/penjualan/:id_penjualan', (req,res)=>{
    const id_penjualan = req.params.id_penjualan
    const sql = `SELECT * FROM tb_penjualan where id_penjualan = '${id_penjualan}'`
    db.query(sql, (err, result)=>{
        if(err) throw err
        response(200,result,"get detail penjualan",res)
    })
})

app.post('/barang',(req, res)=>{
    const {id_barang, nama_barang, harga, stok } =req.body
    const sql = `INSERT INTO tb_barang (id_barang, nama_barang, harga, stok) values ('${id_barang}','${nama_barang}','${harga}','${stok}');`

    db.query(sql,(error, fields)=>{
        if(error) response(500, 'invalid', `${id_barang} dengan nama barang ${nama_barang} sudah ditambahkan`, res)
        if(fields?.affectedRows){
            const data ={
                isSucces: fields.affectedRows,
                id:fields.insertId,
            }
            response(200,data,"Data berhasil di simpan", res)
        }
    })
})
app.post('/pelanggan',(req, res)=>{
    const {id_pelanggan, nama_pelanggan, alamat, telepon } =req.body
    const sql = `INSERT INTO tb_pelanggan (id_pelanggan, nama_pelanggan, alamat, telepon) values ('${id_pelanggan}','${nama_pelanggan}','${alamat}','${telepon}');`

    db.query(sql,(error, fields)=>{
        if(error) response(500, 'invalid', `${id_pelanggan} dengan nama pelanggan ${nama_pelanggan} sudah ditambahkan`, res)
        if(fields?.affectedRows){
            const data ={
                isSucces: fields.affectedRows,
                id:fields.insertId,
            }
            response(200,data,"Data berhasil di simpan", res)
        }
    })
})
app.post('/penjualan',(req, res)=>{
    const {id_penjualan, tanggal, id_pelanggan } =req.body
    const sql = `INSERT INTO tb_penjualan (id_penjualan, tanggal, id_pelanggan ) values ('${id_penjualan}','${tanggal}','${id_pelanggan}');`

    db.query(sql,(error, fields)=>{
        if(error) response(500, 'invalid', `${id_penjualan} dengan tanggal ${tanggal} sudah ditambahkan`, res)
        if(fields?.affectedRows){
            const data ={
                isSucces: fields.affectedRows,
                id:fields.insertId,
            }
            response(200,data,"Data berhasil di simpan", res)
        }
    })
})

app.listen(port, ()=>{
    console.log(`Running in port ${port}`)
})