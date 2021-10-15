var connection = require('../../database')
var bcrypt = require('bcryptjs')


exports.changeStatus = async function(req, res) {
    var id_task = req.body.id_task;
    var id_status = req.body.id_status;
    let query = `UPDATE task
    SET id_status = ${id_status},
    WHERE id_task = ${id_task};
    `
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