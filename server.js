import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import logEvents from "./logEvents.js";
import EventEmitter from "events";



const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT_ASSIGNMENT || 3500;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(accessCheck);

class UserInput extends EventEmitter { };
const userInput = new UserInput();

userInput.on('submit', (msg) => logEvents(msg, 'loginData.txt'));

var userIsAuthorised;

function accessCheck(req, res, next) {
    if (req.body["password"] === "Ramification") {
        userIsAuthorised = true;
    } else {
        userIsAuthorised = false;
    }
    next();
}

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
})

app.post('/check', (req, res) => {
    if (userIsAuthorised) {
        res.send("Access granted! 🫆");
        userInput.emit('submit', 'login attempt: ' + JSON.stringify({ result: 'Access granted', username: req.body['username'], password: req.body['password'] }));
    } else {
        userInput.emit('submit', 'login attempt: ' + JSON.stringify({ result: 'Access denied', username: req.body['username'], password: req.body['password'] }));
        res.redirect("/");
    }
})

// custom middleware; 404 handler
app.use((req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(__dirname + '/views/404.html');
    } else if (res.accetps('json')) {
        res.json({ error: '404 - Not Found' });
    } else {
        res.type('text').send('404 - Not Found');
    }
});

app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}.`)
})

