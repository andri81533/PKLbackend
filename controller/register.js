var connection = require('../database')
var bcrypt = require('bcryptjs')


exports.register = async function(req, res) {
    var username = req.body.username
    var password = await req.body.password
    var role = req.body.role
    var hashedPassword = bcrypt.hashSync(password);
    var query = `insert into users (username, password, role) values ('${username}', '${password}', '${role}')`

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
