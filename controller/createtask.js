var connection = require('../database')
var bcrypt = require('bcryptjs')


exports.createtask = async function(req, res) {
    var nama_task = req.body.nama_task
    var tanggal_mulai = req.body.tanggal_mulai
    var tanggal_akhir = req.body.tanggal_akhir
    var nama_karyawan = req.body.nama_karyawan
    var deskripsi = req.body.deskripsi
    var query = `insert into task (nama_task, tanggal_mulai, tanggal_akhir, nama_karyawan, deskripsi) values ('${nama_task}', '${tanggal_mulai}', '${tanggal_akhir}', '${nama_karyawan}', '${deskripsi}')`

    connection.query(query, (err, results) => {
        if(err){
            throw err
        }
        else{
            res.send({
                message: "success",
                data: results.rows
            })
        }
    })
}