'use strict';

const express = require('express');
const crypto = require('crypto');
const wrRoute = express.Router();
const connection = require('../db');

wrRoute.post('/users', function (req, res, next) {
    let mypass = crypto.createHash('md5').update(req.body.password).digest('hex');
    
    connection.execute(`INSERT INTO orderdb
     (customer_name,	product,	quantity,	status, order_date)
     VALUES (?, ?, ?, ?, ?);`, [req.body.customer_name, req.body.product, req.body.quantity,req.body.status, mypass, Date.now()])
        .then(() => {
            console.log('ok');
            res.sendStatus(201).send('Insert Successful!')
        }).catch((err) => {
            console.log(err);
        });
    res.end();
});

//-----------------------------read--------------------------------------
wrRoute.get('/users', function (req, res, next) {
    connection.execute('SELECT * FROM orderdb;')
    .then((result) => {
            var rawData = result[0];
            res.send(JSON.stringify(rawData));
        }).catch((err) => {
            console.log(err);
            res.end();
        });
});
wrRoute.post('/check', function (req, res, next) {
    let mypass = crypto.createHash('md5').update(req.body.password).digest("hex");
    connection.execute('SELECT * FROM orderdb WHERE customer_name=? AND product=?;',
    [req.body.customer_name, mypass])
    .then((result) => {
        var data = result[0];
        console.log(data);
        if (data.length === 0) {
           res.sendStatus(200);
        } else {
           res.sendStatus(400);
        }
     }).catch((err) => {
        console.log(err);
        res.sendStatus(404);
     });
 
 });
wrRoute.use('/', function (req, res, next) {
    res.sendStatus(404);
});

module.exports = wrRoute;
 //exports module(router) จำเป็นมาก