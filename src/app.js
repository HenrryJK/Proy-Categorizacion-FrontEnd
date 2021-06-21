import express from 'express'
import morgan from 'morgan'
import usersRouters from './routers/user.router';
const app = express();
var cors = require('cors');
app.use(express.json());
app.use(cors());

app.use(morgan('dev'));

// servicop get

app.get('/', function (req, res, next) {
    res.send('Bienvenido al Sistema CatDOG!..');
});
app.use('/api/auth/users', usersRouters);
export default app;