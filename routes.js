module.exports = (app) => {

    var user = require('./controller/user')
    var auth = require('./controller/login')
    var regis = require('./controller/register')
    var project = require('./controller/createproject')
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

    app.route('/api/logout')
        .post(auth.logout)
        
    app.route('/api/register')
        .post(regis.register)
    
    app.route('/api/project')
        .post(project.createproject)

        
}
    