import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3500;

var userIsAuthorised;
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

function accessCheck(req, res, next) {
    if (req.body["password"] === "Ramification") {
        userIsAuthorised = true;
        console.log('Access granted:', req.body);
    } else {
        userIsAuthorised = false;
        console.log('Access denied:', req.body);
    }
    next();
}

app.use(accessCheck);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
})

app.post('/check', (req, res) => {
    if (userIsAuthorised) {
        res.send("Access granted! ♤");
    } else res.redirect("/");
})


app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}.`)
})