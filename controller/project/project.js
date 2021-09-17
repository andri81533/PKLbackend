var connection = require('../../database')
var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')


exports.createproject = async function(req, res) {
    var nama_project = req.body.nama_project
    var tanggal_mulai = req.body.tanggal_mulai
    var tanggal_akhir = req.body.tanggal_akhir
    var nama_manager = req.body.nama_manager
    var nama_karyawan = req.body.nama_karyawan
    var id_user = req.body.id_user
    var deskripsi = req.body.deskripsi
    var query = `insert into project (nama_project, tanggal_mulai, tanggal_akhir, nama_manager, nama_karyawan, deskripsi, id_user, id_status) values ('${nama_project}', '${tanggal_mulai}', '${tanggal_akhir}', '${nama_manager}', '${nama_karyawan}', '${deskripsi}', ${id_user}, 1);`

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

exports.getProjects = async function(req, res){
    var id_user = req.query.id_user
    console.log(id_user)
    var query = `select * from project where id_user = ${id_user};`
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