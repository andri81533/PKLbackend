module.exports = (app) => {

    var user = require('./controller/user')
    var auth = require('./controller/login')
    var regis = require('./controller/register')
    var project = require('./controller/project/project')
    var task = require('./controller/task/task')
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

    app.route('/api/project')
        .get(project.getProjects)

    app.route('/api/task')
        .post(task.createtask)

     app.route('/api/task')
        .get(task.getTask)


        
}
    