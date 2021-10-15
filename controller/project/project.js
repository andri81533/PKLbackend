var connection = require('../../database')
var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')


exports.createproject = async function(req, res) {
    var nama_project = req.body.nama_project
    var tanggal_mulai = req.body.tanggal_mulai
    var tanggal_akhir = req.body.tanggal_akhir
    var id_manager = req.body.id_manager
    var id_karyawan = req.body.id_karyawan
    var id_user = req.body.id_user
    var deskripsi = req.body.deskripsi


    var query = `insert into project (nama_project, tanggal_mulai, tanggal_akhir, id_manager, id_karyawan, deskripsi, id_user, id_status) values ('${nama_project}', '${tanggal_mulai}', '${tanggal_akhir}', ${id_manager}, ARRAY[${id_karyawan}], '${deskripsi}', ${id_user}, 1);`

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

    var query = `select * from project where id_user = ${id_user};`
   

    connection.query(query, async(err, results) => {
        if(err){
            throw err
        }
        else{

            let listProject = results.rows
            await Promise.all(listProject.map(async(element)=>{
                let id_karyawan = element.id_karyawan;
                let id_manager = element.id_manager;

                var nama_karyawan = []
                var nama_manager = ""

                var setListKaryawan = function(nama){
                    nama_karyawan.push(nama);
                }
                var setNamaManager = function(nama){
                    nama_manager = nama;
                }
                await Promise.all(id_karyawan.map(async(element)=>{
                    var nama_individu = "";
                    var setNamaKaryawan = function(nama){
                        nama_individu = nama;
                    }
                    await new Promise((resolve, reject)=>{
                        const query = `select * from users where id_user = ${element} ;`
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
                    setListKaryawan(nama_individu);

                }))
               

                await new Promise((resolve, reject)=>{
                    const query = `select * from users where id_user = ${id_manager} ;`
                    connection.query(query, (err, results)=>{
                        if(err){
                            throw err
                        }
                        let nama_depan = results.rows[0].nama_depan;
                        let nama_belakang = results.rows[0].nama_bel;
                        let full_name = nama_depan + " " + nama_belakang;

                        setNamaManager(full_name)
                        resolve()
                    })

                })

                Object.assign(element, {"nama_karyawan":nama_karyawan, "nama_manager":nama_manager})


            }))
     
            res.send({
                message: "success",
                data: listProject
            })
        }
    })
}




exports.getDetailProject = async function(req, res){    
    var id_project = req.query.id_project;
    let query = `SELECT * FROM PROJECT WHERE id_project = ${id_project};`
    connection.query(query, async(err,results)=>{
        if(err){
            throw err;
        }
        var project = results.rows[0];
        var list_nama_karyawan = []
        var setListKaryawan = function(nama){
            list_nama_karyawan.push(nama);
        }

        var nama_manager = "";
        var setNamaManager = function(nama){
            nama_manager = nama;
        }

        await new Promise((resolve, reject)=>{
            const query = `select * from users where id_user = ${project.id_manager} ;`
            connection.query(query, (err, results)=>{
                if(err){
                    throw err
                }
                let nama_depan = results.rows[0].nama_depan;
                let nama_belakang = results.rows[0].nama_bel;
                let full_name = nama_depan + " " + nama_belakang;

                setNamaManager(full_name)
                resolve()
            })

        })
        
        

        await Promise.all(project.id_karyawan.map(async(element)=>{
            var nama_individu = "";
            var setNamaKaryawan = function(nama){
                nama_individu = nama;
            }
            await new Promise((resolve, reject)=>{
                const query = `select * from users where id_user = ${element} ;`
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
            setListKaryawan(nama_individu);

        }))

        var status = "";

        var setStatus = function(nama){
            status = nama;

        }


        await new Promise((resolve, reject)=>{
            const query = `select * from status where id_status = ${project.id_status} ;`
            connection.query(query, (err, results)=>{
                if(err){
                    throw err
                }
                let statusName = results.rows[0].status;
               

                setStatus(statusName)
                resolve()
            })

        })




        Object.assign(project, {"nama_karyawan":list_nama_karyawan, "nama_status":status, "nama_manager":nama_manager});

        res.send({
            message: "success",
            data: project
        })






    })

}