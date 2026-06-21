import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";



const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT_ASSIGNMENT || 3500;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(accessCheck);

var userIsAuthorised;

function accessCheck(req, res, next) {
    if (req.body["password"] === "Ramification") {
        userIsAuthorised = true;
    } else {
        userIsAuthorised = false;
    }
    next();
}

// localStorage is browser-specific and therefore cannot be used in a node project
// let's log some data to a file

const userInput = [];


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
})

app.post('/check', (req, res) => {
    if (userIsAuthorised) {
        userInput.push({ result: 'Access granted', username: req.body['username'], password: req.body['password'] });
        console.log(userInput);
        res.send("Access granted! 🫆");
    } else {
        userInput.push({ result: 'Access denied', username: req.body['username'], password: req.body['password'] });
        console.log(userInput);
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

