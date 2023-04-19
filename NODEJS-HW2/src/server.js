const express = require('express')
const app = express();
const port = process.env.PORT || 8080;
const morgan = require('morgan')
const bp = require('body-parser');
const connect = require('./db/connections');
const cors = require('cors')
app.use(cors())
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use(morgan('dev'));

const usersRouter = require('./controller/usersController')
const notesRouter = require('./controller/notesController')
const authRouter = require('./controller/credentialController')

app.use('/', usersRouter);
app.use('/', notesRouter);
app.use('/', authRouter);

connect();

app.listen(port);