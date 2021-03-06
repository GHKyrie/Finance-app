import bodyParser from "body-parser";
import express from 'express';
import mysql from "mysql";
import cors from "cors";

const app = express();
const jsonParser = express.json();
const PORT = 5001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('static'));
app.use(express.json());

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "finance"
});

connection.connect(err => {
    if (err) throw err;
    console.log("Успешно соединено с базой данных");
});

app.post("/registration", jsonParser, (req, res) => {

    if (!req.body) return res.sendStatus(400);

    const login = req.body.login;
    const password = req.body.password;
    const email = req.body.email;
    
    connection.query("SELECT * FROM users", (err, results) => {
        if (err) return console.error(err);

        const users = results;
        let k = 0;

        if (users == {}) connection.query("INSERT INTO users (login, password, email) VALUES (?,?,?)", [login, password, email], (err, results) => {
            if (err) return console.error(err);
            else console.log("Данные добавлены");
        });
        else {
            for (let i = 0; i < users.length; i++) {
                if (users[i].email == email)
                    k = i;
            }

            if (users[k].email == email) {
                console.error("Wrong data");
                return res.sendStatus(406);
            }
            else connection.query("INSERT INTO users (login, password, email) VALUES (?,?,?)", [login, password, email], function (err, results) {
                if (err) return console.error(err);
                else {
                    console.log("Данные добавлены");
                    return res.sendStatus(200);
                }
            });
        }
    });
});

app.post("/authorization", jsonParser, (req, res) => {
    if (!req.body) return res.sendStatus(400);

    const email = req.body.email;
    const password = req.body.password;

    connection.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
        if (err) return console.error(err);

        const user = results;
        
        if (user.length < 1) {
            //console.error("Wrong data"); 
            if (err) return console.error(err); 
            return res.sendStatus(400);           
        }
        else {
            //console.log(user);
            for (let i = 0; i < user.length; i++)
                if (user[i].password == password) 
                    return res.json(JSON.stringify(user[0].id));
                else 
                    return res.sendStatus(400);
        }

    });

});

app.post("/addtransaction", jsonParser,(req, res) => {

    if(!req.body) return res.sendStatus(400);

    const uid = req.body.uid;
    const tag = req.body.tag;
    const exin = req.body.exin;
    const amount = req.body.amount;
    const datetime = req.body.datetime;

    connection.query("INSERT INTO transactions (uid, tag, exin, amount, datetime) VALUES (?,?,?,?,?)", [uid, tag, exin, amount, datetime], (err, results) => {
        if (err) return console.error(err);
        else {
            console.log("Данные добавлены");
            return res.sendStatus(200);
        }
    });

});

app.post("/gettransactions", jsonParser,  (req, res) => {
    if (!req.body) return res.sendStatus(400);

    const uid = req.body.uid;

    connection.query("SELECT id, tag, exin, amount, datetime FROM transactions WHERE uid=?", [uid], (err, results) => {
        if (err)
            return console.error(err);
        else {
            const transaction = results.map((el) => (
                {
                    tag: el.tag,
                    amount: el.amount,
                    datetime: el.datetime,
                    id: el.id,
                    exin: el.exin
                }
            ));
            return res.json(transaction);
        }
    });
});

app.post("/gettransactionsexin", jsonParser,  (req, res) => {
    if (!req.body) return res.sendStatus(400);

    const uid = req.body.uid;
    const exin = req.body.exin;

    connection.query("SELECT id, tag, exin, amount, datetime FROM transactions WHERE uid=? AND exin=?", [uid, exin], (err, results) => {
        if (err)
            return console.error(err);
        else {
            console.log(exin);

            const transaction = results.map((el) => (
                {
                    tag: el.tag,
                    amount: el.amount,
                    datetime: el.datetime,
                    id: el.id,
                    exin: el.exin
                }
            ));
            return res.json(transaction);
        }
    });
});

app.post("/gettransactionsinit", jsonParser,  (req, res) => {
    if (!req.body) return res.sendStatus(400);

    const uid = req.body.uid;
    const num = 3;

    connection.query("SELECT id, tag, exin, amount, datetime FROM transactions WHERE uid=? ORDER BY id DESC limit ?", [uid, num], (err, results) => {
        if (err)
            return console.error(err);
        else {
            const transaction = results.map((el) => (
                {
                    tag: el.tag,
                    amount: el.amount,
                    datetime: el.datetime,
                    id: el.id,
                    exin: el.exin
                }
            ));
            return res.json(transaction);
        }
    });
});

async function startApp(){
    try{
        app.listen(PORT, () => console.log('SERVER STARTED ON PORT ' + PORT))
    } catch(e){
        return console.error(e)
    }
}

startApp();