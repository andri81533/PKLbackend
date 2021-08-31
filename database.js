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