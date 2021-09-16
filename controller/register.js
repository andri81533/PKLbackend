var connection = require('../database')
var bcrypt = require('bcryptjs')


exports.register = async function(req, res) {
    var nama_depan = req.body.nama_depan
    var nama_bel = req.body.nama_bel
    var username = req.body.username
    var password = req.body.password
    var role = req.body.role
    var hashedPassword = bcrypt.hashSync(password);
    var query = `insert into users (nama_depan, nama_bel, username, password, id_role) values ('${nama_depan}', '${nama_bel}', '${username}', '${hashedPassword}', '${role}')`

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
