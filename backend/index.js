import bodyParser from "body-parser";
import express from 'express';
import mysql from "mysql";

const urlencodedParser = bodyParser.urlencoded({extended: false});
const app = express();
const PORT = 5001;

app.use(express.static('static'));
app.use(express.json());

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "finance_app"
});

connection.connect(err => {
    if (err) throw error;
    console.log("Успешно соединено с базой данных");
});

app.post("/registration", (req, res) => {

    if (!req.body) return res.sendStatus(400);

    const login = req.body.login;
    const password = req.body.password;
    const email = req.body.email;
    const mobile = req.body.mobile;

    connection.query("SELECT * FROM users", (err, results) => {
        if(err) console.error(err);

        const users = results;
        let k = 0;

        if (users == {}) connection.query("INSERT INTO users (login, password, email, mobile) VALUES (?,?,?,?)", [login, password, email, mobile], (err, results) => {
            if (err) console.error(err);
            else console.log("Данные добавлены");
        });
        else {
            for (let i = 0; i < users.length; i++) {
                if (users[i].email == email)
                    k = i;
            }

            if (users[k].email == email) {
                console.error("Wrong data");
                res.sendStatus(406);
            }
            else connection.query("INSERT INTO users (login, password, email, mobile) VALUES (?,?,?,?)", [login, password, email, mobile], function (err, results) {
                if (err) console.error(err);
                else{
                    console.log("Данные добавлены");
                    res.sendStatus(200);
                }
            });
        }
    });
});


app.post("/authorization", (req, res) => {
    if (!req.body) return res.sendStatus(400);

    const email = req.body.email;
    const password = req.body.password;

    connection.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
        if (err) return console.log(err);

        const user = results;

        console.log(user);

        for (let i = 0; i < user.length; i++) {
            if (user[i].password == password)
                return res.sendStatus(200);
            else {
                console.error("Wrong");
                if (err) 
                    return res.sendStatus(400);
            }
        }
    });

});

app.post("/transactions", (req, res) => {

    if(!req.body) return res.sendStatus(400);

    const uid = req.body.uid;
    const tag = req.body.tag;
    const exin = req.body.exin;
    const amount = req.body.amount;
    const datetime = req.body.datetime;

    connection.query("INSERT INTO transactions (uid, tag, exin, amount, datetime) VALUES (?,?,?,?,?)", [uid,tag,exin, amount, datetime], (err, results) => {
        if (err) console.error(err);
        else {
            console.log("Данные добавлены");
            res.sendStatus(200);
        }
    });

});

app.get("/transactions", (req, res) => {
    if(!req.body) return res.sendStatus(400);

    const uid = req.body.uid;
    const begin = req.body.begin;
    const end = req.body.end;

    connection.query("SELECT tag, exin, amount, datetime FROM transactions WHERE uid=? AND datetime>=? AND datetime<=?", [uid, begin, end], (err, results) => {
        if (err)
            console.error(err);
        else {
            const transaction = results;
            console.log(transaction);
            res.sendStatus(200);
        }
    });
});

async function startApp(){
    try{
        app.listen(PORT, () => console.log('SERVER STARTED ON PORT ' + PORT))
    } catch(e){
        console.error(e)
    }
}

startApp()