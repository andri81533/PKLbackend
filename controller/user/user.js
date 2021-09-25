var connection = require('../../database')
var bcrypt = require('bcryptjs');



exports.getUserList = async function(req, res){
    const type = req.query.type
    let query = "";
    if(['1','2','3'].includes(type)){
        query = `select * from users where id_role = ${type};`
    }
    else if(type===""){
        query = `select * from users;`
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