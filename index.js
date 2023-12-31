const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const app = express()

const connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '12345',
	database : 'nodejslogin'
});

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(5000, () => {
    console.log(`Server is listening on port: 5000`)
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/views/login.html')
})

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/views/register.html')
})

app.post('/auth', (req, res) => {
    let username = req.body.username
    let password = req.body.password

    if (username && password) {
    connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], (err, result, field) => {
        if (err) throw err;

        if (result.length > 0) {
            req.session.loggedin = true;
            req.session.username = username;

            res.redirect('/home');
        } else {
            res.send('Error')
        }
        res.end()
    })} else {
        res.send('Error')
        res.end()
    }
})

app.post('/reg', (req, res) => {
    let username = req.body.username
    let email = req.body.email
    let password = req.body.password

    if (username && email && password) {
        connection.query(`INSERT INTO accounts (username, password, email) VALUES ('${username}', '${password}', '${email}')`, (err, result, fiels) => {
            if (err) throw err

            req.session.loggedin = true
            req.session.username = username

            res.redirect('/home')
            return
        })
    } else {
        res.send('error')
    }
})

app.get('/home', function(request, response) {

	if (request.session.loggedin) {
        response.send('Welcome back, ' + request.session.username + '!');
	} else {
        response.send('You need to log in to see this page');
	}
	response.end();
});