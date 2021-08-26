module.exports = (app) => {

    var user = require('./controller/user')
    app.get('/api', async (req, res) => {
        res.json({
            message: "Welcome to the SUDIN API"
        })
    })

    app.route('/users')
        .get(user.readUsers)
}