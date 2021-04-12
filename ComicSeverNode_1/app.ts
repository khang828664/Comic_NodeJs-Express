import * as express from 'express';
import { AddressInfo } from "net";
import * as path from 'path';
import * as Services from "./Db/DbConnect"
import bodyParser = require('body-parser')
import multer = require('multer');



import users from './routes/user'
import index from './routes/index'
import { parse } from 'node:url';

const debug = require('debug')('my express app');
const app = express();
const upload = multer();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(bodyParser.urlencoded({ extended: true  }));
app.use(bodyParser.raw({ type: 'application/*+json' }))
app.use(upload.array());
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index)
app.use('/api', users);
//app.use('/api', comic);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err[ 'status' ] = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => { // eslint-disable-line @typescript-eslint/no-unused-vars
        res.status(err[ 'status' ] || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => { // eslint-disable-line @typescript-eslint/no-unused-vars
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 3000);

const server = app.listen(app.get('port'), function () {
    debug(`Express server listening on port ${(server.address() as AddressInfo).port}`);
});