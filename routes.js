const multer = require('multer')
var storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null,'Public')
    },
    filename:(req,file,cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

var upload = multer({storage}).single('file');

module.exports = (app) => {

    var user = require('./controller/user/user')
    var auth = require('./controller/auth/login')
    var regis = require('./controller/auth/register')
    var project = require('./controller/project/project')
    var task = require('./controller/task/task')
    var status= require('./controller/status/status')
    var token = require ('./token')

    app.get('/api', async (req, res) => {
        res.json({
            message: "Welcome to the SUDIN API"
        })
    })
    app.post('/upload' , (req,res) => {
        upload(req,res, (err) => {
            if(err) {
                return res.status(500).json(err)
            }
            return res.status(200).send(req.file)
        })
    })
    app.route('/api/token')
        .post(auth.token)

    app.route('/api/users')
        .get(token.verifyToken, user.getUserList)
    
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
        
    app.route('/api/project/detail')
        .get(token.verifyToken, project.getDetailProject)

    app.route('/api/task/detail')
        .get(token.verifyToken, task.getDetailTask)

    app.route('/api/status')
        .get(token.verifyToken, status.changeStatus)
      
}
    