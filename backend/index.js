//////////////////////////////////////////////////////
// INCLUDES
//////////////////////////////////////////////////////
const express = require('express');
const cors = require('cors');
const connection = require('./db'); //Import from db.js

//////////////////////////////////////////////////////
// INIT
//////////////////////////////////////////////////////
const app = express();
const PORT = process.env.PORT || 3000;

//////////////////////////////////////////////////////
// DISPLAY SERVER RUNNING
//////////////////////////////////////////////////////
app.get('/', (req, res) => {
    res.send(`Server running on port ${PORT}`)
});

app.listen(PORT, () => {
    console.log(`App listening to port ${PORT}`);
});


//////////////////////////////////////////////////////
// SETUP APP
//////////////////////////////////////////////////////
app.use(cors());
app.use(express.json());


//////////////////////////////////////////////////////
// POST GET METHODS
// http://localhost:3000/api/
// Use Postman to test
//////////////////////////////////////////////////////
app.get('/api', async (req, res, next) => {
    console.log(req.query);

    res.json(req.query);
});

app.post('/api', async (req, res, next) => {
    console.log(req.body);

    res.json(req.body);
});

//////////////////////////////////////////////////////
// SETUP DB
//////////////////////////////////////////////////////
const CREATE_TABLE_SQL = `
    CREATE TABLE messages (
        id INT NOT NULL AUTO_INCREMENT,
        message TEXT NOT NULL,
        PRIMARY KEY (id)
    );
`;

app.post('/api/table', (req, res, next) => {

    connection.promise().query(CREATE_TABLE_SQL)
        .then(() => {
            res.send(`Table created`);
        })
        .catch((error) => {
            res.send(error);
        });
});



//////////////////////////////////////////////////////
// CLEAR DB
//////////////////////////////////////////////////////
const DROP_TABLE_SQL = `
    DROP TABLE IF EXISTS messages;
`;

app.delete('/api/table', (req, res, next) => {

    connection.promise().query(DROP_TABLE_SQL)
        .then(() => {
            res.send(`Table dropped`);
        })
        .catch((error) => {
            res.send(error);
        });
});

//////////////////////////////////////////////////////
// GET EVERYTHING
//////////////////////////////////////////////////////
app.get('/api/message', async (req, res, next) => {

    try {
        console.log(req.query);
        const allMessage = await connection.promise().query("SELECT * FROM messages");
        res.json(allMessage[0]);
    } catch (error) {
        console.error(error);
        res.send(error);
    }
});

//////////////////////////////////////////////////////
// CREATE USER
//////////////////////////////////////////////////////

app.post('/api/message', async (req, res, next) => {
    try {
        console.log(req.body);
        let message = req.body.message;
        console.log("message", message);
        const newInsert = await connection.promise().query("INSERT INTO messages (`message`) VALUES (?)", [message]);
        res.json(newInsert);
    } catch (error) {
        console.error(error);
        res.send(error);
    }
});

//////////////////////////////////////////////////////
// GET MESSAGES IN TABLE BY ROW ID
//////////////////////////////////////////////////////

app.get('/api/message/:id', async (req, res, next) => {
    try {
        console.log(req.params);
        let id = req.params.id;
        const message = await connection.promise().query("SELECT * FROM messages WHERE id = ?", [id])
        res.json(message);
    } catch (error) {
        res.send(error);
    };
});

//////////////////////////////////////////////////////
// UPDATE MESSAGES IN TABLE BY ROW ID
//////////////////////////////////////////////////////

app.put('/api/message/:id', async (req, res, next) => {
    try {
        console.log(req.params);
        let id = req.params.id;

        let message = req.body.message;
        console.log("message", message);

        const updateMessage = await connection.promise().query(`UPDATE messages SET message = ? WHERE id = ?`, [message, id])
        res.json(updateMessage);
    } catch (error) {
        res.send(error);
    };
});


app.delete('api/message', async (req, res, next) => {
    try {
        await Item.deleteOne({ _id: request.params.id });
        res.sendStatus(204);
    } catch {
        res.sendStatus(404);
        console.log('test');
    }
})


app.delete("/delete/:id"),
    async (request, res) => {

    };