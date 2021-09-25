var connection = require('../../database')
var bcrypt = require('bcryptjs')


exports.createtask = async function(req, res) {
    var id_project = req.body.id_project
    var nama_task = req.body.nama_task
    var tanggal_mulai = req.body.tanggal_mulai
    var tanggal_akhir = req.body.tanggal_akhir
    var id_karyawan = req.body.id_karyawan
    var deskripsi = req.body.deskripsi
    var id_user = req.body.id_user
    var query = "";
    if(id_project !== null && id_project !==undefined){
        query = `insert into task (nama_task, tanggal_mulai, tanggal_akhir,  deskripsi, id_project, id_user, id_status, id_karyawan) values ('${nama_task}', '${tanggal_mulai}', '${tanggal_akhir}', '${nama_karyawan}', '${deskripsi}', ${id_project}, ${id_user},1, ${id_karyawan});`
    }
    else{
        query = `insert into task (nama_task, tanggal_mulai, tanggal_akhir,deskripsi,id_user, id_status, id_karyawan) values ('${nama_task}', '${tanggal_mulai}', '${tanggal_akhir}', '${nama_karyawan}', '${deskripsi}',  ${id_user},1, ${id_karyawan});`

    }

    
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



    connection.query(query, async(err, results) => {
        if(err){
            throw err
        }
        else{

            let listTask = results.rows
            await Promise.all(listTask.map(async(element)=>{
                let id_karyawan = element.id_karyawan;

                var nama_karyawan = ""

                var setNamaKaryawan = function(nama){
                    nama_karyawan = nama;
                }

                await new Promise((resolve, reject)=>{
                    const query = `select * from users where id_user = ${id_karyawan} ;`
                    connection.query(query, (err, results)=>{
                        if(err){
                            throw err
                        }
                        let nama_depan = results.rows[0].nama_depan;
                        let nama_belakang = results.rows[0].nama_bel;
                        let full_name = nama_depan + " " + nama_belakang;

                        setNamaKaryawan(full_name)
                        resolve()
                    })

                })

                Object.assign(element, {"nama_karyawan":nama_karyawan})


            }))
     
            res.send({
                message: "success",
                data: listTask
            })
        }
    })
}