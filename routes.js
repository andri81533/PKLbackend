module.exports = (app) => {

    var user = require('./controller/user')
    var auth = require('./controller/login')
    var regis = require('./controller/register')
    var project = require('./controller/project/project')
    var task = require('./controller/task/task')
    var token = require ('./token')
    app.get('/api', async (req, res) => {
        res.json({
            message: "Welcome to the SUDIN API"
        })
    })
    app.route('/api/token')
        .post(auth.token)

    app.route('/api/users')
        .get(token.verifyToken, user.readUsers)
    
    app.route('/api/login')
        .post(auth.login)

    app.route('/api/logout')
        .post(auth.logout)
        
    app.route('/api/register')
        .post(token.verifyToken, regis.register)
    
    app.route('/api/project')
        .post(token.verifyToken, project.createproject)

    app.route('/api/project')
        .get(token.verifyToken, project.getProjects)

    app.route('/api/task')
        .post(token.verifyToken, task.createtask)

    app.route('/api/task')
        .get(token.verifyToken, task.getTask)
    


        
}
    