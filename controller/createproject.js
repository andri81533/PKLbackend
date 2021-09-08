var connection = require('../database')
var bcrypt = require('bcryptjs')


exports.createproject = async function(req, res) {
    var nama_project = req.body.nama_project
    var tanggal_mulai = req.body.tanggal_mulai
    var tanggal_akhir = req.body.tanggal_akhir
    var nama_manager = req.body.nama_manager
    var nama_karyawan = req.body.nama_karyawan
    var deskripsi = req.body.deskripsi
    var query = `insert into project (nama_project, tanggal_mulai, tanggal_akhir, nama_manager, nama_karyawan, deskripsi) values ('${nama_project}', '${tanggal_mulai}', '${tanggal_akhir}', '${nama_manager}', '${nama_karyawan}', '${deskripsi}')`

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