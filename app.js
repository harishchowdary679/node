
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
//var logger = require('morgan');

var http = require('http');
var path = require('path');

//load customers route
var customers = require('./routes/customers'); 
var app = express();

var connection  = require('express-myconnection'); 
var mysql = require('mysql');

// all environments
app.set('port', process.env.PORT || 4300);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(express.favicon());
app.use(express.logger('dev'));
//app.use(logger); 
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/*------------------------------------------
    connection peer, register as middleware
    type koneksi : single,pool and request 
-------------------------------------------*/

app.use(
    
    connection(mysql,{
        
        host: '172.17.12.16',
        user: 'root',
        password : 'H@rish16',
        port : 3306, //port mysql
        database:'apigee'

    },'pool') //or single

);



app.get('/', routes.index);
app.get('/customers', customers.list);
app.get('/customers/add', customers.add);
app.post('/customers/add', customers.save);
app.get('/customers/delete/:id', customers.delete_customer);
app.get('/customers/edit/:id', customers.edit);
app.post('/customers/edit/:id',customers.save_edit);


app.use(app.router);

var server=app.listen(4300,function(){
console.log("We have started our server on port 43000");
});
