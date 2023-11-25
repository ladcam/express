const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3000;
app.use(express.json());
require('dotenv').config()  

const pool = new Pool({
    user: 'default',
    host: 'ep-orange-smoke-08960365.us-east-1.postgres.vercel-storage.com',
    database: 'verceldb',
    password: 'bf3BTmnKYd4P',
    port: 5432,
    ssl: {rejectUnauthorized: false}
});

app.get('/students', function (req, res) {
    const listUsersQuery = `SELECT * FROM students;`;
    pool.query(listUsersQuery)
        .then(data => {
            console.log("List students: ", data.rows);
            return res.send(data.rows);
        })
        .catch(err => {
            console.error(err);
        });
});

app.get('/students/:id', function (req, res) {
    const listUsersQuery = `SELECT * FROM students WHERE id = ${req.params.id};`;
    pool.query(listUsersQuery)
        .then(data => {
            console.log("List students: ", data.rows);
            return res.send(data.rows);
        })
        .catch(err => {
            console.error(err);
        });
});

app.post('/students', function (req, res) {
    const listUsersQuery = `
    INSERT INTO students(id, name, lastname, notes) VALUES
    (${req.body.id}, '${req.body.name}', '${req.body.lastname}', '${req.body.notes}');
`;
    pool.query(listUsersQuery)
        .then(data => {
            console.log("List students: ", data.rows);
            return res.send(data.rows);
        })
        .catch(err => {
            console.error(err);
        });

    return res.send('students insertation');
})

app.put('/students/:id', function (req, res) {
    const listUsersQuery = `
    UPDATE students SET name= '${req.body.name}', lastname = '${req.body.lastname}',notes= '${req.body.notes}' WHERE id = ${req.params.id};`;
    console.log(listUsersQuery)
    pool.query(listUsersQuery)
        .then(data => {
            console.log("List students: ", data.rows);
            return res.send(data.rows);
        })
        .catch(err => {
            console.error(err);
        });

    return res.send('students actualiced');
})

app.delete('/students/:id', function (req, res) {
    const deleteQuery = `
    DELETE FROM students WHERE id = ${req.params.id};`;
    pool.query(deleteQuery)
        .then(data => {
            console.log(data.rows);
            return res.send(data);
        })

        .catch(err => {
            console.error(err)
            res.satatus(400)
            res.send("hubo un error")
        });

})



app.listen(port, () => {
    console.log('the app is runnig');
})
