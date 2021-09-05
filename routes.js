module.exports = (app) => {

    var user = require('./controller/user')
    var auth = require('./controller/login')
    var regis = require('./controller/register')
    app.get('/api', async (req, res) => {
        res.json({
            message: "Welcome to the SUDIN API"
        })
    })
    app.route('/api/token')
        .post(auth.token)

    app.route('/api/users')
        .get(user.readUsers)
    
    app.route('/api/login')
        .post(auth.login)
        
    app.route('/api/register')
        .post(regis.register)

        
}
    