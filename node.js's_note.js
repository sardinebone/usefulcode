var express = require('express');
var router = express.Router();

var mysql = require('mysql');

var mysql_setting = {
host:'localhost',
user:'root',
password:'',
database:'my-nodeapp-db'
};

router.get('/',(req,res,next) =>{
var data = {
title:'Login',
content:'ログインしてください',
};
res.render('index',data);
});

const { check, validationResult } = require('express-validator');

router.post('/add', [
check('name').isString(),
check('mail').isEmail()
],(req,res,next) =>{
const errors = validationResult(req);
if (!errors.isEmpty()) {
return res.status(422).json({ errors: errors.array() });
}else{
var nm =req.body.name;
var ml =req.body.mail;
var ag =req.body.age;
var data = {'name':nm,'mail':ml,'age':ag};

var connection = mysql.createConnection(mysql_setting);

connection.connect();

connection.query('insert into tablename set ?',data,
function(error,results,fields){
res.redirect('/users');
});
connection.end();
};

});

module.exports = router;