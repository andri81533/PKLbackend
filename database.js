const {Client} =  require("pg")
var bcrypt = require('bcryptjs')

const client = new Client({
    user: "postgres",
    password: "admin",
    host:"localhost",
    port: 5432,
    database: "sudin"
})

client.connect((err) => {
    if(err){
        throw err
    }
    let createRoleTable = `CREATE TABLE IF NOT EXISTS role(
        id_role SERIAL NOT NULL PRIMARY KEY,     
       role varchar(50) unique not null
        );`;
    
    client.query(createRoleTable, (err, results) => {
        if(err){
            throw err
        }
        var val = []
        var setValue = (value) => {
            val = value
        }
        let query = `SELECT * FROM role;`
        client.query(query, (err, results) => {
            if(err){
                throw err
            }
            setValue(results)
            var string = JSON.stringify(val)
            var roles = JSON.parse(string)
            if(roles.rowCount == 0){
              
                let createRoles = ` insert into role ( role ) values('Admin'),('User'),('Manager');`
                client.query(createRoles, function (error, results) {
                    if(error){
                        console.log(err)
                    }
                });
            }
            

            // client.query()
        })
    })
    let createUserTable = `CREATE TABLE IF NOT EXISTS USERS(id_user SERIAL NOT NULL PRIMARY KEY,
        nama_depan varchar(200) not null,
        nama_bel varchar(200) not null,
        username varchar(200) unique not null,
        password varchar(200) not null,
        id_role integer not null,
        CONSTRAINT role FOREIGN KEY(id_role) REFERENCES role(id_role)
        );`;
    
    client.query(createUserTable, (err, results) => {
        if(err){
            throw err
        }
        var val = []
        var setValue = (value) => {
            val = value
        }
        let query = `SELECT * FROM USERS;`
        client.query(query, (err, results) => {
            if(err){
                throw err
            }
            setValue(results)
            var string = JSON.stringify(val)
            var users = JSON.parse(string)
            if(users.rowCount == 0){
                var hashPassword = bcrypt.hashSync('admin123') 
                let createUser = `INSERT INTO USERS(nama_depan, nama_bel, username, password, id_role) VALUES ('admin','admin','admin', '${hashPassword}', 1);`
                client.query(createUser, function (error, results) {
                    if(error){
                        console.log(err)
                    }
                });
            }
            

            // client.query()
        })
    })
    let createProjectTable = `CREATE TABLE IF NOT EXISTS Project(id_task SERIAL NOT NULL PRIMARY KEY,
        nama_project varchar(200)  not null,
        tanggal_mulai varchar(200) not null,
        tanggal_akhir varchar(200) not null,
        nama_manager varchar(200) not null,
        nama_karyawan varchar(200) not null,
        deskripsi varchar(200) not null
        
        );`;
    
    client.query(createProjectTable, (err, results) => {
        if(err){
            throw err
        }
        var val = []
        var setValue = (value) => {
            val = value
        }
        let query = `SELECT * FROM PROJECT;`
        client.query(query, (err, results) => {
            if(err){
                throw err
            }
            setValue(results)
            var string = JSON.stringify(val)
            var project = JSON.parse(string)
            if(project.rowCount == 0){
                let createproject = `INSERT INTO PROJECT(nama_project, tanggal_mulai, tanggal_akhir, nama_manager, nama_karyawan, deskripsi) VALUES ('Test', '2020-2-1', '2020-2-13', 'Agung', 'diterima', 'test');`
                client.query(createproject, function (error, results) {
                    if(error){
                        console.log(err)
                    }
                });
            }
            

            // client.query()
        })
    })
    let createTaskTable = `CREATE TABLE IF NOT EXISTS TASK(id_task SERIAL NOT NULL PRIMARY KEY,
        nama_task varchar(200) unique not null,
        tanggal_mulai varchar(200) not null,
        tanggal_akhir varchar(200) not null,
        nama_karyawan varchar(200) not null,
        deskripsi varchar(200) not null
        
        );`;
    
    client.query(createTaskTable, (err, results) => {
        if(err){
            throw err
        }
        var val = []
        var setValue = (value) => {
            val = value
        }
        let query = `SELECT * FROM TASK;`
        client.query(query, (err, results) => {
            if(err){
                throw err
            }
            setValue(results)
            var string = JSON.stringify(val)
            var task = JSON.parse(string)
            if(task.rowCount == 0){
                let createTask = `INSERT INTO TASK(nama_task, tanggal_mulai, tanggal_akhir, nama_karyawan, deskripsi) VALUES ('Test', '2020-2-1', '2020-2-13', 'Agung', 'test');`
                client.query(createTask, function (error, results) {
                    if(error){
                        console.log(err)
                    }
                });
            }
            

            // client.query()
        })
    })
    let createKomenTable = `CREATE TABLE IF NOT EXISTS KOMEN(id_KOMEN SERIAL NOT NULL PRIMARY KEY,
        upload TIMESTAMP,
        teks varchar(1000) not null,
        nama_pm varchar(200) not null
        );`;
    
    client.query(createKomenTable, (err, results) => {
        if(err){
            throw err
        }
        var val = []
        var setValue = (value) => {
            val = value
        }
        let query = `SELECT * FROM KOMEN;`
        client.query(query, (err, results) => {
            if(err){
                throw err
            }
            setValue(results)
            var string = JSON.stringify(val)
            var komen = JSON.parse(string)
            if(komen.rowCount == 0){
                let createKomen = `INSERT INTO KOMEN(upload, teks, nama_pm) VALUES ('2008-01-01 00:00:01', 'KURANGBRO', 'test');`
                client.query(createKomen, function (error, results) {
                    if(error){
                        console.log(err)
                    }
                });
            }
            

            // client.query()
        })
    })
});

module.exports = client;
 
// client.query('select * from account',(err,res) => {
//     if(!err){
//         console.log(res.rows);
//     }
//     else{
//         console.log(err.message) 
//     }
//     client.end;
// })