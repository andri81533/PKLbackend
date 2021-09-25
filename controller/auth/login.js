var jwt = require('jsonwebtoken')
var connection = require('../../database')
var bcrypt = require('bcryptjs')
var randtoken = require('rand-token');
var dateFormat = require('dateformat')

const refreshTokens = {};


exports.token = function (req, res, next) {
    var username = req.body.username  
    var refreshToken = req.body.refreshToken
    if ((refreshTokens[refreshToken].refreshToken === refreshToken) && (refreshTokens[refreshToken].username === username)) {
        var token = jwt.sign({
            username: username
        }, config.secretkey, {
            expiresIn: 300
        })
        refreshTokens[refreshToken].token = token
        res.json({
            token: 'Bearer ' + token
        })
    } else {
        res.sendStatus(401)
    }
}

exports.login = function (req, res, next) {
    var username = req.body.username
    var password = req.body.password

    let query = `SELECT * FROM USERS WHERE (username ='${username}');`
 
    
    var val = []
    var setValue = function (value) {
        val = value;
    }

    connection.query(query, (err, results) => {
        
        setValue(results.rows);
        var stringUser = JSON.stringify(val)

        var userDetails = JSON.parse(stringUser)

        if(stringUser === '[]'){
            res.send({
                auth: false,
                message: 'Invalid Username'
            })
            res.end()
        }
        else{
            var passwordIsValid = bcrypt.compareSync(password, userDetails[0].password);
            if(!passwordIsValid){
                res.send({
                    auth: false,
                    message: 'Invalid Password'
                })
                res.end()
            }
            else{
                var token = jwt.sign(
                    {username: userDetails[0].username}, 
                    'secretkey', 
                    { expiresIn: 86400 } // expires in 24 hours
                ); 
                var refreshToken = randtoken.uid(256);
                refreshTokens[refreshToken] = {
                    username: userDetails[0].username,
                    token: token,
                    refreshToken: refreshToken,
                
                }
                res.send({
                    auth: true,
                    token: token,
                    refreshToken: refreshToken,
                    status: "success",
                    username:userDetails[0].username,
                    id_role:userDetails[0].id_role,
                    id_user:userDetails[0].id_user
                });
                res.end()
            }
        }
    })
}

exports.logout = function (req, res) {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.json({
                message: "invalid token!"
            });
        } else {
            res.status(200).send({
                auth: false,
                token: null,
                message: "Token successfully deleted!"
            });
        }
        res.end()
    });
}
