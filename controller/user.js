var connection = require('../database')

exports.readUsers = function(req, res) {
    var query = `select * from users;`

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