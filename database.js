const {Client} =  require('pg')

const client = new Client({
    host:"localhost",
    user: "postgres",
    port: 5432,
    password: "admin",
    database: "sudin"
})

client.connect();

client.query('select * from account',(err,res) => {
    if(!err){
        console.log(res.rows);
    }
    else{
        console.log(err.message)
    }
    client.end;
})