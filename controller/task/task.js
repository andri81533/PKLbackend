var connection = require('../../database')
var bcrypt = require('bcryptjs')


exports.createtask = async function(req, res) {
    var id_project = req.body.id_project
    var nama_task = req.body.nama_task
    var tanggal_mulai = req.body.tanggal_mulai
    var tanggal_akhir = req.body.tanggal_akhir
    var nama_karyawan = req.body.nama_karyawan
    var deskripsi = req.body.deskripsi
    var id_user = req.body.id_user
    var query = "";
    if(id_project !== null && id_project !==undefined){
        query = `insert into task (nama_task, tanggal_mulai, tanggal_akhir, nama_karyawan, deskripsi, id_project, id_user, id_status) values ('${nama_task}', '${tanggal_mulai}', '${tanggal_akhir}', '${nama_karyawan}', '${deskripsi}', ${id_project}, ${id_user},1);`
    }
    else{
        query = `insert into task (nama_task, tanggal_mulai, tanggal_akhir, nama_karyawan, deskripsi,id_user, id_status) values ('${nama_task}', '${tanggal_mulai}', '${tanggal_akhir}', '${nama_karyawan}', '${deskripsi}',  ${id_user},1);`

    }
    console.log(query)
    
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
exports.getTask = async function(req, res){
    var id_project = req.query.id_project
    var id_user = req.query.id_user
    var query;

    if(id_project !== null && id_project !== undefined){
        query = `select * from task where id_user = ${id_user} and id_project = ${id_project};`
       
    }
    else{
        query = `select * from task where id_user = ${id_user};`

    }
 console.log(query)


    connection.query(query, (err, results) => {
        if(err){
            throw err
        }
        else{
            console.log(results);
            res.send({
                message: "success",
                data: results.rows
            })
        }
    })
}