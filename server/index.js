require('dotenv').config();

const express = require('express');
const app = express();

const sequelize = require('./db');

sequelize.sync();

//My controllers
const pies = require('./controllers/piecontroller');
const user = require('./controllers/userController');

app.use(express.json());

app.use(require('./middleware/headers'));


app.get("/", (request, response) => {
    console.log('Incoming Request!!');
    console.log(`URL = ${ request.url }`);
    console.log(`METHOD = ${ request.method }\n`);
    response.send("Heyo");
});

app.use("/pies", pies);
app.use("/auth", user);

app.listen(process.env.PORT, () => console.log(`Server is listening on port ${ process.env.PORT }`));
