const {Client} =  require("pg")

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
    let createUserTable = `CREATE TABLE IF NOT EXISTS USERS(id_user SERIAL NOT NULL PRIMARY KEY,
        username varchar(200) unique not null,
        password varchar(200) not null,
        role varchar(200) not null
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
                let createUser = `INSERT INTO USERS(username, password, role) VALUES ('admin', 'admin', 'admin');`
                client.query(createUser, function (error, results) {
                    if(error){
                        console.log(err)
                    }
                });
            }
            

            // client.query()
        })
    })
    let createProjectTable = `CREATE TABLE IF NOT EXISTS PROJECT(id_project SERIAL NOT NULL PRIMARY KEY,
        namaproject varchar(200) unique not null,
        startdate varchar(200) not null,
        enddate varchar(200) not null
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
                let createproject = `INSERT INTO PROJECT(namaproject, startdate, enddate) VALUES ('Test', '2020-2-1', '2020-2-13');`
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
        namatask varchar(200) unique not null,
        startdate varchar(200) not null,
        enddate varchar(200) not null,
        status varchar(200) not null,
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
                let createTask = `INSERT INTO TASK(namatask, startdate, enddate, status, deskripsi) VALUES ('Test', '2020-2-1', '2020-2-13', 'diterima', 'test');`
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
        teks varchar(1000) not null
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
                let createKomen = `INSERT INTO KOMEN(upload, teks) VALUES ('2008-01-01 00:00:01', 'KURANGBRO');`
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